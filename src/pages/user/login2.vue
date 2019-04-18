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
  name: 'login2',
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
      console.log(username,password)
      console.log(arr)
      if(username!=null&&password!=null){
        
        //  console.log(arr)
        /*let loginStatus = arr.map((item)=>{
          if(username!==item.username){
            setTimeout(() => {
              this.toast4 = this.$createToast({
                  txt: '该用户不存在',
                  type:'warn',
                  mask: true,
                  time:1000
              })
              this.toast4.show()
            },100)
          }else if(username===item.username&&password===item.password){
            setTimeout(() => {
              this.toast5 = this.$createToast({
                  txt: '登录成功',
                  type:'warn',
                  mask: true,
                  time:1000
              })
              this.toast5.show()
            },100)
            return true
          }else{
            setTimeout(() => {
              this.toast6 = this.$createToast({
                  txt: '用户名或密码错误',
                  type:'warn',
                  mask: true,
                  time:1000
              })
              this.toast6.show()
            },100)
          }
        })
        console.log(loginStatus)*/
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
