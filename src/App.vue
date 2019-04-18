<template>
  <div id="app" >
    <TopNav :msg='topBarShowMsg' v-show="!tabBarShow"/>

    
      <keep-alive>
        <transition :name="transitionName">
          <router-view v-if="$route.meta.keepAlive" :class='tabBarShow?"app_botPad":"app_topPad"'  :style='newStyle'/>
        </transition>
      </keep-alive>
      <transition :name="transitionName">
        <router-view v-if="!$route.meta.keepAlive" :class='tabBarShow?"app_botPad":"app_topPad"'  :style='newStyle'/>
      </transition>
    
    <div class="com_tabBar" v-show="tabBarShow">
      <TabBar/>
    </div>

  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
import TopNav from '@/components/TopNav'
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  data(){
    return {
      newStyle:{},
      transitionName:''
    }
  },
  computed:{
    //tabBarShow
    ...mapGetters([
      'tabBarShow',
      'topBarShowMsg'
    ])
  },
  components: {
        TabBar,
        TopNav
    },
    mounted(){
      this.initHeight()
      this.init()
    },
    methods: {
      initHeight(){
        let windowHeight = document.body.clientHeight;
        // alert(windowHeight)
        let botH = document.querySelector('#tabBar').clientHeight;
        let topH = document.querySelector('#topNav').clientHeight;
        let height = this.tabBarShow?botH:topH;
        console.log(height)
        this.newStyle={
          height:windowHeight-height+'px'
        }
      },
      init(){
        mui.init({
          keyEventBind: {
            backbutton: true //关闭back按键监听
          }
        });
        // //首页返回键处理
        // //处理逻辑：1秒内，连续两次按返回键，则退出应用；
        var first = null;
        mui.back = function() {
          //首次按键，提示 再按一次退出应用
          if (!first) {
            first = new Date().getTime(); //记录第一次按下回退键的时间
            mui.toast("再按一次退出应用"); //给出提示
            history.go(-1); //回退到上一页面
            setTimeout(function() {
              //1s中后清除
              first = null;
            }, 1000);
          } else {
            if (new Date().getTime() - first < 700) {
              //如果两次按下的时间小于1s，
              plus.runtime.quit(); //那么就退出app
            }
          }
        };
      }
    },
    watch:{
      '$route'(newsVal,oldVal){
        // console.log(newsVal)
        //如果to索引大于from索引,判断为前进状态,反之则为后退状态      
        if(newsVal.name > oldVal.name){        
          //设置动画名称        
          this.transitionName = 'slide-left';      
          }else{        
            this.transitionName = 'slide-right';     
          }
        // console.log(this.transitionName)
      }
    }
}
</script>

<style>
@import './style/common/base.css';
@import './style/common/common.css';
@import './style/common/iconfont/iconfont.css';



</style>
