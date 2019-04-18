import store from '@/vuex/store'

/**
 *   Toast公共方法
 */
export function toast(str) {

  // store.dispatch('showToast', true)
  // store.dispatch('toastMsg',str);
  // setTimeout(() => {
  //     store.dispatch('showToast', false);
  // },1000);
}

/**
 * Msg公共方法
 */

export function msg(str,icon) {
  // store.dispatch('showMsg', true)
  // if (icon == 'success') {//正确
  //   store.dispatch('showSuccess', true)
  //   store.dispatch('showFail', false)
  // } else if(icon == 'fail') {//错误
  //   store.dispatch('showSuccess', false)
  //   store.dispatch('showFail', true)
  // }
  // store.dispatch('toastMsg',str);
  // setTimeout(() => {
  //   store.dispatch('showMsg', false);
  // },1000);
}
