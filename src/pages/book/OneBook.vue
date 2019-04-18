<template>
<!-- 分类页图片所指书籍 -->
    <div class="onebook" @click="toList()">
        <img :src="imgUrl+bookCover" alt="">
        <span>{{name}}</span><span>{{'('+bookCount+')'}}</span>
    </div>
</template>

<script>
export default {
    props:{
        name:String,
        bookCount:Number,
        bookCover:String,
        gender:String,
        sort:Number
    },
    data() {
        return {
            imgUrl:BASE_IMG_URL
        }
    },
    methods:{
        //跳转列表
        toList(){
            //显示tabBar
            this.$store.dispatch('setTabBar',{
                status:false,
                msg:this.name,
            })
            //隐藏tabBar
            this.$store.dispatch('setTopnav',{
                status:false
            })
            this.$router.push({
                name:'classifyList',
                query:{
                    gender:this.gender,
                    major:this.name,
                    sort:this.sort,
                    myTitle:this.name
                }
            })
        }
    }
}
</script>

<style>
@import '../../style/book/book.css';
</style>
