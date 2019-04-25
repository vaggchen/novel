<template>
    <div class="bookstore">
        <BookStoreHead /><!-- 书架头部 -->
        <div class="content" :style="newStyle"><!-- 书架内容 -->
            <BookItem /><!-- 书架书籍/////需要接口 -->
        </div>
        
    </div>
</template>

<script>
import BookItem from '@/pages/bookstore/bookItem'
import BookStoreHead from '@/pages/bookstore/bookStoreHead'
export default {
    name: 'BookStore', 
    data() {
        return {
            newStyle:{}
        }
    },
    components: {
       BookItem,
       BookStoreHead
    },
    mounted(){
        this.initHeight()
    },
    methods: {
        initHeight(){
            let windowHeight = document.body.clientHeight;
            // console.dir(document.querySelector('.head'))
            let botH = document.querySelector('.head').clientHeight;
            // console.log(botH)
            let topH = document.querySelector('#tabBar').clientHeight;
            this.newStyle={
                height:windowHeight-botH-topH+'px'
            }
            // console.log(this.newStyle)
        }
    },
    watch:{
        '$route'(newsVal,oldval){
            // if(oldVal.name == 'chapterDetail' && newsVal.name == 'BookStore'){
            //     this.$store.dispatch('setTopShow',false)
            // }
        }
    }
}
</script>

<style>
@import '../../style/bookstore/bookstore.css';
</style>
