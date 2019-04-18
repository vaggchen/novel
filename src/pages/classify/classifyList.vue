<template>
    <div class="classifyList">
        <div class="topBox">
            
            <div class="childClassify">
                <span v-for="(item,index) in childClassify" 
                :key="index"
                @click="changeCls(item)"
                :class="defaultClas==item?'active':''">
                {{ item }}
                </span>
            </div>
            <div class="classifyType">
                <span v-for="(item,index) in typeArr" 
                :key="index" 
                @click="changeType(item.type)"
                :class="defaultType==item.type?'active':''">
                {{ item.name }}
                </span>
            </div>
            
        </div>
        <div class="bookList">
            <cube-scroll
                ref="scroll"
                :data="lists"
                :options="options"
                @pulling-down="onPullingDown"
                @pulling-up="onPullingUp" 
                :style="newStyle"
                v-if="showornot"
                >
                <OneBookShow v-for="(item,index) in lists" 
                :key="index"
                :bookCover='item.cover' 
                :name='item.title'
                :author='item.author'
                :des='item.shortIntro'
                :id='item._id'
                :majorCate='item.majorCate'
                :latelyFollower='item.latelyFollower'
                :retentionRatio='item.retentionRatio'
                />
            </cube-scroll>
            <div class="empty" v-else>
                <EmptyAlert :msg="msg" />
            </div>
        </div>
    </div>
</template>

<script>
import OneBookShow from '@/pages/book/OneBookShow'
import EmptyAlert from '@/components/EmptyAlert'

export default {
    data() {
        return {
            typeArr:[
                {
                    name:'热门',
                    type:'hot'
                },
                {
                    name:'新书',
                    type:'new'
                },
                {
                    name:'好评',
                    type:'reputation'
                },
                {
                    name:'完结',
                    type:'over'
                },
            ],
            childClassify:[
                '全部'
            ],
            //下拉配置
            pullDownRefreshObj:{
                txt:'刷新成功'
            },
            pullUpLoadObj:{

            },
            newStyle:{},
            lists:[],
            defaultType:'hot',
            defaultClas:'全部',
            startNumber:0,
            limitNumber:20,
            totalCount:0,
            // 是否有书籍信息
            showornot: true,
            // 没有书籍信息时的提示
            msg: '暂时没有分类信息哦！请稍后重试'
        }
    },
    components:{
        OneBookShow,
        EmptyAlert
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
    created(){
        console.log(this.$route.query)
        
        this.childstatistics()
        this.categoryInfo()
    },
    mounted(){
        this.initHeight()
    },
    methods: {
        initHeight(){
            let windowHeight = document.body.clientHeight;
            // alert(windowHeight)
            let top1 = document.querySelector('#topNav').clientHeight;
            let top2 = document.querySelectorAll('.topBox')[0].clientHeight;
            this.newStyle={
            height:windowHeight-top1-top2+'px'
            }
        },
        onPullingDown(){
            // 更新数据
            console.dir(this.$refs.scroll)
            this.categoryInfo(() => {
                this.$refs.scroll.forceUpdate()
            })
        },
        onPullingUp(){
            if(this.limitNumber+this.startNumber<this.totalCount){
                this.startNumber = this.limitNumber+this.startNumber;
                this.onPullingDown()
            }else{
                this.pullUpLoadObj.txt = '没有更多了'
            }
        },
        //获取子分类
        childstatistics(){
            api.childstatistics({}).then((res) => {
                if(res){
                    this.childClassify =['全部']
                    let obj = res[this.$route.query.gender][this.$route.query.sort]
                    // console.log(obj)
                    this.childClassify.push(...obj.mins)
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
        //拉取分类信息
        categoryInfo(func){
            this.toast = this.$createToast({
                txt: 'Loading...',
                mask: true,
                time:60000
            })
            this.toast.show()

            let obj = {
                gender:this.$route.query.gender,
                type:this.defaultType,
                major:this.$route.query.major,
                minor:this.defaultClas,
                start:this.startNumber,
                limit:this.limitNumber,
            }
            if(this.defaultClas=="全部"){
                obj.minor=""
            }
            api.categoryInfo(obj).then((res) => {
                if(res.ok){
                    this.showornot = true
                    this.toast.hide()
                    if(func){
                        //判断是否需要刷新
                        if(this.lists.toString()==res.books.toString()){
                            func();
                            return ;
                        }else{
                            this.$refs.scroll.forceUpdate({
                                dirty:true
                            })
                        }
                        
                    }
                    this.lists.push(...res.books);
                    this.totalCount = res.total
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
        changeType(type){
            if(type==this.defaultType){
                return
            }
            this.defaultType = type;
            this.$refs.scroll.scrollTo(0,0,0)
            this.startNumber = 0;
            this.lists = [];
            this.categoryInfo()
        },
        changeCls(it){
            if(it==this.defaultClas){
                return
            }
            this.defaultClas = it;
            this.$refs.scroll.scrollTo(0,0,0)
            this.startNumber = 0;
            this.lists = [];
            this.categoryInfo()
        }
    },
    watch:{
        '$route'(newsVal,oldval){
            console.log(newsVal)
            if(newsVal.name == 'classifyList' && oldval.name == 'Classify'){
                this.$refs.scroll.scrollTo(0,0,0)
                this.lists = [];
                this.defaultType = 'hot';
                this.defaultClas = '全部';
                this.startNumber = 0;

                // this.childstatistics()
                this.categoryInfo()
                this.initHeight()
            }  
            if(oldval.name == 'classifyList'){
                this.toast.hide()
            }
        },
        
    }
}
</script>

<style>
@import '../../style/classify/classifyList.css';
</style>
