<template>
    <div class="hotBooks" v-if="showornot">
        <div class="hotBookLists">
            <p>热门书单，你值得拥有</p>
        </div>
        <div class="hotBookLists_item"
            v-for="item in data"
            :key="item.title"
            :label="item.title"
            :title="item.title"
             >
            <!-- 书单简介 -->
            <div class="hi_up" :key="item.id" @click.stop="toBookListItem(item)">
                <dl>
                    <dt><img :src="url+item.cover" alt="" class="bl_img"></dt>
                    <dd>
                        <p><span class="booklisttitle">{{item.title}}</span></p>
                        <p>作者：<span>{{item.author}}</span></p>
                        <p>书籍：<span>{{item.bookCount}}</span></p>
                        <p>喜欢：<span>{{item.collectorCount}}</span></p>
                    </dd>
                </dl>
            </div>
            <!-- 书单详介 -->
            <div class="hi_down">
                <!-- <div class="hd_all">书单名称：<div class="hd_inside">{{item.title}}</div></div> -->
                <div class="hd_all">书单简介：<div class="hd_inside">{{item.desc}}</div></div>
            </div>       
            <div class="hr"></div>    
        </div>    
        
    </div>
    <div class="empty" v-else>
        <EmptyAlert :msg="msg" />
    </div>
</template>

<script>
import EmptyAlert from '@/components/EmptyAlert'

export default {
    name: 'HotBooks',
    components: {
        EmptyAlert
        },
    props:{
        isRefresh:Boolean
    },
    data(){
        return{
            data: [],
            // covers: [],
            url: BASE_IMG_URL,
            // 是否有书籍信息
            showornot: true,
            // 没有书籍信息时的提示
            msg: '网络有点不给力哦！看看其他的吧'
        }
    },
    created() {
        this.getHotBookLists();
    },
    methods: {
        // 请求书单资源
        getHotBookLists(){ 
            this.toast = this.$createToast({
                txt: 'Loading...',
                mask: true,
                time:60000
            })
            this.toast.show()
            
            api.getHotBookLists({}).then((res)=>{
                // console.log(res)
                if(res.ok){
                    this.toast.hide()
                    if(this.data.toString() == res.bookLists.toString()){
                        this.$emit('needRefresh',false)
                        return 
                    }
                    this.data = res.bookLists
                    this.$emit('List',res.bookLists)
                    this.$emit('needRefresh',true)
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
        toBookListItem(item){
            console.log(item.title)
            let title = item.title
            //隐藏tabBar
            this.$store.dispatch('setTabBar',{
                status:false,
                msg:item.title
            })
            //隐藏tabBar
            this.$store.dispatch('setTopnav',{
                status:false
            })
            // 跳转到书单详情
            this.$router.push({
                name:'bookListItem',
                query:{
                    id: item._id,
                    myTitle:title
                }
            })
        }
    },
    watch:{
        'isRefresh'(newVal,oldVal){
            console.log(newVal)
            if(newVal){
                this.getHotBookLists();
                
            }
        },
        '$route'(newVal,oldVal){
            if(oldVal.name == 'Index'){
                this.toast.hide()
            }
        }
    }
}
</script>

<style>
@import '../../style/index/index.css';
</style>
