/***
 * 封装组件类
 *
 * */


export default {
    /***
     * 本地存储
     *
     * */
    // 本地存储 key,val
    localSaveJsonStorage: function (key, val) {
        var data = {
        val: val,
        }
        var str = JSON.stringify(data);
        localStorage.setItem(key, str);
    },
    // 提取本地存储数据
    localLoadJsonStorage: function (key) {
        var str = localStorage.getItem(key)
        var data = JSON.parse(str) || {}
        //console.log(str)
        return data.val;
    },
    
    /*从导航栏获取数据1*/
    getURLParameter (name) {
        if (location.href.indexOf('?' + name +'=') >= 0 || location.href.indexOf('&' + name+'=') >= 0){
          return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [''])[1].replace(/\+/g, '%20')) || null;
        }else
          return null
      },
    /*从导航栏获取数据2*/
    getUrlParam(name) {  
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
      var r = window.location.search.substr(1).match(reg);  //匹配目标参数  
      if (r != null) {
          return unescape(r[2]);  //返回参数值 
      } else {
          return null; 
      }
    },
  
  // 计算字符串长度
  strlen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1 
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        }
        else {
            len += 2;
        }
    }
    return len;
  },
  // 阻止冒泡
  stopBubble(e) { 
    //如果提供了事件对象，则这是一个非IE浏览器 
      if ( e && e.stopPropagation ) 
          //因此它支持W3C的stopPropagation()方法 
          e.stopPropagation(); 
      else 
          //否则，我们需要使用IE的方式来取消事件冒泡 
          window.event.cancelBubble = true; 
  },
}