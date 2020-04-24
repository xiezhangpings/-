<template>
  <div>
    <ul>
      <li v-for="(m,index) in messages" :key="index">
        <router-link replace :to="`/home/message/detail/${m.id}`">{{m.title}}</router-link>---
        <button @click="pushHandle(m.id)">push查看</button>
        ---
        <button @click="replaceHandle(m.id)">replace查看</button>
      </li>
    </ul>
    <button @click="$router.back()">返回</button>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'Message',
  data() {
    return {
      messages: []
    }
  },
  // 页面加载后的声明周期函数
  mounted() {
    setTimeout(() => {
      this.messages = [
        { id: 1, title: '1111111' },
        { id: 3, title: '2222222' },
        { id: 5, title: '3333333' }
      ]
    }, 1000)
  },
  methods: {
    pushHandle(id) {
      this.$router.push(`/home/message/detail/${id}`)
    },
    replaceHandle(id) {
      this.$router.replace(`/home/message/detail/${id}`)
    }
  }
}
</script>
<style scoped>
</style>
