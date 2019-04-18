<template>
    <div class="topnav" v-show="topNavShow">
        <div class="com_topNav" id="topNav">
            <div class="left" @click="goBack">
                <i class="iconfont icon-fanhui"></i>
            </div>
            <div class="right" @click="showHide()">
                <i class="iconfont icon-liebiao"></i>
            </div>
            <div class="mid">{{msg}}</div>
        </div>
         <div class="rightlist" id="rightlist">
            <div class="tohome li" @click.stop="toHome"><i class="iconfont icon-shouye"></i><span>回到首页</span></div>
            <div class="shuxian"></div>
            <div class="toBookStore li" @click.stop="toBookStore"><i class="iconfont icon-books"></i><span>查看书架</span></div>
            <!-- <div class="logout" @click.stop="logout"><i class="iconfont icon-tuichu"></i><span>退出登录</span></div> -->
        </div>
    </div>
   
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'TopNav',
    props:{
        msg:String
    },
    computed:{
        ...mapGetters([
            'isGohome',
            'topNavShow'
        ])
    },
    methods:{
        // 返回上一页
        goBack(){
            //显示tabBar
            let flag = this.isGohome
            this.$store.dispatch('setTabBar',{
                status:flag,
            })
            this.$router.go(-1)
        },
        // 控制列表显隐
        showHide(){
            var menu = document.getElementById("rightlist");
            if(menu.style.display == "block"){
                menu.style.display = "none";
            }else{
                menu.style.display = 'block';  
            }
        },
        // 回到首页
        toHome(){
            this.$router.push({
                name: 'Index',
                params: {
                    redirect: '/'
                }
            })
            // this.$router.push({
            //     path: '/',
            // })
        },
        // 查看书架
        toBookStore(){
            this.$router.push({
                name: 'BookStore',
                params: {
                    redirect: '/bookstore'
                }
            })
        },
        // 退出登录
        logout(){
            // 登出操作
            this.$router.push({
                name: 'Login',
                params: {
                    redirect: '/login'
                }
            })
        }
    },
    watch: {
        '$route'(newsVal,oldVal){
           
            document.getElementById("rightlist").style.display = "none";
            if(newsVal.query.myTitle){
                //tabBar
                this.$store.dispatch('setTabBar',{
                    status:false,
                    msg:newsVal.query.myTitle
                })
                
            }else{
                this.$store.dispatch('setTabBar',{
                    status:true,
                    msg:''
                })
            }
            if(newsVal.name=='chapterDetail'){
                console.log('111')
                this.$store.dispatch('setTopShow',false)
            }
            
        }
    },
}
</script>

<style>

</style>
