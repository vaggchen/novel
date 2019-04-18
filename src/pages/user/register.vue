<template>
  <div class="register">
    <!-- <login-header></login-header> -->
    <div class="register-title">
      <h3>注册新用户</h3>
    </div>
    <div class="register-input">
      <label class="register-input-username" @change="compareUserName"><span>账号：</span><input class="username" id="username" type="text" placeholder="请输入手机号/邮箱/昵称"></label>
      <label class="register-input-password"><span>密码：</span><input class="password" id="password" type="text" placeholder="请输入密码"></label>
      <label class="register-input-password" @change="comparePassword"><span>确认：</span><input class="password" id="compassword" type="text" placeholder="请再次输入密码"></label>
      <label class="register-input-check"><label class="label"><input type="checkbox"><i>✓</i></label><span>同意</span>《XXXXXX》<span>和</span>《XXXXXX》</label>
      <label @click.stop="toLogin" class="register-input-btn"><input class="registerBtn" type="submit" value="完成注册"></label>
    </div>
  </div>
</template>

<script>
// import LoginHeader from '@/components/LoginOrRegisterComponents/LoginHeader'
export default {
  name: 'register',
  components: {
    // LoginHeader
  },
  methods: {
    // 触发是否已存在该用户
    compareUserName(){
      let username = document.getElementById('username').value;
      let arr = Utils.localLoadJsonStorage('users') || [];
      let isAlive= arr.map((item)=>{
        if(username == item.username){
          setTimeout(() => {
              this.toast4 = this.$createToast({
                  txt: '已存在该用户，请重新键入',
                  type:'warn',
                  mask: true,
                  time:1000
              })
              this.toast4.show()
          },100)
          return true
        }else if(username == null || username == undefined){
          setTimeout(() => {
              this.toast5 = this.$createToast({
                  txt: '用户名不能为空',
                  type:'warn',
                  mask: true,
                  time:1000
              })
              this.toast5.show()
          },100)
        }
      })
    },
    comparePassword(){
      let password = document.getElementById('password').value;
      let compassword = document.getElementById('compassword').value;
      if(password!==compassword){
        setTimeout(() => {
            this.toast6 = this.$createToast({
                txt: '两次键入密码不一致，请重新键入',
                type:'warn',
                mask: true,
                time:1000
            })
            this.toast6.show()
        },100)
      }
    },
    toLogin () {
      let username = document.getElementById('username').value;
      let password = document.getElementById('password').value;
      let compassword = document.getElementById('compassword').value;
      let id = new Date().getTime()
      console.log(id)
        if(username!=null&&password!=null&&compassword!=null&&password==compassword){
          let arr = Utils.localLoadJsonStorage('users') || [];
            let flag = false;
            if(arr.length>0){
                flag = arr.some((it) => {
                    return it.username == username
                })
            }
            if(flag){
                this.flag = true;
            }else{
                this.flag = false;
                setTimeout(() => {
                    this.toast3 = this.$createToast({
                        txt: '注册成功',
                        type:'correct',
                        mask: true,
                        time:1000
                    })
                    this.toast3.show()
                },500)
                arr.push({
                  username: username,
                  password: password,
                  id: id
                })
                console.log(arr)
                Utils.localSaveJsonStorage('users', arr);
        }
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
            }
        })
      }
    }
  }
}
</script>

<style lang='scss'>
// @url:"@/assets/imgs/check.jpg";
@import '../../style/user/register.css';
</style>
