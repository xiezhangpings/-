<template>
<div class="todo-container">
    <div class="todo-wrap">
     <Header @addTodo="addTodo" />
      <List :todos="todos" />
       <Footer :todos="todos">
        <label slot="left">
          <input type="checkbox" v-model="checkAll" />
        </label>
        <span slot="center">
          <span>已完成{{count}}</span>
          / 全部{{todos.length}}
        </span>
        <button class="btn btn-danger" slot="right">清除已完成任务</button>
      </Footer>
    </div>
  </div>
</template>
<script>
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import Storage from './utils/utils.js'
import PubSub from 'pubsub-js'
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
  },
  mounted(){
    this.token = PubSub.subscribe('deleteTodo',(msg, data)=>{
      this.deleteTodo(data)
    })
     this.$bus.$on('toggleTodo', todo => {
      this.toggleTodo(todo)
    })
  },
  beforeDestroy(){
    PubSub.unsubscribe(this.token)
    this.$bus.$off('toggleTodo')
  },
  computed: {
    conut () {
      return this.todos.reduce((pre, todo) => pre + (todo.isCompleted ? 1 : 0),0)
    },
    checkAll:{
      get() {
        return this.count === this.todos.length && this.count > 0
      },
      set(val) {
        this.checkAllTodo(val)
      }
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
