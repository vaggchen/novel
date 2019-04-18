<template>
    <div class="onebook" @click="toList()">
        <div class="left">
            <img :src="imgUrl+bookCover" alt="">
        </div>
        <div class="mid">
            <p>名称：{{name}}</p>
            <p>作者：{{author}}</p>
            <p>简介：{{des}}</p>
        </div>

    </div>
</template>

<script>
export default {
    props:{
        name:String,        
        bookCover:String,
        author:String,
        des:String
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
            // this.$store.dispatch('setTabBar',{
            //     status:false,
            //     msg:this.name,
            // })
            // this.$router.push({
            //     name:'classifyList',
            //     query:{
            //         gender:this.gender,
            //         major:this.name,
            //         sort:this.sort
            //     }
            // })
        }
    }
}
</script>

<style>

</style>
