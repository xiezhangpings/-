<template>
  <div class="container">
    <label>
      <input type="checkbox" v-model="checkAll" />
    </label>
    <span>
      <span>已完成{{count}}</span>
      / 全部{{todos.length}}
    </span>
    <button class="btn btn-danger">清除已完成任务</button>
  </div>
</template>

<script>
// 监测变化
export default {
  name: 'Footer',
  props: {
    todos: Array,
    checkAllTodo: Function
  },
  computed: {
    count () {
      return this.todos.reduce((pre, todo) => pre + (todo.isCompleted ? 1 : 0), 0)
    },
    checkAll: {
      get () {
        return this.count === this.todos.length && this.count > 0
      },
      set (val) {
        this.checkAllTodo(val)
      }
    }
  }
}
</script>

<style scoped>
/*footer*/
.container {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.container label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.container label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.container button {
  float: right;
  margin-top: 5px;
}
</style>
