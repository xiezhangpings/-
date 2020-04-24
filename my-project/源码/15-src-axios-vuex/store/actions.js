import axios from 'axios'
import { REQUEST, REQ_SUCCESS, REQ_ERROR } from './mutation-types'
export default{
  async search({commit},searchName){
    const url =`https://api.github.com/search/users`
    //第一次更改状态数据
    commit(REQUEST)
    try {
      const response = await axios.get(url,{
        params:{
          q:searchName
        }
      })
      const users = response.data.items.map(user => ({
        login: user.login,
        html_url: user.html_url,
        avatar_url: user.avatar_url
      }))
       // 第二次更新状态数据
       commit(REQ_SUCCESS, users)
    }catch (error){
      // 第三次更改状态数据
      commit(REQ_ERROR, error)
    }
  }
}
