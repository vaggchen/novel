<template>
    <div class="lists">
        <div class="down" v-if="showornot">
            <div class="bookItem" v-for="item in listsinfo" :key="item.id" @click.stop='toBookDetail(item)'>
                <dl>
                    <dt><img :src="url+item.cover" alt="" class="bl_img"></dt>
                    <dd>
                        <p><span>{{item.title}}</span></p>
                        <p><span>{{item.author}}</span></p>
                        <p>{{item.latelyFollower}}关注<span></span></p>
                        <p><span>{{item.majorCate}}</span></p>
                    </dd>
                </dl>
            </div>
            <!-- <div class="alert">没有更多了，亲</div> -->
        </div>  
        <div class="empty" v-else>
            <EmptyAlert :msg="msg" />
        </div>  
    </div>
</template>

<script>
import EmptyAlert from '@/components/EmptyAlert'
export default {
    name: 'lists',
    components: {
        EmptyAlert
        },
    data() {
        return {
            listsinfo: [],
            url: BASE_IMG_URL,
            showornot: true,
            msg: '网络有点不给力啊，稍后重试吧！'
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
        this.init()
    },
    methods: {
        init(){
             this.toast = this.$createToast({
                txt: 'Loading...',
                mask: true,
            })
            this.toast.show()

             let bookId = this.$route.query.id
                api. getHotClassifyLists({},bookId).then((res)=>{
                    if(res.ok){
                        this.toast.hide()
                        this.listsinfo = res.ranking.books
                        this.showornot = true
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
            
            // 跳转到书籍详情
            this.$router.push({
                name:'bookDetail',
                query:{
                    id: item._id,
                    author: item.author,
                    myTitle:title
                }
            })
        },
        
    },
    watch: {
        '$route'(newsVal,oldVal){
            if(oldVal.name == 'lists'){
                this.toast.hide()
            }
            
        }
    },
}
</script>

<style>
@import '../../style/book/lists.css';
</style>
