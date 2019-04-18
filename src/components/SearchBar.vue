<template>
    <div class="com_searchBar">
        <input class="left" v-model='myinputVal' type="search"  @keyup.enter="Search" name="search" id="search" placeholder="请输入你要查询的内容">
        <div class="left" @click="Search">
            <i class="iconfont icon-sousuo"></i>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            myinputVal:''
        }
    },
    props:{
       inputVal:String 
    },
    methods:{
        //搜索
        Search(){
            if(this.myinputVal==""){
                return
            }
            document.querySelector('#search').blur()
            let obj = {
                keyword:this.myinputVal
            }
            this.$emit('search',obj)
        },
    },
    watch:{
        'inputVal'(newsVal,oldVal){
            this.myinputVal = newsVal
        },
        'myinputVal'(newsVal,oldVal){
            this.$emit('getVal',newsVal)
        }
    }
}
</script>

<style>
</style>
