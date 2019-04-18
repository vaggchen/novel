import axios from 'axios'
import qs from 'qs'
import './base'
// axios 配置
axios.defaults.timeout = 60000;
// axios.defaults.withCredentials = true;//让ajax携带cookie
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = BASE_URL;

//POST传参序列化
axios.interceptors.request.use((config) => {
  if(config.method  === 'post'){
    config.data = qs.stringify(config.data);
  }
return config;
},(error) =>{
  _.toast("错误的传参", 'fail');
  return Promise.reject(error);
});

//返回状态判断
// code = 1 失败  0 成功
axios.interceptors.response.use((res) =>{
  if(res.data.code){
  _.toast(res.data.msg);
  return Promise.reject(res);
}
return res;
}, (error) => {
  _.toast("网络异常", 'fail');
  return Promise.reject(error);
});

//post方法
export function fetch(url, params) {
  params = params || {};

  var url = axios.defaults.baseURL + url;
  return new Promise((resolve, reject) => {
    // console.log(url)
    axios.post(url, params)
    .then( response => {
      // console.log(response)
      resolve(response.data);
    }, err => {
    // _.toast(err.data.msg, 'fail');
    console.log(err)
    })
    .catch((error) => {
        reject(error)
      })
  })
}

//get方法
export function getch(url, param) {
  param = param || {};

  var url = axios.defaults.baseURL + url;
  return new Promise((resolve, reject) => {
    // console.log(url)
    axios.get(url, {
      params:param
    })
    .then( response => {
      // console.log(response)
      resolve(response.data);
    }, err => {
    // _.toast(err.data.msg, 'fail');
    console.log(err)
    })
    .catch((error) => {
        reject(error)
      })
  })
}

export default {
  
  /**
   * 登录
   * */
  Login(params) {
    let url = '/login'
    return fetch(url,params)
  },
  search(params) {
    let url = '/search'
    return getch(url,params)
  },
  //搜索热词
  searchHotwords(params) {
    let url = '/search-hotwords'
    return getch(url,params)
  },
  //热门书籍
  hotHooks(params) {
    let url = '/hot-books'
    return getch(url,params)
  },
  //分类页面
  //总分类
  statistics(params) {
    let url = '/categories'
    return getch(url,params)
  },
  //获取子分类
  childstatistics(params) {
    let url = '/sub-categories'
    return getch(url,params)
  },
  //获取分类信息
  categoryInfo(params) {
    let url = '/category-info'
    return getch(url,params)
  },
  
  // 首页及其延伸接口
  // 1.热门分类
  getHotClassify(params){
    let url = '/rank-category'
    return getch(url,params)
  },
  //2.热门书单
  getHotBookLists(params){
    let url = '/booklists'
    return getch(url,params)
  },
  //3.书单详情(传递书单id)
  getBookListInfo(params,id){
    let url = '/booklists/'+id
    return getch(url, params)
  },
  //4.书籍详情(传递书籍id)
  getBookInfo(params,id){
    let url = '/book-info/'+id
    return getch(url, params)
  },
  //5.书籍换源(传递书籍id)
  getBookComeDiff(params,id){
    let url = '/book-sources?view=summary&book='+id
    return getch(url, params)
  },
  //6.书籍章节列表(传递书籍id)
  getBookChaptersList(params,id){
    let url = '/book-chapters/'+id
    return getch(url, params)
  },
  //7.书籍作者作品(传递书籍id)
  getBooksOfAuthor(params,author){
    let url = '/author-books'+'?author='+author
    return getch(url, params)
  },
  //8.书籍相关推荐(传递书籍id)
  getBookLike(params,id){
    let url = '/recommend/'+id
    return getch(url, params)
  },
  //9.书籍章节详细内容(传递link)
  getBookChaptersDetail(params,link){
    let url = '/chapters/'+link
    return getch(url, params)
  },
  //10.书籍相关推荐(传递书籍id)
  getHotClassifyLists(params,id){
    let url = '/rank/'+id
    return getch(url, params)
  },

}
