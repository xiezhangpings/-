// 引入组件
import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
export default [
  {
    path: '/about',
    component: About
  },
  {
    path: '/home',
    component: Home
  },
  {
    path:'/',
    redirect:'/about'
  }
]
