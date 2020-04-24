<template>
  <div>
    <h2>Vuex版本的:点击次数:{{$store.state.count}},奇数or偶数:{{$store.getters.evenOrOdd}}</h2>
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
    return {}
  },
  methods: {
    // 加的操作
    increment() {
      this.$store.commit('increment')
    },
    // 减的操作
    decrement() {
      this.$store.commit('decrement')
    },
    // 奇数加的操作
    incrementOrOdd() {
      // 提交对应的action
      this.$store.dispatch('incrementOrOdd')
    },
    // 异步加的操作
    incrementAsync() {
      this.$store.dispatch('incrementAsync')
    }
  }
}
</script>
<style scoped>
</style>
