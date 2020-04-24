<template>
  <div>
    <mt-button type="danger" @click="showMsg">danger</mt-button>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
  name: 'App',
  data() {
    return {
      msg: '我'
    }
  },
  methods: {
    showMsg(){
      MessageBox('提示', '操作成功');
    }
  }
}
</script>
<style scoped>
</style>
