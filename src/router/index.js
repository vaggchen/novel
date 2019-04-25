import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      // redirect: '/',
      meta:{
        keepAlive:true
      },
      component: resolve => require(['@/pages/index'], resolve)
    },
    {
      path: '/classify',
      name: 'Classify',
      meta:{
        keepAlive:true
      },
      component: resolve => require(['@/pages/classify'], resolve)
    },
    {
      path: '/bookstore', 
      name: 'BookStore',
      meta:{
        keepAlive:true
      },
      component: resolve => require(['@/pages/bookstore'], resolve)
    },
    {
      path: '/user',
      name: 'User',
      meta:{
        keepAlive:true
      },
      component: resolve => require(['@/pages/user'], resolve)
    },
    {
      path: '/bookListItem',     
      name: 'bookListItem',
      meta:{
        keepAlive:true
      },
      component: resolve => require(['@/pages/index/bookListItem'], resolve),
    }, 
    {
      path: '/classifyList',
      name: 'classifyList',
      meta:{
        keepAlive:true
      },
      component: resolve => require(['@/pages/classify/classifyList'], resolve)
    },
    {
      path: '/bookDcn                                                                                                                                                                                                                                                                            etail',
      name: 'bookDetail',
      meta:{
        keepAlive:true
      },
      component: resolve => require(['@/pages/book/bookDetail'], resolve)
    },
    {
      path: '/bookMenu',
      name: 'bookMenu',
      meta:{
        keepAlive:true
      },
      component: resolve => require(['@/pages/book/bookMenu'], resolve)
    },
    {
      path: '/search',
      name: 'search',
      meta:{
        keepAlive:true
      },
      component: resolve => require(['@/pages/book/search'], resolve)
    },
    {
      path: '/chapterDetail',
      name: 'chapterDetail',
      // meta:{
      //   keepAlive:true
      // },
      component: resolve => require(['@/pages/book/chapterDetail'], resolve)
    },
    {
      path: '/lists',
      name: 'lists',
      component: resolve => require(['@/pages/book/lists'], resolve)
    },
    {
      path: '/register',
      name: 'register',
      meta:{
        keepAlive:true
      },
      component: resolve => require(['@/pages/user/register'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      meta:{
        keepAlive:true
      },
      component: resolve => require(['@/pages/user/login'], resolve)
    },
  ]
})
