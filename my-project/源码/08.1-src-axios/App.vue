<template>
  <div class="container">
    <h2 v-if="!repUrl">正在加载中</h2>
   <h2 v-else>
      加载成功
      <a :href="repUrl">{{repName}}</a>
    </h2>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  data() {
    return {
      repUrl: '',
      repName: ''
    }
  },
  mounted() {
    const url = `https://api.github.com/search/repositories?q=v&sort=stars`
    axios
      .get(url)
      .then(response => {
        const result = response.data.items[0]
        this.repUrl = result.html_url
        this.repName = result.name
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style scoped>
</style>
