<template>
    <div class="slider">
        <cube-slide ref="slide" :data="items" @change="changePage" :initial-index="0" :loop="true" :auto-play="true" :interval="3000" :speed="200">
            <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
                <a :href="item.url">
                <img :src="item.cover" :alt="item.title">
                </a>
            </cube-slide-item>
        </cube-slide>
    </div>
</template>

<script>
export default {
    name: 'Slider',
    data() {
        return{
            // 轮播图片
        items: [
            {
                url: 'http:localhost:8080/',
                title: '宠婚：隐婚总裁太狼性',
                cover: 'http://statics.zhuishushenqi.com/recommendPage/155263199993988'
            },
            {
                url: 'http:localhost:8080/',
                title: '至尊毒妃：邪王的盛宠娇妃',
                cover: 'http://statics.zhuishushenqi.com/recommendPage/155263204764743'
            },
            {
                url: 'http:localhost:8080/',
                title: '大明星的贴身保镖',
                cover: 'http://statics.zhuishushenqi.com/recommendPage/155263231689821'
            },
            {
                url: 'http:localhost:8080/',
                title: '第一战神',
                cover: 'http://statics.zhuishushenqi.com/recommendPage/15526323646672'
            },
            {
                url: 'http:localhost:8080/',
                title: '宠婚：隐婚总裁太狼性',
                cover: 'http://statics.zhuishushenqi.com/recommendPage/155263199993988'
            },
        ],
        }
        
    },
    created() {
    },
    methods: {
    changePage(current) {
    //   console.log('当前轮播图序号为:' + current)
    },
    clickHandler(item, index) {
    //   console.log(item, index)
    }
}
}

</script>

<style>
@import '../../style/index/index.css';
</style>
