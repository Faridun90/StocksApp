<script setup lang="ts">
import { ref } from 'vue'
import TodoItem from '../components/TodoItem.vue'

const tasks = ref(['Buy some milk', 'Go for a Walk'])
const todo = ref('')

const addTask = () => {
  tasks.value.push(todo.value)
  console.log(tasks.value)
  todo.value = ''
}
const deleteTask = (taskIndex: number) => {
  tasks.value.splice(taskIndex, 1)
}

//1.Create a component for each list item
</script>

<template>
  <main class="bg-black h-screen text-white">
    <div class="flex flex-col m-auto w-full h-full items-center">
      <h1 class="mt-6">TO-DO App</h1>
      <div class="mt-6 flex flex-col gap-2">
        <form class="mt-6 flex flex-col gap-2" @submit.prevent="addTask">
          <input
            type="text"
            class="text-slate-800 rounded-sm p-1"
            v-model="todo"
            placeholder="Add a new task"
          />
          <button type="submit" class="bg-indigo-600 rounded-sm">Add</button>
        </form>
      </div>
      <br />
      <div
        v-if="tasks.length > 0"
        class="bg-slate-800 mt-3 border-[2px] border-indigo-300 p-4 rounded-sm"
      >
        <TodoItem :tasks="tasks" @deleteTask="deleteTask" />
      </div>
      <div v-else class="bg-slate-800 mt-3 border-[2px] border-indigo-300 p-4 rounded-sm">
        There is no existing tasks!
      </div>
    </div>
  </main>
</template>
