<template>
    <div class="bookListInfo">
        <!-- 网页头部 -->
        <!-- <TopNav /> -->
        <cube-scroll
                ref="scroll"
                :data="data"
                :options="options"
                @pulling-down="onPullingDown"
                @pulling-up="onPullingUp" 
                v-if="showornot"
                >
            <!-- 书单详情 -->
            <div class="content" 
                :key="bookListItemInfo.title">
                <!-- <div class="up_title tt">书单作者</div> -->
                <div class="up">
                <div class="hi_up">
                        <dl>
                            <dt><img :src="url+author.avatar" alt="" class="bl_img"></dt>
                            <dd>
                                <p>昵称：<span>{{author.nickname}}</span></p>
                                <p>等级：<span>{{author.lv}}</span></p>
                            </dd>
                        </dl>
                        <!-- <hr /> -->
                    </div>
                </div>
                <!-- <div class="center_title tt">书单描述</div> -->
                <div class="center">
                    <div class="params">
                        <ul>
                            <li><div class="collectorCount">收藏人数:<span>{{bookListItemInfo.collectorCount}}</span></div></li>
                            <li><div class="total">书籍总量:<span>{{bookListItemInfo.total}}</span></div></li>
                            <li><div class="updateCount">更新次数:<span>{{bookListItemInfo.updateCount}}</span></div></li>
                            <!-- <li><div class="updated">最近更新:<span>{{bookListItemInfo.updated}}</span></div></li> -->
                        </ul>
                    </div>
                    
                    <div class="center_title tt">书单简介</div>
                    <div class="bookdesc">
                        <div class="desc" v-if="bookListItemInfo.desc!=''">{{bookListItemInfo.desc}}</div>
                        <div class="desc" v-show='bookListItemInfo.desc==undefined'>暂无简介</div>
                    </div>
                </div>
                <!-- <hr /> -->
                <div class="down_title tt">包含书籍</div>
                <div class="down">
                    <div class="bookItem" v-for="item in data" :key="item.id" @click.stop='toBookDetail(item)'>
                        <dl>
                            <dt><img :src="url+item.cover" alt="" class="bl_img"></dt>
                            <dd>
                                <p><span>{{item.title}}</span></p>
                                <p><span>{{item.author}}</span></p>
                                <p>{{item.latelyFollower}}关注<span></span></p>
                                <p><span>{{item.cat}}</span></p>
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
import TopNav from '@/components/TopNav'
import EmptyAlert from '@/components/EmptyAlert'

export default {
    name: 'BookListItem',
    components: {
        TopNav,
        EmptyAlert
    },
    data(){
        return{
            // 书单详情数据
            bookListItemInfo: {},
            // 作者数据
            author: {},
            // 图书数据
            data: [],
            // 底部导航栏隐藏，显示头部
            clearable: {
                visible: true,
                blurHidden: true
            },
            // 图片路径
            url: BASE_IMG_URL,
            newStyle:{},
            // 是否有书单信息
            showornot: true,
            // 没有书单信息时的提示
            msg: '该书单暂时没有详细信息哦！换个书单试试吧'
        }
    },
    computed: {
        options() {
            return {
            pullDownRefresh: this.pullDownRefreshObj,
            pullUpLoad: this.pullUpLoadObj,
            scrollbar: true,
            // eventPassthrough:'horizontal'
            }
        },
    },
    created() {
        this.init();
    },
     methods: {
         init(){
             this.toast = this.$createToast({
                txt: 'Loading...',
                mask: true,
                time:60000
            })
            this.toast.show()

             let bookId = this.$route.query.id
                api. getBookListInfo({},bookId).then((res)=>{
                    this.toast.hide()
                    if(res.ok){
                        this.showornot = true
                        this.bookListItemInfo = res.bookList
                        this.author = res.bookList.author
                        this.data = res.bookList.books.map(item=>{
                            return item.book
                        })
                    }else{
                        this.toast1 = this.$createToast({
                            txt: '请求超时',
                            mask: true,
                            time:3000
                        })
                        this.toast.show()
                        this.showornot = false
                    }
                    
                })
         },
       toBookDetail(item){
            let title = item.title
            //隐藏tabBar
            this.$store.dispatch('setTabBar',{
                status:false,
                msg:item.title,
            })
            //隐藏tabBar
            this.$store.dispatch('setTopnav',{
                status:false,
            })
            
            // 跳转到书单详情
            this.$router.push({
                name:'bookDetail',
                query:{
                    id: item._id,
                    author: item.author,
                    myTitle:title
                }
            })
        },
        onPullingDown(){
            // 更新数据
            
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
            if(newsVal.name == 'bookListItem' && oldVal.name == "Index"){
                // 书单详情数据
                this.bookListItemInfo={};
                this.author={};
                this.data=[];
          
                this.$refs.scroll.scrollTo(0,0,0) 
                this.init();
            }
            if(oldVal.name == 'bookListItem'){
                this.toast.hide()
            }
            
        }
    }
}
</script>

<style>
@import '../../style/index/bookListItem.css';
</style>
