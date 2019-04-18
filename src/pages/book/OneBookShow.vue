<template>
    <div class="onebookShow" @click="toList()">
        <div class="left">
            <img :src="imgUrl+bookCover" alt="">
        </div>
        <div class="mid">
            <p>{{name}}</p>
            <p>{{author}} <span>|</span> {{majorCate}}</p>
            <p>{{des}}</p>
            <p>
                <a>{{latelyFollower}}</a>
                人气 
                <span>|</span> 
                <a>{{retentionRatio +'%'}}</a>
                读者留存
            </p>
        </div>

    </div>
</template>

<script>
export default {
    props:{
        id:String,
        name:String,
        majorCate:String,
        bookCover:String,
        author:String,
        des:String,
        latelyFollower:Number,
        retentionRatio:Number
    },
    data() {
        return {
            imgUrl:BASE_IMG_URL
        }
    },
    methods:{
        //跳转列表
        toList(){
            // //显示tabBar
            this.$store.dispatch('setTabBar',{
                status:false,
                msg:this.name,
            })
            //隐藏tabBar
            this.$store.dispatch('setTopnav',{
                status:false
            })
            this.$router.push({
                name:'bookDetail',
                query:{
                    id: this.id,
                    author: this.author,
                    myTitle:this.name
                }
            })
        }
    }
}
</script>

<style>
@import '../../style/book/book.css'
</style>
