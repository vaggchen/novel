<template>
    <div class="bookDetail">
        <cube-scroll
                ref="scroll"
                :data="booksLike"
                :options="options"
                @pulling-down="onPullingDown"
                @pulling-up="onPullingUp" 
                v-if="showornot"
                >
        <!-- 书籍详情 -->
        <div class="content">
            <!--书籍信息  -->
            <!-- <div class="up_title tt">
                书籍信息
            </div> -->
            <div class="up">
               <div class="hi_up">
                    <dl>
                        <dt><img :src="url+bookInfo.cover" alt="" class="bl_img"></dt>
                        <dd>
                            <div class="info"><span>{{bookInfo.author}}</span>著</div>
                            <div class="info"><span>{{score}}</span>分</div>
                            <div class="info"><span v-for="item in tags" :key="item">{{item}}</span></div>
                            <div class="info"><span>{{words}}</span>万字 <span>|</span> <span>{{bookInfo.chaptersCount}}</span>章</div>
                            <div class="info"><span>{{bookInfo.latelyFollower}}</span>人追更</div>
                            <div class="dd_action">
                                <div class="addToBookstore btn" @click="addToBookStore(bookInfo,bookDiffId)">
                                    <span>加入书架</span>
                                </div>
                                <div class="readNow btn" @click="toReading(bookDiffId,firstchapters,0)">
                                    <span>立即阅读</span>
                                </div>
                                <!-- <div class="downLoad btn" @click="toDownLoad(bookInfo)">
                                    <span>下载本书</span>
                                </div> -->
                            </div>
                        </dd>     
                    </dl>
                </div>
            </div>
            <hr />

            <!--书籍描述  -->
            <div class="center_title tt">书籍描述</div>
            <div class="center">
                <div class="menu" @click.stop="catBookMenu(bookInfo)">
                    <p>查看目录&nbsp;&nbsp;&nbsp;></p>
                </div>
                <div class="params">
                    <ul>
                        <!-- <li><div class="collectorCount">收藏人数:<span>{{bookInfo.latelyFollower}}</span></div></li> -->
                        <li><div class="updateCount"><h4>最新章节:</h4><span>{{bookInfo.lastChapter}}</span></div></li> 
                        <li><div class="updated"><h4>最近更新:</h4><span>{{update}}</span></div></li>
                    </ul>
                </div>
                <div class="bookdesc">
                    <div class="desc">书籍简介:<p>{{bookInfo.longIntro}}</p></div>
                </div>
            </div>
            <hr />

            <!--本书作者作品  -->
            <div class="down_title tt">本书作者作品</div>
            <div class="down">
                <div class="bookItem" v-for="bookitem in booksOfAuthor" :key="bookitem._id" @click.stop='toBookDetail(bookitem)'>
                    <dl>
                        <dt><img :src="url+bookitem.cover"  alt="" class="bl_img"></dt>
                        <dd>
                            <p><span>{{bookitem.title}}</span></p>
                            <p><span>{{bookitem.author}}</span></p>
                            <p>{{bookitem.latelyFollower}}关注<span></span></p>
                            <p><span>{{bookitem.minorCate}}</span></p>
                        </dd>
                    </dl>
                </div>
                <!-- <div class="alert">没有更多了，亲</div> -->
            </div>

            <!--相关书籍作品  -->
            <div class="down_title tt">相关书籍作品</div>
            <div class="down">
                <div class="bookItem" v-for="bookitem in booksLike" :key="bookitem._id" @click.stop='toBookDetail(bookitem)'>
                    <dl>
                        <dt><img :src="url+bookitem.cover"  alt="" class="bl_img"></dt>
                        <dd>
                            <p><span>{{bookitem.title}}</span></p>
                            <p><span>{{bookitem.author}}</span></p>
                            <p>{{bookitem.latelyFollower}}关注<span></span></p>
                            <p><span>{{bookitem.minorCate}}</span></p>
                        </dd>
                    </dl>
                </div>
                <!-- <div class="alert">没有更多了，亲</div> -->
            </div>
        </div>
        </cube-scroll>
        <div class="empty" v-else>
            <EmptyAlert :msg="msg" />
        </div>
    </div>
