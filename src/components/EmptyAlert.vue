<template>
    <div class="emptyalert">
        <div class="kongicon">
            <i class="iconfont icon-kongde"></i>
        </div>
        <div class="alert">{{msg}}</div>
        
    </div>
</template>

<script>
export default {
    name: 'EmptyAlert',
    props:{
        msg:String
    },
}
</script>

<style>

</style>
