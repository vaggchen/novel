<template>
  <cube-tab-bar
    id="tabBar"
    v-model="selectedLabel"
    :data="tabs"
    @click="clickHandler"
    @change="changeHandler">
  </cube-tab-bar>
</template>

<script>
export default {
    name: 'TabBar',
    data () {
    return {
      selectedLabel: 0,
      tabs: [{
        label: '首页',
        icon: 'cubeic-home',
        value:0
      }, {
        label: '分类', 
        icon: 'cubeic-like',
        value:1
      }, {
        label: '书架',
        icon: 'cubeic-vip',
        value:2
      }, {
        label: '我的',
        icon: 'cubeic-person',
        value:3
      }]
    }
  },
  methods: {
    clickHandler (label) {
      // if you clicked home tab, then print 'Home'
      //console.log(label)
     
    },
    changeHandler (label) {
      let arr = ['/','/classify','/bookstore','/user'];
      // console.log(this.$router)
      this.$router.push({
        path:arr[label]
      })
      // // if you clicked different tab, this methods can be emitted
      // console.log(label)
    }
  },
  watch:{
    '$route'(newsVal,oldVal){
      let arr = ['/','/classify','/bookstore','/user'];
      arr.forEach((item,index)=>{
        if(newsVal.path == item){
          this.selectedLabel =index
        }
      })
    }
  }
}
</script>

<style>

</style>
