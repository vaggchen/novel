<template>
    <div class="bookItem">
        <div class="swipe-wrapper" v-if="showornot">
            <cube-scroll>
                <cube-swipe>
                    <transition-group name="swipe" tag="ul">
                        <li class="swipe-item-wrapper"  v-for="(data,index) in bookStore" :key="data.item._id">
                            <cube-swipe-item
                                ref="swipeItem"
                                :btns="data.btns"
                                :index="index"
                                :autoShrink='data.autoShrink'
                                @btn-click="onBtnClick"
                                class="swipe_item">
                                <div class="item-inner" @click="toReading(data.item)" >
                                    <!-- <div @click="onItemClick(item, index)" class="item-inner"> -->
                                    <div class="icon">
                                        <img width="70" height="70" :src="url+data.item.cover">
                                    </div>
                                    <div class="text">
                                        <h2 class="item-name" v-html="data.item.title"></h2>
                                        <p class="item-author" v-html="data.item.author"></p>
                                        <p class="item-lastChapter" v-html="data.item.lastChapter"></p>
                                    </div>
                                </div>
                            </cube-swipe-item>
                        </li>
                    </transition-group>
                </cube-swipe>
            </cube-scroll>
        </div>
        <div class="emptyshow" v-else>
            <EmptyAlert :msg="msg" />
        </div>
    </div>
</template>

<script>
import EmptyAlert from '@/components/EmptyAlert'
export default {
    name: 'BookItem',
    components: {
        EmptyAlert
        },
    data(){
        return {
            // 判断书架是否有书
            showornot: false,
            // 书架书籍
            books: [],
            bookStore:[],
            // 图片base路径
            url: BASE_IMG_URL,
            // 书籍第一章
            firstchapters: [],
            // 阅读章节(默认从第一章开始)
            readed: 1,
            bookDiffId: [],
            msg: '书架什么都没有哦!'
        }
    },
    created() {
        // this.init()
        this.loginornot
    },
    methods: {
        loginornot(){
            let userisAlive = Utils.localLoadJsonStorage('globalLoginStatus')
            hide = userisAlive
            if(!hide){
            // }else{
                setTimeout(() => {
                this.toast = this.$createToast({
                    txt: '请先登录哦',
                    type:'warn',
                    mask: true,
                    time:1000
                })
                this.toast.show()
                },100)
            }else{
                init()
            }
        },
        init(){
            this.toast = this.$createToast({
                txt: '书架书籍拉取中',
                mask: true,
                time: 500
            })
            this.toast.show()
            // 从缓存中读取书架书籍
            let arr = Utils.localLoadJsonStorage('books');
            
            if(arr!=null || arr!=undefined){
                this.showornot = true
                this.books = arr;
                // 将按钮添加到每一本书               
                arr.forEach(element => {
                    let obj = {
                        item:element,
                        btns: [
                                {
                                action: 'toTop',
                                text: '置顶',
                                color: '#c8c7cd'
                                },
                                {
                                action: 'delete',
                                text: '移出书架',
                                color: '#ff3a32'
                                }
                        ],
                        autoShrink:true
                    };
                    this.bookStore.push(obj)
                });
                // console.log(this.boo)
                // 将书籍阅读章节取出保存
                this.readed = this.books.map((item)=>{
                    return item.readed
                })
                // console.log(this.books)
            }else{
                this.showornot = false
                // this.alertText = '书架空空如也...'
            }
        },
       
        onBtnClick(btn, index) {
            // 左滑事件--移出书架
            if (btn.action === 'delete') {
                this.$createActionSheet({
                    title: '确认要移出书架吗',
                    active: 0,
                    data: [
                        {content: '确认'}
                    ],
                    onSelect: () => {
                        this.books.splice(index, 1)
                        this.books= this.books.filter(item => item.index !==index)

                        this.bookStore.splice(index, 1)
                        this.bookStore= this.bookStore.filter(item => item.index !==index)

                        Utils.localLoadJsonStorage('books').splice(0)
                        Utils.localSaveJsonStorage('books', this.books);
                        // this.reload();
                        // this.init();
                    }
                }).show()
            } else {
                // 左滑事件--置顶
                let topItem = this.books[index]
                let topItem2 = this.bookStore[index]
                this.books = [topItem].concat(this.books.filter((item) => item != topItem))
                this.bookStore = [topItem2].concat(this.bookStore.filter((item) => item != topItem2))
                Utils.localLoadJsonStorage('books').splice(0)
                Utils.localSaveJsonStorage('books', this.books);
                // this.reload();
                // location.reload()
                // this.init();
               
            }
            // this.init()
        },
        getId(clickId,func){
            // 获取书籍第一章(传递书籍id)
            api.getBookComeDiff({},clickId).then((res)=>{
                if(res){
                        // console.log(res)
                        this.bookDiffId = res.map(item =>{
                            // console.log(this.bookDiffId)
                            return item._id
                        })
                        // console.log(this.bookDiffId)
                        let diffId = this.bookDiffId[0]
                        api.getBookChaptersList({},diffId).then((res)=>{
                            // console.log(res)
                            if(res){
                                this.firstchapters = res.chapters[0]
                                // console.log(this.firstchapters)
                                func(this.firstchapters,diffId);
                            }else{
                                this.toast1 = this.$createToast({
                                    txt: '请求超时',
                                    mask: true,
                                    time:3000
                                })
                                this.toast.show()
                            }
                            
                        })
                    }else{
                        this.toast1 = this.$createToast({
                            txt: '请求超时',
                            mask: true,
                            time:3000
                        })
                        this.toast.show()
                        // this.showornot = false
                    }
               
                // console.log(this.firstchapters)
            })
        },
        // 点击书籍进入阅读
        toReading(item){
            console.log(item)
            let clickId = item._id;
            let link = encodeURIComponent(item.link)
            // console.log(link)
            let title = item.title
            this.$store.dispatch('setTabBar',{
                status:false, 
                msg:item.title
            })
            //隐藏tabBar
            this.$store.dispatch('setTopnav',{
                status:false
            })
            this.$store.dispatch('setTopShow',false)
            this.$router.push({
                name:'chapterDetail',
                query:{
                    link: link,
                    bookDiffId: item.bookIds[0],
                    myTitle:title,
                    sort:item.order
                }
            })
            // this.getId(clickId,(firstchapters,diffId) => {
            //     let link = encodeURIComponent(firstchapters.link)
            //     // console.log(link)
            //     let title = firstchapters.title
            //     this.$store.dispatch('setTabBar',{
            //         status:false,
            //         msg:firstchapters.title
            //     })
            //     //隐藏tabBar
            //     this.$store.dispatch('setTopnav',{
            //         status:false
            //     })
            //     this.$router.push({
            //         name:'chapterDetail',
            //         query:{
            //             link: link,
            //             bookDiffId: diffId,
            //             myTitle:title,
            //             sort:firstchapters.order
            //         }
            //     })
            // })
            // console.log(this.firstchapters)
            // 根据书籍请求章节进行展示
            // let currentClick = readed;
            // // this.clickId = item.id;
        },

    }
    ,watch:{
        '$route'(newVal,oldVal){
            console.log(newVal)
            if(oldVal.name == 'BookStore'){
                this.toast.hide()
            }
            if(newVal.name == 'BookStore'){
                 Object.assign(this.$data, this.$options.data())
                this.init();
                this.$store.dispatch('setTopShow',false)
            }
        }
    }
}
</script>

<style>
@import '../../style/bookstore/bookstore.css';
</style>
