<template>
  <div>
    <h2>Vue版本的:点击次数:{{count}},奇数or偶数:{{evenOrOdd}}</h2>
     <button @click="increment">加</button>
    <button @click="decrement">减</button>
    <button @click="incrementOrOdd">偶数加</button>
    <button @click="incrementAsync">异步加</button>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      count: 0
    }
  },
  computed: {
    evenOrOdd() {
      return this.count % 2 === 0 ? '偶数' : '奇数'
    }
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    incrementOrOdd() {
      if (this.count % 2 !== 0) {
        this.count++
      }
    },
    incrementAsync() {
      setTimeout(() => {
        this.count++
      }, 1000)
    }
  }
}
</script>
<style scoped>
</style>
