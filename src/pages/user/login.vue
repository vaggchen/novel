<template>
    <div class="user">
        <cube-input
            v-model="username"
            :clearable="clearable"
            :autofocus="autofocus"
            :placeholder="placeholder"
        >
        </cube-input>

        <cube-input
            v-model="password"
            :placeholder="placeholder"
            :type="type"
            :maxlength="maxlength"
            :autofocus="autofocus"
            :autocomplete="autocomplete"
            :eye="eye"
        ></cube-input>

        <cube-button @click="login">登录</cube-button>
    </div>
</template>

<script>
export default {
    name: 'User',
    data() {
        return {
            username:'',
            password:'',
            clearable:{
                visible: true,
                blurHidden: true
            },
            placeholder: '请输入内容',
            type: 'password',
            maxlength: 100,
            autofocus: true,
            autocomplete: true,
            eye: {
              open: false,
              reverse: false
            }
        }
    },
    created(){
        let obj = {
            wd:'斗破'
        }
      //   api.search(obj)
      //     .then((res)=>{
      //         console.log(res)
      //     })
    },
    methods: {
      login(){
          if(this.username=="" || this.password==""){
              return
          }
          let obj = {
              username:this.username,
              password:this.password
          }
          api.Login(obj)
          .then((res)=>{
              console.log(res)
          })
      }
    }
}
</script>

<style>
@import '../../style/user/user.css';
</style>
