<template>
    <div class="hotClassify" v-if="showornot">
        <dl class="hotClassify_item" 
            v-for="item in data"
            :key="item.title"
            :label="item.title"
            :title="item.title" 
            @click="toLists(item)"
            >
            <dt class="hi_img"><img :src="url+item.cover" :alt="item.title"></dt>
            <dd class="hi_name">{{item.title}}</dd>
        </dl>
    </div>
    <div class="empty" v-else>
            <EmptyAlert :msg="msg" />
        </div>
</template>
  
<script>
import EmptyAlert from '@/components/EmptyAlert'

export default { 
    name: 'HotClassify',
    components: {
        EmptyAlert
        },
    data(){
        return{
            data:[],
            url: BASE_IMG_URL,
            // 是否有热门分类
            showornot: true,
            // 没有热门分类信息时的提示
            msg: '暂时没有该书的详细信息哦！换本书吧'
        }
    },
    created() {
        api.getHotClassify({}).then((res)=>{
            // console.log(res.picture)
            if(res.epub){
                this.data = res.epub
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
            
            // console.log(res)
        })
    },
    methods: {
        toLists(item){
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
                name:'lists',
                query:{
                    id: item._id,
                    myTitle:title
                }
            })
        },
    },
}
</script>

<style>
@import '../../style/index/index.css';
</style>
