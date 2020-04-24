<template>
  <li
    @mouseenter="mouse(true)"
    @mouseleave="mouse(false)"
    :style="{color:fontColor,backgroundColor:bgColor}"
  >
     <label>
      <input type="checkbox" v-model="isCheck" />
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="delTodo">删除</button>
  </li>
</template>

<script>
import PubSub from 'pubsub-js'
export default {
  name: 'Item',
  props: {
    todo: Object,
    index: Number,
  },
  data () {
    return {
      fontColor: 'black',
      bgColor: 'white',
      isShow: false
    }
  },
  methods: {
    mouseHandle (flag) {
      if (flag) {
        this.fontColor = 'green'
        this.bgColor = 'pink'
        this.isShow = true
      } else {
        this.fontColor = 'black'
        this.bgColor = 'white'
        this.isShow = false
      }
    },
    delTodo () {
      if (alert('确定删除吗')) {
       this.PubSub.publish('deleteTodo', this.index)
      }
    }
  },
  components: {
    isCheck: {
      get () {
        return this.todo.isCompleted
      },
      set () {
        this.$bus.$emit('toggleTodo', this.todo)
      }
    }
  }
}
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /* display: none; */
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
