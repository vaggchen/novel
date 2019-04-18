<template>
    <div class="search_about">
        <div class="title">
            <div class="left">
                {{title}}
            </div>
            <div class="right" @click="changeIndex">
                换一批
                <i class="icon-shuaxin iconfont"></i>
            </div>
        </div>
        <div class="content">
            <dd v-for="item in showArr" :key="item.id" @click="clickWords(item.word)">
                {{ item.word }}
            </dd>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            myArr:[],
            showArr:[],
            index:0,
        }
    },
    props:{
       title:String,
       arr:Array,
       count:Number
    },
    created(){
        // console.log(this.arr)
       this.myArr = this.arr; 
       this.sliceArr();
    },
    methods:{
        sliceArr(){
            this.showArr = this.myArr.slice(this.index,this.index+this.count)
        },
        changeIndex(){
            if(this.index+this.count<this.myArr.length){
                this.index+=this.count;
            }else{
                this.index=0
            }
            this.sliceArr()
            
        },
        clickWords(word){
            this.$emit('clickWords',word)
        }
    },
    watch:{
        'arr'(newsVal,oldVal){
            // console.log(newsVal)
            this.myArr = newsVal;
            this.sliceArr();
        }
    }
}
</script>

<style>
</style>
