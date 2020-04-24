<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">搜索GitHub用户</h3>
    <div>
      <input type="text" placeholder="输入内容" v-model="searchTxt" />
      <button @click="clickHandle">搜索</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      searchTxt: ''
    }
  },
  methods: {
    clickHandle() {
      const txt = this.searchTxt.trim()
      if (txt) {
        // 分发事件
        this.$bus.$emit('search', txt)
        // 清空文本框
        this.searchTxt = ''
      }
    }
  }
}
</script>
<style scoped>
.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>
