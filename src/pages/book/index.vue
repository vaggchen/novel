<template>
    <div class="book">

        <!--公用tabbar  -->
        <div class="com_tabBar">
            <TabBar/>
        </div>
    </div>
</template>

<script>
import TabBar from '@/components/TabBar'
export default {
    name: 'Book',
    components: {
        TabBar
    }
}
</script> 

<style>
@import '../../style/book/book.css';
</style>
