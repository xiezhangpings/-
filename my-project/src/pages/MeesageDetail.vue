<template>
  <ul>
      <li>id:{{id}}</li>
    <li>title:{{detail.title}}</li>
    <li>content:{{detail.content}}</li>
  </ul>
</template>
<script>
export default {
  name: 'MessageDetail',
  props:['id'],
  data() {
    return {
      messageDetails: [
        { id: 1, title: 'message001', content: 'detail001' },
        { id: 3, title: 'message003', content: 'detail003' },
        { id: 5, title: 'message005', content: 'detail005' }
      ],
      detail: {}
    }
  },
  mounted() {
    this.showDetail(this.$route)
  },
  watch: {
    $route(val) {
      this.showDetail(val)
    }
  },
  methods: {
    showDetail(route){
       const id = route.params.id * 1
      this.detail = this.messageDetails.find(message => message.id === id)
    }
  }
}
</script>
<style scoped>
</style>
