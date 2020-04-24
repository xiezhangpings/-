<template>
  <div>
    <h2>Vuex版本的:点击次数:{{count}},奇数or偶数:{{evenOrOdd}}</h2>
    <button @click="increment">加</button>
    <button @click="decrement">减</button>
    <button @click="incrementOrOdd">偶数加</button>
    <button @click="incrementAsync">异步加</button>
  </div>
</template>
<script>
//辅助函数
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'App',
  data() {
    return {}
  },
  computed :{
    ...mapState(['count']),
    ...mapGetters(['evenOrOdd'])
  },
  methods: {
    ...mapMutations({ increment: 'INCREMENT', decrement: 'DECREMENT' }),
    ...mapActions(['incrementOrOdd', 'incrementAsync'])

  }
}
</script>
<style scoped>
</style>
