<template>
    <div class="bookstore">
        <BookStoreHead /><!-- 书架头部 -->
        <div class="content" :style="newStyle"><!-- 书架内容 -->
            <div class="myInfoItem myReading" @click="setReadingTime()" v-if="isLoginsuc">
                <span>阅读模式</span>
            </div>
            <div class="readingTime" id="readingTime" style="display:none;">
                    <div class="normal"><cube-button class="setTime" @click="clickNormal">普通模式</cube-button></div>
                    <div class="normal"><cube-button class="setTime" @click="showMinPicker"> 定时模式</cube-button></div>
            </div>
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
            newStyle:{},
            // isLogin: true
            isLoginsuc:false,
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
            // router.go(0)
            // this.window.reload()
            let islog = Utils.localLoadJsonStorage('globalLoginStatus')
            console.log(islog)
            this.isLoginsuc=islog
            let windowHeight = document.body.clientHeight;
            // console.dir(document.querySelector('.head'))
            let botH = document.querySelector('.head').clientHeight;
            // console.log(botH)
            let topH = document.querySelector('#tabBar').clientHeight;
            this.newStyle={
                height:windowHeight-botH-topH+'px'
            }
            // console.log(this.newStyle)
        },
        setReadingTime(){
            var menu = document.getElementById("readingTime");
            if(menu.style.display == "block"){
                menu.style.display = "none";
            }else{
                menu.style.display = 'block';  
            }
        },
        // 阅读计时
        clock(time){
            console.log(time)
            let now=new Date().getTime()
            let during=time-now;
            console.log(during)
            if(during==600){
                // console.log(now)
                this.$createDialog({
                type: 'warn',
                // title: `selected time: ${selectedTime}`,
                content: `您还能能够阅读10分钟哦`,
                icon: 'cubeic-alert'
                }).show()
            }else if(during==300){
                // // console.log(now)
                this.$createDialog({
                type: 'warn',
                // title: `selected time: ${selectedTime}`,
                content: `您还能够阅读5分钟哦`,
                icon: 'cubeic-alert'
                }).show()
                // console.log(now)
            }else if(during<=0){
                this.$createDialog({
                type: 'warn',
                // title: `selected time: ${selectedTime}`,
                content: `您的阅读时限已到，即将退出阅读`,
                icon: 'cubeic-alert'
                }).show()
                document.getElementsByTagName("BookItem")[0].style.display = "none"
                console.log(document.getElementsByTagName("BookItem"))
                this.back()
            }

        },
        // 退出阅读
        back(){
            document.getElementsByTagName("BookItem")[0].style.display = "none"
            console.log(document.getElementsByTagName("BookItem"))
            let islog = Utils.localLoadJsonStorage('globalLoginStatus')
            islog=false
            Utils.localSaveJsonStorage('globalLoginStatus', islog);
            // this.isLoginsuc=false;
            let arr = Utils.localLoadJsonStorage('users').map(item =>{
                if(item.isLogin==true){
                    item.isLogin=false
                }
                return item
             })
            console.log(arr)
            Utils.localSaveJsonStorage('users', arr);
            // 登出操作
            this.$store.dispatch('setTabBar',{
                status:true,
                // msg: '我的'
            })
            // 隐藏tabBar
            this.$store.dispatch('setTopnav',{
                status:true
            })
            this.$router.replace({
                name: 'User',
                params: {
                redirect: '/user'
                },
                query: {
                    myTitle: '我的',
                    username: username
                }
            })
        },
        // 时间选择器
        showMinPicker() {
            if (!this.minPicker) {
                this.minPicker = this.$createTimePicker({
                max: +new Date() + ((0 * 24 + 3) * 60 + 20) * 60 * 1000,
                // min: new Date(),
                onSelect: this.selectHandler,
                onCancel: this.cancelHandler
                })
            }
            this.minPicker.show()
            },
            selectHandler(selectedTime, selectedText, formatedTime) {
            formatedTime= formatedTime.split(' ')[1]
            // console.log(formatedTime)
            this.$createDialog({
                type: 'warn',
                // title: `selected time: ${selectedTime}`,
                content: `开始为您进行阅读计时了哦，您能够阅读到: ${formatedTime}`,
                icon: 'cubeic-alert'
            }).show()
            document.getElementById("readingTime").style.display = "none"
            // 开始计时
            setInterval(this.clock(selectedTime),1000)
            // this.clock(selectedTime)
            },
            cancelHandler() {
                document.getElementById("readingTime").style.display = "none"
                this.$createToast({
                    type: 'correct',
                    txt: '取消选择定时模式',
                    time: 1000
                }).show()
        },

        // 普通模式
        clickNormal(){
             this.$createDialog({
                type: 'warn',
                // title: `selected time: ${selectedTime}`,
                content: `普通模式`,
                icon: 'cubeic-alert'
                }).show()
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
