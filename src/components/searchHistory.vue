<template>
    <div class="search_about">
        <div class="title">
            <div class="left">
                历史搜索
            </div>
            <div class="right" @click="clear">
                删除历史
                <i class="icon-remove iconfont"></i>
            </div>
        </div>
        <div class="content">
            <dd v-for="item in showArr" :key="item.id" @click="clickWords(item)">
                {{ item }}
            </dd>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showArr:[],
            index:0,
        }
    },
    props:{
       title:String,
       val:String
    },
    created(){ 
       this.initArr();
    },
    methods:{
        initArr(){
            let localval = Utils.localLoadJsonStorage('searchHistory');
            if(localval!=undefined){
                this.showArr = localval;
            }
        },
        saveArr(){
            let arr = [];
            let localval = Utils.localLoadJsonStorage('searchHistory');
            if(localval==undefined){
                arr.push(this.val)
                this.showArr = arr;
                Utils.localSaveJsonStorage('searchHistory',arr)
            }else{
                localval.forEach((element,index) => {
                    if(element == this.val){
                        localval.splice(index,1)
                    }
                });
                if(this.val!=""){
                    localval.unshift(this.val)
                    this.showArr = localval;
                    Utils.localSaveJsonStorage('searchHistory',localval)
                }
                    
            }
            
        },
        clear(){
            let localval = Utils.localLoadJsonStorage('searchHistory');
            if(localval==undefined){
                // arr.push(this.val)
                // this.showArr = arr;
                // Utils.localSaveJsonStorage('searchHistory',arr)
            }else{
                this.showArr = [];
                localStorage.removeItem('searchHistory')
                
            }
        },
        clickWords(word){
            this.$emit('clickWords',word)
        }
        
    },
    watch:{
        'val'(newsVal,oldVal){
            this.saveArr();
        }
    }
}
</script>

<style>
</style>
