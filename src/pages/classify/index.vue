<template>
    <div class="classify" v-if="showornot"> 
        <div class="topNav">
            <ul>
                <li @click="changeNav(index)" 
                :class="index==navNum?'active':''" 
                v-for="(item,index) in navArr" :key="index">
                    {{ item.name }}
                </li>
            </ul>
        </div>
        
        <div class="content" :style="newStyle"><!-- 分类页面内容 -->
            <Swiper :options="bannerDefaultOpt" ref="mySwiper">
                <swiper-slide class="swiper_item" v-for="(item,index) in classfyNum" :key="index">
                    <div class="scroll-list-wrap">
                        <cube-scroll
                            ref="scroll"
                            :data="classfyNum"
                            :options="options"
                            @pulling-down="onPullingDown"
                            @pulling-up="onPullingUp" 
                            :style="newStyle"
                            >
                            <div class="one-box">
                                <one-book 
                                    v-for="(item2,index2) in item" 
                                    :key="index2" :name='item2.name' 
                                    :bookCount='item2.bookCount' 
                                    :bookCover='item2.bookCover[0]'
                                    :gender='navArr[index].type'
                                    :sort='index2' 
                                />
                            </div>
                        </cube-scroll>
                    </div>
                        
                </swiper-slide>
            </Swiper>
            <!-- <ClassifyItems />分类项目//////需要接口 -->
        </div>
    </div>
    <div class="empty" v-else>
        <EmptyAlert :msg="msg" />
    </div>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import OneBook from '@/pages/book/OneBook'
import EmptyAlert from '@/components/EmptyAlert'

export default {
    name: 'Classify', 
    data(){
        var self = this;
        return{
            classfyNum:[],
            navNum:0,
            newStyle:{},
            navArr:[
                {
                    name:'男生',
                    type:'male'
                },
                {
                    name:'女生',
                    type:'female'
                },
                {
                    name:'漫画',
                    type:'picture'
                },
                {
                    name:'经典',
                    type:'press'
                },
            ],
            //轮播默认配置项
            bannerDefaultOpt : {
                pagination : {
                    el: '.swiper-pagination'
                },
                notNextTick: true,
                
                initialSlide:0,
                autoplay : false,
                loop : false,
                autoHeight:true,
                touchAngle : 45,
                on:{
                    slideChange: function(){
                        self.navNum = this.realIndex;
                    },
                    slideChangeTransitionStart:function(){
        
                    }
                },
            },
            //下拉配置
            pullDownRefreshObj:{
                
                txt:'刷新成功'
            },
            // 是否有分类信息
            showornot: true,
            // 没有分类信息时的提示
            msg: '暂时没有分类信息哦！'
        }
    },
    components: {
        SearchBar,
        'Swiper':swiper,
        swiperSlide,
        OneBook,
        EmptyAlert
    },
    computed:{
        swiper() {
            return this.$refs.mySwiper.swiper
        },
        options() {
            return {
            pullDownRefresh: this.pullDownRefreshObj,
            pullUpLoad: this.pullUpLoadObj,
            scrollbar: false,
            eventPassthrough:'horizontal'
            }
        },

    },
    // activated() {
    //     this.init()
    // },
    created(){
        this.init()
    },
    mounted(){
        this.initHeight()
    },
    methods:{
        init(func){
            //请求所有分类
            this.toast = this.$createToast({
                txt: 'Loading...',
                mask: true,
                time:60000
            })
            this.toast.show()
            api.statistics({})
            .then((res) => {
                console.log(res)
                this.toast.hide() 
                if(res.ok){ 
                    if(func){
                        if(this.classfyNum[this.navNum].toString()==res[this.navArr[this.navNum].type].toString()){
                            func()
                            return
                        }
                         this.classfyNum[this.navNum] = res[this.navArr[this.navNum].type]
                         console.log(res[this.navArr[this.navNum].type])
                         this.$refs.scroll[this.navNum].forceUpdate({
                            dirty:true
                        })
                         return
                    }
                    this.classfyNum = [];
                    this.classfyNum.push(res.male)
                    this.classfyNum.push(res.female)
                    this.classfyNum.push(res.picture)
                    this.classfyNum.push(res.press)
                    this.showornot = true
                    console.log(this.classfyNum)
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
        //改变当前所选
        changeNav(index){
            this.navNum = index;
            this.swiper.slideTo(index, 1000, false)
        },
        initHeight(){
            let windowHeight = document.body.clientHeight;
            // alert(windowHeight)
            let botH = document.querySelector('#tabBar').clientHeight;
            let topH = document.querySelector('.topNav').clientHeight;
            let height = this.tabBarShow?botH:topH;
            console.log(topH)
            this.newStyle={
                height:windowHeight-botH-topH+'px'
            }
        },
        onPullingDown(){
            // 更新数据
            // console.dir(this.$refs.scroll)
            this.init(() => {
                this.$refs.scroll[this.navNum].forceUpdate()
            })
        },
        onPullingUp(){

        }

    },
    watch:{
        '$route'(newVal,oldVal){
            
            if(oldVal.name == 'Classify'){
                this.toast.hide()
            }
            
        }
    }
}
</script>

<style>
@import '../../style/classify/classify.css';
</style>
