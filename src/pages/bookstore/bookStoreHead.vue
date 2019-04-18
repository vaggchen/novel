<template>
    <div class="head">
        <div class="left" @click="toSearch">
            <i class="iconfont icon-sousuo"></i>搜索
        </div>
        <div class="center">
            我的书架
        </div>
        <div class="right">
            <i class="iconfont iconfont-edit"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BookStoreHead',
    data(){
        return{}
    },
     methods:{
        toSearch(){
            //显示tabBar
            this.$store.dispatch('setTabBar',{
                status:false,
                msg:'搜索',
            })
            //隐藏tabBar
            this.$store.dispatch('setTopnav',{
                status:false
            })
            this.$router.push({
                name:'search',
                query:{
                    myTitle:'搜索'
                }
            })
        }
    }
}
</script>

<style>
@import '../../style/bookstore/bookstore.css';
</style>
