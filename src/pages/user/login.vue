<template>
  <div class="login">
    <!-- <login-header></login-header> -->
    <div class="login-title">
      <h3>账号密码登录</h3>
    </div>
    <div class="login-input">
      <label class="login-input-username">
        <span>账号：</span>
        <input class="username" id="username" type="text" v-model="username" placeholder="请输入手机号/邮箱/昵称">
      </label>
      <label class="login-input-password">
        <span>密码：</span>
        <input class="password" id="password" type="text" v-model="password" placeholder="请输入密码">
      </label>
      <label class="login-input-btn">
        <input class="loginBtn" type="submit" @click="login" value="登录">
      </label>
    </div>
    <div class="login-prompt">
      <span>忘记密码？</span>
      <span @click.stop="toRegister">立即注册</span>
    </div>
    <!-- <div class="login-ways">
      <span class="icon qq">&#xe73e;</span>
      <span class="icon zhifubao">&#xe63b;</span>
      <span class="icon weixin">&#xe73b;</span>
      <span class="icon weibo">&#xe73c;</span>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'login',
  components: {
    // LoginHeader
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
  },
  watch: {
    user (value) {
      // console.log(value)
      if (value.isLogin === true) {
        const { redirect = '/' } = this.$route.params
        this.$router.push(redirect)
      }
    }
  },
  methods: {
    login(){
      let username = document.getElementById('username').value;
      let password = document.getElementById('password').value;
      let arr = Utils.localLoadJsonStorage('users')
      console.log(arr)
      let loginsuccess = arr.some(item =>{
        if(username != item.username||password != item.password){
          return false
        }else if(username == item.username && password == item.password){
          item.isLogin=true
          return true
        }
      })
      console.log(arr)
      Utils.localSaveJsonStorage('users', arr);
      if(loginsuccess){
        this.$store.dispatch('setTabBar',{
            status:true,
            // msg: '我的'
        })
        //隐藏tabBar
        this.$store.dispatch('setTopnav',{
            status:true
        })
        this.$router.push({
            name: 'User',
            params: {
            redirect: '/user'
            },
            query: {
                myTitle: '我的',
                username: username
            }
        })
      }else{
        this.toast1 = this.$createToast({
              txt: '用户名或密码输入错误',
              mask: true,
              type:'warn',
              time:3000
          })
          this.toast1.show()
      }
      // 用户名密码不为空
      if(username==null||password==null||username==''||password==''){
         this.toast = this.$createToast({
              txt: '用户名和密码不能为空',
              mask: true,
              type:'warn',
              time:3000
          })
          this.toast.show()
        // this.isLogin=true
      }
    },
    toRegister () {
      this.$store.dispatch('setTabBar',{
          status:false,
          msg: '注册'
      })
      //隐藏tabBar
      this.$store.dispatch('setTopnav',{
          status:false
      })
      this.$router.push({
          name: 'register',
          params: {
          redirect: '/register'
          },
          query: {
              myTitle: '注册'
          }
      })
    },
  }
}
</script>

<style lang='scss'>
@import '../../style/user/login.css';
</style>
