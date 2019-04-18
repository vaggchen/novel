<template>
    <div class="bookMenu" v-if="showornot">
        <span class="up" name='up' @click.stop="catType(0)">升</span>     
        <span class="down" name='down' @click.stop="catType(1)">降</span>
        <cube-scroll
            ref="scroll2"
            :data="bookMenu"
            :options="options"
            @pulling-down="onPullingDown"
            @pulling-up="onPullingUp">
                 <div class="content">
                    <ul>
                        <li :class="currentClick==index?'actived':''" 
                       
                        v-for="(item,index) in bookMenu" 
                        :id="item.id"
                        :key="index" 
                        @click="toChapterDetail(bookDiffId,item,index)">
                            <a>{{item.title}}</a>
                        </li>
                    </ul>
                </div>
        </cube-scroll>
    </div>
    <div class="empty" v-else>
        <EmptyAlert :msg="msg" />
    </div>
</template>

<script>
import EmptyAlert from '@/components/EmptyAlert'
export default {
    name: 'bookMenv',
    components: {
        EmptyAlert
        },
    data() {
        return {
            // 书籍源id
            bookDiffId: [],
            // 书籍章节列表
            bookMenu: [],
            clickId:'',
            currentClick:-1,
            // 是否有目录信息
            showornot: true,
            msg:'目前没有该书目录信息哦！'
        }
    },
    created() {
        this.init();
    },
    computed: {
        options() {
            return {
                pullDownRefresh: this.pullDownRefreshObj,
                pullUpLoad: this.pullUpLoadObj,
                scrollbar: {
                    fade: true,
                    interactive: true // 1.8.0 新增
                }
                // eventPassthrough:'horizontal'
            }
        },
    },
    methods: {
        init(){
            this.toast = this.$createToast({
                txt: 'Loading...',
                mask: true,
                time:60000
            })
            this.toast.show()

            let id = this.$route.query.id
            // 书籍章节列表(传递书籍id)
            api.getBookComeDiff({},id).then((res)=>{
                if(res){
                    this.bookDiffId = res.map(item =>{
                        return item._id
                    })
                    // console.log(this.bookMenu)
                    let diffId = this.bookDiffId[0]
                    api.getBookChaptersList({},diffId).then((res)=>{
                        if(res.chapters){
                            this.bookMenu = res.chapters
                            this.showornot = true
                            // console.log(res)
                        }else{
                            this.toast1 = this.$createToast({
                                txt: '请求超时',
                                mask: true,
                                time:3000
                            })
                            this.toast.show()
                            this.showornot = false
                        }                        
                        this.toast.hide()
                    })  
                }else{
                    this.toast1 = this.$createToast({
                        txt: '请求超时',
                        mask: true,
                        time: 3000
                    })
                    this.toast.show()
                }
                
            })
        },
        toChapterDetail(bookDiffId,item,index){
            // let bookMenu = bookMenu
            this.currentClick = index;
            this.clickId = item.id;
            let link = encodeURIComponent(item.link)
            // console.log(bookDiffId)
            //隐藏tabBar
            this.$store.dispatch('setTabBar',{
                status:false,
                msg:item.title
            })
            //隐藏tabBar
            this.$store.dispatch('setTopnav',{
                status:false
            })
            // console.log(item)s
            // 跳转到书单详情
            this.$router.push({
                name:'chapterDetail',
                query:{
                    link: link,
                    bookDiffId: bookDiffId[0],
                    myTitle:item.title,
                    sort:item.order
                    // author: bookitem.author
                },
            })
        },
        catType(name){
             this.currentClick = -1;
             this.$refs.scroll2.scrollTo(0,0,0)
            if(name == '0'){
                this.toast = this.$createToast({
                    txt: '升序中...',
                    mask: true,
                    time:500
                })
                this.toast.show()
                this.bookMenu = this.bookMenu.sort((a,b)=>a.order-b.order);
            }else if(name == '1'){
                this.toast = this.$createToast({
                    txt: '降序中...',
                    mask: true,
                    time:500
                })
                this.toast.show()
                this.bookMenu = this.bookMenu.sort((a,b)=>a.order-b.order).reverse();
                // console.log(this.bookMenu)
            }
            //this.$refs.scroll2.scrollTo(0,0,300)
        },
        onPullingDown(){
            
        },
        onPullingUp(){

        },
        scrollToElement() {
            this.$refs.scroll2 && this.$refs.scroll2.scrollToElement.apply(this.$refs.scroll2, arguments)
        }
    },
    watch:{
        '$route'(newsVal,oldVal){
            // console.log(newsVal,oldVal)
            if(oldVal.name == 'bookDetail' && newsVal.name == 'bookMenu'){
                this.currentClick = -1;
                this.bookMenu = [];
                this.init()
                return
            }
            if(oldVal.name == 'chapterDetail' && newsVal.name == 'bookMenu'){
                // console.dir(this.$refs.scroll2)
                this.$store.dispatch('setTopShow',true)
                this.$refs.scroll2.refresh()
                let dom = document.getElementById(this.clickId);
                console.dir(dom)
                this.scrollToElement(dom,0,true,true)                
                // return
            }
            if(oldVal.name == 'bookMenu' && newsVal.name == 'bookDetail'){
                this.currentClick = -1;
                this.bookMenu = [];
                // this.init()
                return
            }
            if(oldVal.name == 'bookMenu'){
                this.toast.hide()
            }
        }
    }
}
</script>

<style>
@import '../../style/book/bookMenu.css';
</style>
