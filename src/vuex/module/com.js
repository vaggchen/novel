import * as types from '../type'

/**
 * App通用配置
 */
const state = {
    tabBarShow:true,//tabBar是否显示
    topBarShowMsg:'',//topBar是否显示
    isGohome:true,//是否回首页
    topNavShow:true,//是否显示topnav
}

const actions = {
    setTabBar({ commit }, obj) {
        commit(types.COM_SHOW_TabBar, obj)
    },
    setTopnav({ commit }, status) {
        commit(types.COM_SHOW_Topnav, status)
    },
    setTopShow({ commit }, status) {
        commit(types.COM_topNavShow, status)
    },
}

const getters = {
    tabBarShow: state => state.tabBarShow,
    topBarShowMsg: state => state.topBarShowMsg,
    isGohome: state => state.isGohome,
    topNavShow: state => state.topNavShow,
}


const mutations = {
    [types.COM_SHOW_TabBar](state,obj){
        state.tabBarShow = obj.status;
        state.topBarShowMsg = obj.msg;
    },
    [types.COM_SHOW_Topnav](state,status){
        state.isGohome = status;
    },
    [types.COM_topNavShow](state,status){
        state.topNavShow = status;
    },
}


export default {
    state,
    actions,
    getters,
    mutations
}
