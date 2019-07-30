<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <input class="new-todo" autocomplete="off" placeholder="New Task" @keyup.enter="addTodo">
    </header>
    <!-- main section -->
    <section v-show="todos.length" v-loading="loading" class="main">
      <input id="toggle-all" :checked="allChecked" class="toggle-all" type="checkbox" @change="toggleAll({ checklist: !allChecked })">
      <label for="toggle-all" />
      <ul class="todo-list">
        <todo
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          @toggleTodo="toggleTodo"
          @editTodo="editTodo"
          @deleteTodo="deleteTodo"
        />
      </ul>
    </section>
    <!-- footer -->
    <footer v-show="todos.length" class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item') }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{ key | capitalize }}</a>
        </li>
      </ul>
      <!-- <button class="clear-completed" v-show="todos.length > remaining" @click="clearCompleted">
        Clear completed
      </button> -->
    </footer>
  </section>
</template>

<script>
import Todo from './Todo.vue'
import { fetchList, createTodo, deleteTodo } from '@/api/todo.js'

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.checklist),
  completed: todos => todos.filter(todo => todo.checklist)
}
export default {
  components: { Todo },
  filters: {
    pluralize: (n, w) => n === 1 ? w : w + 's',
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  },
  data() {
    return {
      visibility: 'all',
      filters,
      // todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defalutList
      todos: [
        { todo: 'todo', checklist: false }
      ],
      loading: true
    }
  },
  computed: {
    allChecked() {
      return this.todos.every(todo => todo.checklist)
    },
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return this.todos.filter(todo => !todo.checklist).length
    }
  },
  created() {
    this.getTodo()
  },
  methods: {
    getTodo() {
      this.loading = true
      fetchList().then(res => {
        this.todos = res
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    async addTodo(e) {
      const todo = e.target.value
      const payload = {
        todo: todo.trim(),
        checklist: false
      }
      await createTodo(payload).then(res => {
        this.getTodo()
      })
      e.target.value = ''
    },
    toggleTodo(val) {
      val.checklist = !val.checklist
      // this.setLocalStorage()
    },
    async deleteTodo(todo) {
      await deleteTodo(todo).then(res => {
        this.getTodo()
      })
      // this.todos.splice(this.todos.indexOf(todo), 1)
      // this.setLocalStorage()
    },
    editTodo({ todo, value }) {
      todo.todo = value
      // this.setLocalStorage()
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.checklist)
      // this.setLocalStorage()
    },
    toggleAll({ checklist }) {
      this.todos.forEach(todo => {
        todo.checklist = checklist
        // this.setLocalStorage()
      })
    }
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
