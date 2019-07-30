<template>
  <li :class="{ completed: todo.checklist, editing: editing }" class="todo">
    <div class="view">
      <input
        :checked="todo.checklist"
        class="toggle"
        type="checkbox"
        @change="toggleTodo( todo)"
      >
      <label @dblclick="editing = true" v-text="todo.todo" />
      <button class="destroy" @click="deleteTodo( todo )" />
    </div>
    <input
      v-show="editing"
      v-focus="editing"
      :value="todo.todo"
      class="edit"
      @keyup.enter="checklistEdit"
      @keyup.esc="cancelEdit"
      @blur="checklistEdit"
    >
  </li>
</template>

<script>

export default {
  name: 'Todo',
  directives: {
    focus(el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  },
  props: {
    todo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      editing: false
    }
  },
  methods: {
    deleteTodo(todo) {
      this.$emit('deleteTodo', todo)
    },
    editTodo({ todo, value }) {
      this.$emit('editTodo', { todo, value })
    },
    toggleTodo(todo) {
      this.$emit('toggleTodo', todo)
    },
    checklistEdit(e) {
      const value = e.target.value.trim()
      const { todo } = this
      if (!value) {
        this.deleteTodo({
          todo
        })
      } else if (this.editing) {
        this.editTodo({
          todo,
          value
        })
        this.editing = false
      }
    },
    cancelEdit(e) {
      e.target.value = this.todo.todo
      this.editing = false
    }
  }
}
</script>
