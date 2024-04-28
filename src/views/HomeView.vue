<script setup lang="ts">
import TodoItem from '../components/TodoItem.vue'
import { useTasksStore } from '../stores/tasks'
import { ref } from 'vue'
// const tasks = ref(['Buy some milk', 'Go for a Walk'])
const storeTasks = useTasksStore()
const tasks = storeTasks.tasks
const todo = ref('')
// const addTask = () => {
//   tasks.push(todo.value)
//   console.log(tasks.value)
//   todo.value = ''
// }
const addTask = (newTask: string) => {
  storeTasks.addTask(newTask)
  todo.value = ''
}

const deleteTask = (taskIndex: number) => {
  storeTasks.deleteTask(taskIndex)
}
const updateTask = (taskIndex: number, newTask: string) => {
  storeTasks.updateTask(taskIndex, newTask)
}
//1.Create a component for each list item
//2.Use the same component, instead of passing data up-down, pass it globaly with Pinia
</script>

<template>
  <main class="bg-black h-screen text-white">
    <div class="flex flex-col m-auto w-full h-full items-center">
      <h1 class="mt-6 text-2xl font-bold">TO-DO App</h1>

      <div class="mt-4 flex flex-col gap-2">
        <form class="mt-6 flex flex-col gap-2" @submit.prevent="addTask(todo)">
          <input
            type="text"
            class="text-slate-800 rounded-sm p-1"
            v-model="todo"
            placeholder="Add a new task"
          />
          <!-- <div>
            <label for="important">Important</label>
            <input type="checkbox" name="" id="important" />
          </div> -->

          <button type="submit" class="bg-indigo-600 rounded-sm">Add</button>
        </form>
      </div>
      <br />
      <div
        v-if="tasks.length > 0"
        class="bg-slate-800 mt-3 border-[2px] border-indigo-300 p-4 rounded-sm"
      >
        <div v-for="(task, index) in tasks" :key="index" class="flex gap-1 items-center">
          <TodoItem
            :value="task"
            @deleteValue="deleteTask(index)"
            @updateValue="updateTask(index, $event)"
          />
        </div>
      </div>
      <div v-else class="bg-slate-800 mt-3 border-[2px] border-indigo-300 p-4 rounded-sm">
        There is no existing tasks...
      </div>
    </div>
  </main>
</template>
