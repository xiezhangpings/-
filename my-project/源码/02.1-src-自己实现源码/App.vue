<template>
  <div>
    <h2>App</h2>
    <HelloeWorld/>
  </div>
</template>
<script>
// HelloeWorld
import HelloeWorld from './components/HelloWorld'
// 向外暴露当前的这个组件对象,组件也是对象
export default {
  name: 'App',
  // 注册组件
  components: {
    HelloeWorld
  }
}
</script>

