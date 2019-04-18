<template>
    <div class="index_search">
        <input class="left" type="search" name="search" id="search" placeholder="请输入你要查询的内容">
        <div class="left" @click="toSearch">
            <i class="iconfont icon-sousuo"></i>
        </div>
    </div>
</template>

<script>
export default {
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
</style>
