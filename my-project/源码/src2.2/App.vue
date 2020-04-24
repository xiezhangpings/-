<template>
<div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List :todos="todos" :deleteTodo="deleteTodo" :toggleTodo="toggleTodo" />
      <Footer :todos="todos" :checkAllTodo="checkAllTodo" />
    </div>
  </div>
</template>
<script>
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import Storage from './utils/utils.js'
export default {
  name: 'App',
  // 注册组件
  components: {
    Header,
    List,
    Footer
  },
  data () {
    return {
      todos: Storage.getTodos()
    }
  },
  methods: {
    addTodo (todo) {
      this.todos.unshift(todo)
    },
    deleteTodo (index) {
      this.todos.splice(index, 1)
    },
    toggleTodo (todo) {
      todo.isCompleted = !todo.isCompleted
    },
    checkAllTodo (flag) {
      this.todos.forEach(todo => {
        todo.isCompleted = flag
      })
    }
  },
  watch: {
    todos: {
      deep: true,
      handler: Storage.setTodos
    }
  }
}
</script>
<style scoped>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
