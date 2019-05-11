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
                <dl v-if="isLoginsuc">
                    <dt>
                        <img :src="unloginimg" alt="">
                    </dt>
                    <dd>
                        <div class="name"><span>{{username}}</span></div>
                        <!-- <div class="age"><span>16岁</span></div> -->
                    </dd>
                </dl>
                <dl v-else>
                    <dt>
                        <i class="iconfont icon-weidenglu"></i>
                    </dt>
                    <dd>
                        <div @click="toLogin" class="unlog"><span>登录/注册</span></div>
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
                <!-- <div class="myInfoItem myReading" @click="setReadingTime()">
                    <span>阅读计时</span>
                    <i class="iconfont icon-right"></i>
                </div>
                <div class="readingTime" id="readingTime" style="display:none;">
                    <select name="" id="">
                        <option value="">请选择</option>
                        <option value="30">30分钟</option>
                        <option value="60">60分钟</option>
                        <option value="90">90分钟</option>
                        <option value="120">120分钟</option>
                    </select>
                    <input type="text" value="" placeholder="手动输入时限">
                    <button @click="setTime()">设置</button>
                </div> -->
                <div class="myInfoItem myStorage">
                    <span>我的历史</span>
                    <i class="iconfont icon-right"></i>
                </div>
                <div class="myInfoItem setting" @click="modelchange()">
                    <span>设置</span>
                    <i class="iconfont icon-right"></i>
                </div>
                <div class="mysetting" id="mysetting" style="display:none;">
                    <cube-radio-group v-model="selected" :options="options" />
                    <button @click="setModel()">设置</button>
                </div>
            </div>
 
            <div class="logout" v-show="isLoginsuc">
                <div class="out" @click="logout">退出登录</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'user',
    data() {
        return {
        // isLogin : true,
        isLoginsuc : false,
        unloginimg: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=868917665,2584152645&fm=26&gp=0.jpg',
        username: '',
        selected: '',
        options: ['普通模式', '计时模式']
        }
    },
    created() {
        this.init()
       
    },
    methods: { 
        init(){
            let arr = Utils.localLoadJsonStorage('users')
            console.log(arr)
            // let loguser = arr.some(item =>{
            //     if(item.isLogin==true){
            //     // item.isLogin=true
            //     return item
            //     }
            // })
            // console.log(loguser)
            console.log(this.$route.query)
            console.log(this.isLoginsuc)
            this.username = this.$route.query.username||arr[0].username;
            if(this.username==''||this.username==undefined||arr[0].isLogin==false){
                this.isLoginsuc=false
            }else{
                this.isLoginsuc=true
                let userisAlive = Utils.localLoadJsonStorage('globalLoginStatus') || false;
                userisAlive = true
                Utils.localSaveJsonStorage('globalLoginStatus', userisAlive);
            }
            console.log(this.isLoginsuc)
        },
        modelchange(){
            var hide = this.isLoginsuc;
            var menu = document.getElementById("mysetting");
            if(hide){
                if(menu.style.display == "block"){
                    menu.style.display = "none";
                }else{
                    menu.style.display = 'block';  
                }
            }else{
                setTimeout(() => {
                this.toast = this.$createToast({
                    txt: '请先登录哦',
                    type:'warn',
                    mask: true,
                    time:1000
                })
                this.toast.show()
                },100)
            }
        },
        // 设置其他阅读时间
        // toOtherTime(){

        // },
        // 退出登录
        logout(){
            this.isLoginsuc=false;
            let arr = Utils.localLoadJsonStorage('users').map(item =>{
                if(item.isLogin==true){
                    item.isLogin=false
                }
                return item
             })
            console.log(arr)
            Utils.localSaveJsonStorage('users', arr);
        },
        toLogin () {
            this.$store.dispatch('setTabBar',{
                status:false,
                msg: '登录'
            })
            //隐藏tabBar
            this.$store.dispatch('setTopnav',{
                status:false
            })
            this.$router.push({
                name: 'login',
                params: {
                redirect: '/login'
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