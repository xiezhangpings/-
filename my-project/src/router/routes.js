// 引入组件
import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
import MessageDetail from '../pages/MeesageDetail.vue'
import News from '../pages/News.vue'
import Message from '../pages/Message.vue'
export default [
  {
    path: '/about',
    component: About
  },
  {
    path: '/home',
    component: Home,
    children: [
    {
      path: 'home/news',
      component: News,
    },
    {
      path: '/home/message',
      component: Message,
      children:[
        {
          path:'/home/message/detail/:id',
          component:MessageDetail,
          //函数模式
          props: (route) => ({ id: route.params.id })
        }
      ]
    },
    {
      path:'/home',  //重定向
      redirect: '/home/news'
    }

    ]
  },
  {
    path:'/',
    redirect:'/about'
  }
]
