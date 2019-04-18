<template>
    <div class="search">
        <!-- 搜索框 -->
        <SearchBar @search='Search' :inputVal='inputVal' @getVal='getVal'/>

        <div class="scroll-cnt" v-show="lists.length==0" :style="newStyle">
            <!-- 热词 -->
            <searchHot @clickWords='clickWords' :arr='searchWords' :title='searchHotwordsTitle' :count='searchWordsCount'/>
            <!-- 书籍 -->
            <searchHot @clickWords='clickWords' :arr='searchHotBooks' :title='searchHotBooksTitle' :count='searchHotBooksCount'/>
             <!-- 历史搜索 -->
            <searchHistory @clickWords='clickWords' :val='alreadyWords' :title='searchHotBooksTitle' :count='searchHotBooksCount'/>
        </div>
        
        <!-- 搜索结果//////需要接口 -->
        <div class="searchResult" :style="newStyle" v-show="lists.length>0">
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
                :majorCate='item.cat'
                :latelyFollower='item.latelyFollower'
                :retentionRatio='item.retentionRatio'
                />     
            </cube-scroll>
            <div class="empty" v-else>
                <EmptyAlert :msg="msg" />
            </div>
        </div>

        <!-- 热门搜索//////需要接口 -->
        <div class="hotSearch">

        </div>
    </div>
</template>
<script>
import SearchBar from '@/components/SearchBar'
import searchHot from '@/components/searchHot'
import searchHistory from '@/components/searchHistory'
import OneBookShow from '@/pages/book/OneBookShow'
import EmptyAlert from '@/components/EmptyAlert'

export default {
    name: 'Search',
    data() {
        return {
            lists:[],
            searchWords:[],
            searchHotwordsTitle:'搜索热词',
            searchWordsCount:15,
            searchHotBooks:[],
            searchHotBooksTitle:'热门推荐',
            searchHotBooksCount:6,
            inputVal:'',
            alreadyWords:'',
            newStyle:{},
            newStyle2:{},
            // 是否有书籍信息
            showornot: true,
            // 没有搜索结果时的提示
            msg: '我已经很努力了，但是还是没有搜到主要想要的书也！'
        }
    },
    components: {
        SearchBar,
        OneBookShow,
        searchHot,
        searchHistory,
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
        this.searchHotwords()
    },
    mounted() {
        this.initHeight()
    },
    methods: {
        initHeight(){
            let windowHeight = document.body.clientHeight;
            // alert(windowHeight)
            let top1 = document.querySelector('#topNav').clientHeight;
            let top2 = document.querySelectorAll('.com_searchBar')[0].clientHeight;
            this.newStyle={
                height:windowHeight-top1-top2+'px'
            }
        },
        //搜索
        Search(obj){
            if(obj.keyword==""){
                return
            }
            this.toast = this.$createToast({
                txt: 'Loading...',
                mask: true,
                time:60000
            })
            this.toast.show()

            this.alreadyWords = this.inputVal;

            api.search(obj).then((res) => {
                this.toast.hide()
                if(res.ok){
                    this.lists = res.books
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
        
        //获得搜索热词和书籍
        searchHotwords(){
            api.searchHotwords({}).then((res) => {
                
                if(res.ok){
                    this.searchWords = res.searchHotWords;
                }else{
                        this.toast1 = this.$createToast({
                            txt: '请求超时',
                            mask: true,
                            time:3000
                        })
                        this.toast.show()
                        // this.showornot = false
                    }
                // console.log(res)
            })
            api.hotHooks({}).then((res) => {
                
                if(res.ok){
                    this.searchHotBooks = res.newHotWords;
                }else{
                        this.toast1 = this.$createToast({
                            txt: '请求超时',
                            mask: true,
                            time:3000
                        })
                        this.toast.show()
                        // this.showornot = false
                    }
                // console.log(res)
            })
            
        },
        getVal(val){
            
            if(val==""){
                this.lists = []
            }else{
                this.inputVal = val;
            }
        },
        clickWords(word){
            this.inputVal = word;
            let obj = {
                keyword:word
            }
            this.Search(obj)
        },
        
        onPullingDown(){
            
        },
        onPullingUp(){

        },
    },
    watch:{
        '$route'(newsVal,oldVal){
            if(oldVal.name == 'Index' && newsVal.name == 'search'){
                this.inputVal = "";
                this.lists = [];
                this.searchWords = [];
                this.searchHotBooks = [];
                this.searchHotwords()
            }
            if(oldVal.name == 'search'){
                if(this.inputVal!=""){
                    this.toast.hide()
                }
            }
            // console.log(this.inputVal)
        }
    }
}
</script>

<style>
@import '../../style/book/book.css'
</style>
