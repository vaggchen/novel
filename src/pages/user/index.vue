
<template>
    <div class="user">
        <!-- <cube-button @click="toLogin">登录</cube-button> -->
        <!-- <cube-button @click="toRegister">注册</cube-button>
        <cube-button @click="toLogin2">登录</cube-button> -->
        
        <div class="head">
            <div class="left">
                <i class="iconfont"></i>
            </div>
            <div class="center">
                我的
            </div>
            <div class="right">
                <i class="iconfont iconfont-edit"></i>
            </div>
        </div>
        <div class="content">
            <div class="userInfo">
                <dl v-if="isLogin">
                    <dt>
                        <img :src="unloginimg" alt="">
                    </dt>
                    <dd>
                        <div class="name"><span>用户名</span></div>
                        <div class="age"><span>16岁</span></div>
                    </dd>
                </dl>
                <dl v-else>
                    <dt>
                        <i class="iconfont icon-weidenglu"></i>
                    </dt>
                    <dd>
                        <div @click="toLogin2" class="unlog"><span>登录/注册</span></div>
                        <!-- <div>年龄：</div> -->
                    </dd>
                </dl>
            </div>

            <div class="accountSafe">
                 <span>账号与安全</span>
                 <i class="iconfont icon-right"></i>
            </div>

            <div class="myInfo">
                <div class="myInfoItem myBookStore">
                    <span>个人书架</span>
                    <i class="iconfont icon-right"></i>
                </div>
                <div class="myInfoItem myReading">
                    <span>阅读计时</span>
                    <i class="iconfont icon-right"></i>
                </div>
                <div class="myInfoItem myStorage">
                    <span>我的历史</span>
                    <i class="iconfont icon-right"></i>
                </div>
                <div class="myInfoItem setting">
                    <span>设置</span>
                    <i class="iconfont icon-right"></i>
                </div>
            </div>

            <div class="logout" v-show="isLogin">
                <div class="out">退出登录</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'User',
    data() {
        return {
        isLogin : false,
        unloginimg: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=868917665,2584152645&fm=26&gp=0.jpg'
        }
    },
    methods: {
        toLogin2 () {
            this.$store.dispatch('setTabBar',{
                status:false,
                msg: '登录'
            })
            //隐藏tabBar
            this.$store.dispatch('setTopnav',{
                status:false
            })
            this.$router.push({
                name: 'login2',
                params: {
                redirect: '/login2'
                },
                query: {
                    myTitle: '登录'
                }
            })
        }
    }
}
</script>

<style>
@import '../../style/user/user.css';
</style>