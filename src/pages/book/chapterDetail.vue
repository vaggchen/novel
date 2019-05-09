<template>
    <div class="chapterDetail" :class="isDark?'isDark':''">
        <!-- 侧滑导航根容器 -->
        <div class="mui-off-canvas-wrap  mui-slide-in" id="mui-off-canvas-wrap">
            <!-- 菜单容器 -->
            <aside class="mui-off-canvas-left">
                <div class="mui-scroll-wrapper">
                <div class="mui-scroll" >
                    <!-- 菜单具体展示内容 -->
                    <ul>
                    <li :class="index==sort?'actived':''" 
                    @tap="toClickChapter(item,index)"
                     v-for="(item ,index) in bookMenu" 
                     :key="index" :id="item.id">{{item.title}}
                    </li>
                </ul>
                </div>
                </div>
            </aside>
            <!-- 主页面容器 -->
            <div class="mui-inner-wrap">
                <div class="content" @click='clickmidBox($event)'>
                    <cube-scroll
                        ref="scroll"
                        :data="chapterArr"
                        :options="options3"
                        @pulling-down="onPullingDown"
                        @pulling-up="onPullingUp" 
                        >
                        <div v-if="isTxt" 
                        v-html="chapterDetail" 
                        class="novelRead" 
                        :style='textStyle'
                        :class="isDark?'':colorArr[currentColor]">
                        </div>
                        <div v-else class="picturesRead">
                            <div v-html="chapterDetail"></div>
                            <div v-for="item in pictures" :key="item" class="pictures">
                                <img :src="item" alt="">
                            </div>
                            
                        </div>
                    </cube-scroll>
                    <!-- <pre>{{chapterDetail}}</pre> -->
                </div>
            </div>
        </div>
        

        <!-- 工具 -->
        <div class="fixedDiv" id='readTool' v-show="toolsShow" @tap.stop='hideTool' @touchmove.stop="notClick">
            
            <div id="setting" @touchstart.stop='notClick'>
                <div>
                    <div class="left" @touchstart.stop='toPre'>
                        <i class="iconfont icon-fanhui"></i>
                    </div>
                    
                    <div class="right" @touchstart.stop='toNext'>
                        <i class="iconfont icon-right"></i>
                    </div>
                    <div class="mid2 mui-input-row mui-input-range">
                        
                        <input type="range" min="0" max="100" v-model="rangeVal" @change="changeSort" @input.stop="rangeChange">
                        <span class="tooltip" v-show="isShowChapter">
                        {{showChapter}}</span>
                    </div>
                </div>
                <div>
                    <div class="left btn" @touchstart.stop="changeText('notAdd')">
                        <span>A-</span>
                    </div>
                    <div class="right btn" @touchstart.stop="changeText('Add')">
                        <span>A+</span>
                    </div>
                    <div class="mid btn" @touchstart.stop="changeText('return')">
                        <span>A</span>
                    </div>
                    
                </div>
                <div>
                    <div class="left btn" @touchstart.stop="changeLine('notAdd')">
                        <i class="iconfont icon-twoLine"></i>-
                    </div>
                    <div class="right btn" @touchstart.stop="changeLine('Add')">
                        <i class="iconfont icon-fourLine"></i>+
                    </div>
                    <div class="mid btn" @touchstart.stop="changeLine('return')">
                        <i class="iconfont icon-threeLine"></i>
                    </div>
                    
                </div>
                <div class="colorSelect">
                    <span  
                    @touchstart.stop='changeColor(index,item)'
                    :class="item" 
                    
                    v-for="(item,index) in colorArr.slice(0,3)"
                    
                    :key="index">
                      
                    </span>
                    <span ><input  type="color" :style="colorStyle" v-model="colorVal" @input.stop='changeColor(4,"other")'></span>
                </div>
            </div>
            <div class="botTool" @touchstart.stop='notClick'>
                
                <div @touchstart.stop="toMenu">
                    <p><i class="iconfont icon-mulu"></i></p>
                    <p>目录</p>
                </div>
                <div @touchstart.stop="changeModel">
                    <div v-show="!isDark">
                        <p><i class="iconfont icon-yejianmoshi"></i></p>
                        <p>夜间</p>
                    </div>
                    <div v-show="isDark">
                        <p><i class="iconfont icon-rijianmoshi"></i></p>
                        <p>日间</p>
                    </div>
                </div>
                <div @touchstart.stop="changeReasource">
                    <p><i class="iconfont icon-huanyuan"></i></p>
                    <p>换源</p>
                </div>
            </div>
        </div>
        <!-- 目录 -->
        <!-- <div id="menuList" class="menuList" v-show="menuShow" :class="isDark?'isGray':''">
          <cube-scroll
                ref="scroll2"
                :data="bookMenu"
                :options="options2"
                @pulling-down="onPullingDown"
                @pulling-up="onPullingUp" 
                >
                  <ul>
                    <li :class="index==sort?'actived':''" 
                    @click="toClickChapter(item,index)"
                     v-for="(item ,index) in bookMenu" 
                     :key="index" :id="item.id">{{item.title}}
                    </li>
                </ul> -->
            <!-- </cube-scroll> -->
            
            <!-- <span class="menuBtn" name='up' v-show="!sortSort" @click.stop="catType(0)">降</span>     
            <span class="menuBtn" name='down' v-show="sortSort" @click.stop="catType(1)">升</span> -->
            <!-- <ul>
                    <li :class="index==sort?'actived':''" 
                    @click.prevent="toClickChapter(item,index)"
                     v-for="(item ,index) in bookMenu" 
                     :key="index" :id="item.id">{{item.title}}
                    </li>
                </ul>
            </cube-scroll>
        </div> --> 
        <!-- 换源 -->
        <div id="changeReasource" @touchstart.stop='notClick' v-show="ReasourceShow">
                <ul>
                    <li @click="changeBook(item)" v-for="item in booksReasourcArr" :key="item.id">
                        {{ item.name }}
                    </li>
                </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'chapterDetail',
    data() {
        return {
            title: '',
            chapterArr:[],
            chapterDetail: '',
            bookMenu: [],
            Url:"",
            pullUpLoadObj:{
                txt:'加载成功'
            },
            sort:0,
            // 书架书籍换源id
            bookDiffId: [],
            // 书架书籍第一章
            firstchapters:[],
            // 判断是书籍还是漫画
            isTxt: true ,
            // 漫画图片
            pictures: [],
            toolsShow:false,
            bookId:"",
            menuShow:false,
            isDark:false,
            colorArr:['white','lightgreen','deepyellow',''],
            currentColor:0,
            lineStyle:{},
            defaultLine:1.5,
            textStyle:{},
            defaultText:1,
            ReasourceShow:false,
            booksReasourcArr:[],
            sortSort:false,
            rangeVal:0,
            showChapter:'',
            isShowChapter:false,
            options:{
                scrollY: true, //是否竖向滚动
                scrollX: false, //是否横向滚动
                startX: 0, //初始化时滚动至x
                startY: 0, //初始化时滚动至y
                indicators: true, //是否显示滚动条
                deceleration:0.0001, //阻尼系数,系数越小滑动越灵敏
                bounce: true, //是否启用回弹
                click:true
            },
            colorVal:'',
            colorStyle:{}
        }
    },
    computed: {
        options3() {
            return {
            pullDownRefresh: this.pullDownRefreshObj,
            pullUpLoad: this.pullUpLoadObj,
            scrollbar: false,
            // eventPassthrough:'horizontal'
            }
        },
        options2(){
            return {
                pullDownRefresh: this.pullDownRefreshObj2,
                pullUpLoad: this.pullUpLoadObj2,
                scrollbar: {
                    fade: true,
                    interactive: true // 1.8.0 新增
                },
            }
            
        },
        
    },
    created() {
    // activated() {
        this.sort = this.$route.query.sort;
        
        this.$store.dispatch('setTopShow',false)
        this.Url = this.$route.query.link;
        this.showChapter = this.$route.query.myTitle;
        this.init()
        let id = this.$route.query.bookDiffId
        this.initmenu(id,()=>{
            this.rangeVal = parseInt(Math.floor(this.sort/(this.bookMenu.length-1)*100))
            this.$nextTick(() => {
                  mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,0);
                let h2 = document.querySelector('#mui-off-canvas-wrap .actived').offsetTop
                console.dir(h2)
                let H = document.body.clientHeight;
                if(h2>H){
                    h2 = h2-H/2
                }
                mui('.mui-scroll-wrapper').scroll().scrollTo(0,-h2,100);
            })
           
        });
        // console.log('news')
    },
    mounted(){
        this.$nextTick(()=>{
            let windowHeight = document.body.clientHeight;
            document.querySelector('#app .chapterDetail').style.height=windowHeight+'px';
            document.querySelector('#app .chapterDetail').style.marginTop=0;

            // this.$store.dispatch('setTopShow',false)
            // mui('.mui-scroll-wrapper').scroll({
            //     deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            // });
            // mui('.mui-off-canvas-wrap').offCanvas().show();
            // mui('.mui-off-canvas-wrap').offCanvas().close();
            // this.$nextTick(() => {
            //      let h = document.querySelector('.mui-scroll').clientHeight * this.rangeVal/100;
            // console.log(h)
            // mui('.mui-scroll-wrapper').scroll().scrollTo(0,h,100);
            // })
        })
    },
    methods: {
        //初始化
        init(param){
            this.$store.dispatch('setTopShow',false)
            this.toast = this.$createToast({
                txt: 'Loading...',
                mask: true,
            })
            this.toast.show()
            this.initDetail(this.Url,param)    
        },
        
        initDetail(url,param){
            // this.Url = url
            // console.log(url)
            api.getBookChaptersDetail({},url).then((res)=>{
                this.$store.dispatch('setTabBar',{
                    status:false,
                    msg:res.chapter.title
                })
                if((res.ok && res.chapter.cpContent) || (res.ok && res.chapter.body)){
                    this.isTxt = true
                    
                    this.title =res.chapter.title;
                    // this.currentid = res.chapter.id
                    let content = ""
                    if(res.chapter.cpContent){
                        content = res.chapter.cpContent;
                    }else{
                        content = res.chapter.body;
                    }
                    
                    if(param && param == 'next'){
                        this.chapterArr.push(res.chapter)
                        this.chapterDetail +='<div class="title">'+this.title+'</div>';
                        //去除所有空格
                        let str = content.replace(/\s/g,"\n");//生成新的字符串，并未对原字符串修改

                        this.chapterDetail +='&#12288;&#12288;'
            
                        if(str.indexOf('\n')!=-1 && str.indexOf('\n\n')==-1){
                            
                            this.chapterDetail += str.replace(/\n/g,"<p></p>&#12288;&#12288;")
                        }else{
                            this.chapterDetail += str.replace(/\n\n/g,"<p></p>&#12288;&#12288;")
                        }
                    }else if(param && param == 'pre'){
                        // this.chapterArr.unshift(res.chapter)
                        // this.chapterDetail = '<div class="title">'+this.title+'</div>' +this.chapterDetail;
                        // //去除所有空格
                        // let str = content.replace(/\s/g,"\n");//生成新的字符串，并未对原字符串修改

                        // this.chapterDetail +='&#12288;&#12288;'
            
                        // if(str.indexOf('\n')!=-1 && str.indexOf('\n\n')==-1){
                            
                        //     this.chapterDetail += str.replace(/\n/g,"<p></p>&#12288;&#12288;")
                        // }else{
                        //     this.chapterDetail += str.replace(/\n\n/g,"<p></p>&#12288;&#12288;")
                        // }
                    }else{
                        this.chapterArr = []
                        this.chapterArr.push(res.chapter)
                        this.chapterDetail ='<div class="title">'+this.title+'</div>';
                        //去除所有空格
                        let str = content.replace(/\s/g,"\n");//生成新的字符串，并未对原字符串修改

                        this.chapterDetail +='&#12288;&#12288;'

                        //继续筛选
                        let str2 = "";
                        if(str.indexOf('\n\n')!=-1 && str.indexOf('\n\n')!=str.indexOf('\n\n\n\n')){
                            
                            str2 = str.replace(/\n\n/g,"<p></p>&#12288;&#12288;")
                        }else{
                            str2 = str.replace(/\n\n\n\n/g,"<p></p>&#12288;&#12288;")
                        }
                        
                        this.chapterDetail += str2
                    }
                    this.toast.hide()
                }else if(res.ok && res.chapter.images){// 如果存在漫画图片
                    this.isTxt = false
                    this.title =res.chapter.title
                    // console.log(res)
                    this.chapterDetail +='<div class="title">'+this.title+'</div>';
                    this.pictures = res.chapter.images.split(',')
                    console.log(this.pictures)
                    console.log(this.isTxt)
                }else{
                    this.toast1 = this.$createToast({
                        txt: '请求超时',
                        mask: true,
                        time:3000
                    })
                    this.toast.show()
                }
                this.showChapter = this.title
            }) 
        },
        scrollToElement() {
            this.$refs.scroll2 && this.$refs.scroll2.scrollToElement.apply(this.$refs.scroll2, arguments)
        },
        //初始化目录
        initmenu(id,func){
             // 书籍章节列表(传递书籍id)
            
            this.bookMenu = []
            api.getBookChaptersList({},id).then((res)=>{
                if(res){
                    // console.log(res)
                    this.bookId = res.book;
                    this.bookMenu = res.chapters;
                    
                    // this.$nextTick(()=>{
                    //     let sortId = this.bookMenu[this.sort].id;
                    //     let dom = document.getElementById(sortId);
                    //     console.log(this.sort)
                    // })
                    if(func){
                        if(this.sort<=this.bookMenu.length)
                        func(this.bookMenu[this.sort].link)
                    }
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
        //换源
        getBookComeDiff(){
            let id = this.bookId
            api.getBookComeDiff({},id).then((res)=>{
                console.log(res)
                this.booksReasourcArr = res
            })
        },
        onPullingDown(){
            // 更新数据
            // this.isRefresh = true
            // console.dir(this.$refs.scroll)
            // this.categoryInfo(() => {
            //     this.$refs.scroll.forceUpdate()
            // })
        },
        onPullingUp(){
            if(this.sort>=this.bookMenu.length-1){
                let toast = this.$createToast({
                    txt: '没有更多了',
                    time:1000,
                    type:'txt'
                })
                toast.show()
                return
            }
            this.sort++;
            // console.log(this.sort)
            this.changeOrder(this.sort)
            this.Url = encodeURIComponent(this.bookMenu[this.sort].link);
            this.init('next')
        }, 
        toPre(){
            if(this.sort<=0){
                let toast = this.$createToast({
                    txt: '没有更多了',
                    time:1000,
                    type:'txt'
                })
                toast.show()
                return
            }
            this.sort--;
            // console.log(this.sort)
            this.changeOrder(this.sort)
            this.Url = encodeURIComponent(this.bookMenu[this.sort].link);
            this.init()
        }, 
        toNext(){
            if(this.sort>=this.bookMenu.length-1){
                let toast = this.$createToast({
                    txt: '没有更多了',
                    time:1000,
                    type:'txt'
                })
                toast.show()
                return
            }
            this.sort++;
            // console.log(this.sort)
            this.changeOrder(this.sort)
            this.Url = encodeURIComponent(this.bookMenu[this.sort].link);
            this.init()
        }, 
        //点击中间部分
        clickmidBox(e){
            if(mui('#mui-off-canvas-wrap').offCanvas().isShown()){
                mui('#mui-off-canvas-wrap').offCanvas().close();
                return 
            }
            
            // if(this.menuShow){
            //     this.menuShow =false
            //     return 
            // }
            if(this.ReasourceShow){
                this.ReasourceShow =false
                return
            }
            let windowHeight = document.body.clientHeight;
            let top = e.clientY/windowHeight;
            if(0.33<top && top<0.67){
                this.$store.dispatch('setTopShow',true)
                this.toolsShow = true
            }
        },
        hideTool(){
            this.$store.dispatch('setTopShow',false)
                this.toolsShow = false
        },
        notClick(){

        },
        toMenu(){
            this.toolsShow = false;
            this.$store.dispatch('setTopShow',false)
            mui('#mui-off-canvas-wrap').offCanvas().show();
            this.menuShow = true 
        },
        catType(name){
            //  this.$refs.scroll2.scrollTo(0,0,0)
            
            if(name == '0'){
                this.sortSort = true
                this.toast = this.$createToast({
                    txt: '升序中...',
                    mask: true,
                    time:500
                })
                this.toast.show()
                this.bookMenu = this.bookMenu.reverse();
            }else if(name == '1'){
                this.sortSort = false
                this.toast = this.$createToast({
                    txt: '降序中...',
                    mask: true,
                    time:500
                })
                this.toast.show()
                this.bookMenu = this.bookMenu.reverse();
                // console.log(this.bookMenu)
            }
            //this.$refs.scroll2.scrollTo(0,0,300)
        },
        toClickChapter(obj,index){
            mui('#mui-off-canvas-wrap').offCanvas().close();
            this.$store.dispatch('setTabBar',{
                status:false,
                msg:obj.title
            })
            this.menuShow = false;
            this.sort = index;
            console.log(this.sort)
            this.changeOrder(this.sort)
            this.Url = encodeURIComponent(obj.link);
            this.chapterArr=[];
            this.chapterDetail=""

            this.rangeVal = parseInt(Math.floor(this.sort/(this.bookMenu.length-1)*100))
            this.init()
        },
        changeModel(){
            this.isDark=!this.isDark
        },
        changeColor(index,item){
            document.querySelector('.chapterDetail .novelRead').style.backgroundColor=''
            this.currentColor = index;
            if(item=='other'){
                document.querySelector('.chapterDetail .novelRead').style.backgroundColor=this.colorVal
                this.colorStyle = {
                    backgroundColor:this.colorVal
                }
                return
            }
            
        },
        changeLine(param){
            
            if(param == 'Add'){
                this.defaultLine+=0.1
            }else if(param == 'return'){
                this.defaultLine=1.5;
            }else{
                this.defaultLine-=0.1;
            }
            this.textStyle = {
                    lineHeight:this.defaultLine+'rem',
                    fontSize:this.defaultText+'rem'
                }
        },
        changeText(param){
            if(param == 'Add'){
                this.defaultText+=0.1
            }else if(param == 'return'){
                this.defaultText=0.7;
            }else{
                this.defaultText-=0.1;
            }
            this.textStyle = {
                    lineHeight:this.defaultLine+'rem',
                    fontSize:this.defaultText+'rem'
                }
        },
        changeReasource(){
            this.toolsShow = false;
            this.$store.dispatch('setTopShow',false)
            this.ReasourceShow = true;
            this.getBookComeDiff()
        },
        changeBook(item){
            this.ReasourceShow = false;
            this.toast = this.$createToast({
                txt: '换源中...',
                mask: true
            })
            this.toast.show()
            this.initmenu(item._id,(link)=>{
                let url = encodeURIComponent(link)
                this.initDetail(url)
            })
        },
        changeOrder(sort){
            
            let arr = Utils.localLoadJsonStorage('books');
            if(arr!=undefined && arr !=null){
                console.log(arr)
                let arr1 = arr.filter((item) => {
                    return item._id == this.bookId
                })
                arr1[0].link = this.bookMenu[sort].link;
                arr1[0].order = sort
                
                 Utils.localSaveJsonStorage('books', arr);
            }
           
        },
        //滑块
        rangeChange(){
            this.isShowChapter = true
            // console.log(this.rangeVal)
            let sort = parseInt(Math.floor(this.rangeVal*(this.bookMenu.length-1)/100));
            this.showChapter = this.bookMenu[sort].title || ''
        },
        changeSort(){
            this.isShowChapter = false
            let sort = parseInt(Math.floor(this.rangeVal*(this.bookMenu.length-1)/100));
            this.sort = sort;

            this.$nextTick(()=>{
                mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,0);

                let h2 = document.querySelector('#mui-off-canvas-wrap .actived').offsetTop
                console.dir(h2)
                let H = document.body.clientHeight;
                if(h2>H){
                    h2 = h2-H/2
                }
                mui('.mui-scroll-wrapper').scroll().scrollTo(0,-h2,100);
            })
            

            this.changeOrder(sort)
            this.Url = encodeURIComponent(this.bookMenu[this.sort].link);
            this.init()
            this.hideTool()
        }
    },
    watch:{
        '$route'(newsVal,oldVal){
            console.log(oldVal)
            // this.$store.dispatch('setTopShow',false)
            
            if(oldVal.name == 'chapterDetail'){
                this.toast.hide()
                
            }
            if(newsVal.name == 'BookStore'){
                console.log(1)
            }
        }
    }
}
</script>

<style>
@import '../../style/book/chapterDetail.css';
</style>
