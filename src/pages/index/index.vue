<template>
<!-- 首页  -->
    <div class="index">
        <cube-scroll
                ref="scroll"
                :data="list"
                :options="options"
                @pulling-down="onPullingDown"
                @pulling-up="onPullingUp" 
                :style="newStyle"
                >
                
            <div class="searchBar"><!-- 搜索框 -->
                <indexTop />
            </div>
            
            <div class="content">  <!-- 首页内容 -->            
                <Slider /><!-- 图片轮播//////需要接口 -->           
                <HotClassify /><!-- 首页热门分类//////需要接口 -->
                <HotBooks @List='getList' @needRefresh='needRefresh' :isRefresh='isRefresh'/><!-- 首页热门书籍 -->
            </div>    
        </cube-scroll>
         
    </div>
</template>

<script>
import indexTop from './indexTop'
import Slider from '@/pages/index/slider'
import HotClassify from '@/pages/index/hotClassify'
import HotBooks from '@/pages/index/hotBooks'
export default {
    name: 'Index',
    components: {
        indexTop,
        Slider,
        HotClassify,
        HotBooks
    },
    data() {
        return{
            list:[],
            //下拉配置
            pullDownRefreshObj:{
                txt:'刷新成功'
            },
            newStyle:{},
            isRefresh:false
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
    created(){
    // api.Login({})
    //     .then((res)=>{
    //         console.log(res)
    //     })
    },
    methods:{
        getList(arr){
            // console.log(arr)
            this.list = arr
        },
        needRefresh(flag){
            if(this.isRefresh){
                this.$refs.scroll.forceUpdate({
                    dirty:flag
                })
                this.isRefresh =false
            }
            
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
    }
  }
</script>

<style>
@import '../../style/index/index.css';
</style>
