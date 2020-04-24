// 引入mutation-types
import { REQUEST, REQ_SUCCESS, REQ_ERROR } from './mutation-types'
export default {
  [REQUEST] (state) {
    state.firstView = false
    state.loading = true
  },
  // 请求成功的时候
  [REQ_SUCCESS] (state, users) {
    state.loading = false
    state.users = users
  },
  // 请求失败的时候
  [REQ_ERROR] (state, error) {
    state.loading = false
    state.errorMsg = error
  }
}