</template>

<script>
import EmptyAlert from '@/components/EmptyAlert'
export default {
    name: 'BookDetail',
    components: {
        EmptyAlert
        },
    data(){
        return{
            // 图片路径
            url: BASE_IMG_URL,
            // 书籍详情
            bookInfo: [],
            // 书籍评分
            score: '',
            // 书籍作者作品
            booksOfAuthor: [],
            // 书籍相关推荐
            booksLike: [],
            // 字数
            words: 0,
            // 最近更新
            update: '',
            // 书籍不同来源id
            bookDiffId: [],
            // 书籍第一章
            firstchapters: [],
            // 书籍标签
            tags: [],
            isLeave:true,
            // 是否有书籍信息
            showornot: true,
            // 没有书籍信息时的提示
            msg: '暂时没有该书的详细信息哦！换本书吧'
        }
    },
    computed: {
        options() {
            return {
            pullDownRefresh: this.pullDownRefreshObj,
            pullUpLoad: this.pullUpLoadObj,
            scrollbar: false,
            // eventPassthrough:'horizontal'
            }
        },
    },
    created() {
        // console.log(this.$route.query.id)
        
        this.init(); 
    },
    methods: {
        init(){
            this.$store.dispatch('setTopShow',true)
            this.toast = this.$createToast({
                txt: 'Loading...',
                mask: true,
                time:60000
            })
            this.toast.show()

            // 请求书籍对应信息
            let id = this.$route.query.id
            let author = this.$route.query.author
            
            // console.log(this.$route)
            api.getBookInfo({},id).then((res)=>{
                if(res){
                    this.bookInfo = res
                    this.score = res.rating.score
                    this.words = ((res.wordCount)/10000).toFixed(0)
                    this.update = (res.updated).split('T')[0]
                    this.tags = (res.tags).slice(0,4)
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
                
            }),
            
            // 书籍作者作品(传递书籍id)
            api.getBooksOfAuthor({},author).then((res)=>{
                if(res.ok){
                    this.booksOfAuthor = res.books
                }else{
                    this.toast1 = this.$createToast({
                        txt: '请求超时',
                        mask: true,
                        time:3000
                    })
                    this.toast.show()
                }
                
                // console.log(res)
            }),
            // 书籍相关推荐(传递书籍id)
            api.getBookLike({},id).then((res)=>{    
                // console.log(res.books)
                if(res){
                    this.booksLike = res.books   
                }else{
                    this.toast1 = this.$createToast({
                        txt: '请求超时',
                        mask: true,
                        time:3000
                    })
                    this.toast.show()
                }
            }),
            // 获取书籍第一章(传递书籍id)
            api.getBookComeDiff({},id).then((res)=>{
                if(res){
                    this.bookDiffId = res.map(item =>{
                    return item._id
                })
                // console.log(this.bookMenu)
                let diffId = this.bookDiffId[0]
                api.getBookChaptersList({},diffId).then((res)=>{
                    if(res){
                        this.toast.hide()
                        this.firstchapters = res.chapters[0]   
                    }else{
                        this.toast1 = this.$createToast({
                            txt: '请求超时',
                            mask: true,
                            time:3000
                        })
                        this.toast.show()
                    }                  
                    // console.log(this.firstchapters)
                    
                })
                }else{
                    this.toast1 = this.$createToast({
                        txt: '请求超时',
                        mask: true,
                        time:3000
                    })
                    this.toast.show()
                }
            })

        },
        // 查看书籍目录
        catBookMenu(bookInfo){
            let id = bookInfo._id
            this.$store.dispatch('setTabBar',{
                status:false,
                msg:'目录'
            })
            //隐藏tabBar
            this.$store.dispatch('setTopnav',{
                status:false
            })
            // console.log(item)s
            // 跳转到书单详情
            this.$router.push({
                name:'bookMenu',
                query:{
                    id: id,
                    // author: item.author
                }
            })
        },
        // 跳转书籍详情
         toBookDetail(bookitem){
            let title = bookitem.title
            //隐藏tabBar
            this.$store.dispatch('setTabBar',{
                status:false,
                msg:bookitem.title
            })
            //隐藏tabBar
            this.$store.dispatch('setTopnav',{
                status:false
            })
            // console.log(item)s
            
            // 跳转到书单详情
            this.$router.replace({
                name:'bookDetail',
                query:{
                    id: bookitem._id,
                    author: bookitem.author,
                    myTitle:bookitem.title
                },
            })

            Object.assign(this.$data, this.$options.data())
            this.isLeave = false
            this.$refs.scroll.scrollTo(0,0,0)
            this.init()
            // window.reload();
        },
        // 立即阅读
        toReading(bookDiffId,item,index){
            // 根据书籍请求目录下的第一章进行展示
            this.currentClick = index;
            this.clickId = item.id;
            let link = encodeURIComponent(item.link)
            let contentType = item.contentType
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
                    sort:index,
                    contentType: contentType
                }
            })
        },
        // 加入书架
        addToBookStore(item,bookDiffId){
            // console.log(item)
            // let title = bookitem.title
            this.toast = this.$createToast({
                txt: '加入书架中',
                mask: true
            })
            this.toast.show()
            let arr = Utils.localLoadJsonStorage('books') || [];
            let flag = false;
            if(arr.length>0){
                flag = arr.some((it) => {
                    return it._id == item._id
                })
            }
            if(flag){
                this.flag = true;
                setTimeout(() => {
                    this.toast2 = this.$createToast({
                        txt: '该书已在书架中',
                        type:'warn',
                        mask: true,
                        time:1000
                    })
                    this.toast2.show()
                },500)
                
                
            }else{
                this.flag = false;
                setTimeout(() => {
                    this.toast3 = this.$createToast({
                        txt: '添加成功',
                        type:'correct',
                        mask: true,
                        time:1000
                    })
                    this.toast3.show()
                },500)
                // item = item.push(bookDiffId)
                // arr.push(item)
                // console.log(arr)
                // arr.push(Object.assign({},item,{bookIds:bookDiffId}))
                // console.log(arr)
                // // 加入书架
                // Utils.localSaveJsonStorage('books', arr);
                // // console.log(item)
                arr.push({
                    ...item,
                    bookIds: bookDiffId,
                    link: this.firstchapters.link,
                    order:0
                })
                console.log(arr)
                Utils.localSaveJsonStorage('books', arr);
            }
        },
        checkBookStore(){

        },
        // 下载本书
        toDownLoad(){

        },
        onPullingDown(){
            // 更新数据
            this.isRefresh = true
            // console.dir(this.$refs.scroll)
            // this.categoryInfo(() => {
            //     this.$refs.scroll.forceUpdate()
            // })
        },
        onPullingUp(){
        }, 
    },
    watch:{
        '$route'(newsVal,oldVal){
            // console.log(newsVal)
            if(oldVal.name == 'bookDetail' && this.isLeave){
                this.toast.hide()
            }
            if(newsVal.name == 'bookDetail' && oldVal.name == 'bookListItem'){
                Object.assign(this.$data, this.$options.data())
                this.init();
            }
            if(newsVal.name == 'bookDetail' && oldVal.name == 'classifyList'){
                Object.assign(this.$data, this.$options.data())
                this.init();
            }
            if(newsVal.name == 'bookDetail' && oldVal.name == 'search'){
                Object.assign(this.$data, this.$options.data())
                this.init();
            }
            if(oldVal.name == 'chapterDetail'){
                this.$store.dispatch('setTopShow',true)
            }
        }
    }
}
</script>

<style>
@import '../../style/book/bookDetail.css';
</style>
