<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
const props = defineProps(['tasks'])
const emit = defineEmits(['deleteTask'])
const deleteTask = (taskIndex: number) => {
  emit('deleteTask', taskIndex)
}
</script>

<template>
  <div v-for="(task, index) in props.tasks" :key="task" class="flex gap-1 items-center">
    <li class="mb-4 flex gap-2">
      <h3>{{ task }}</h3>
      <button @click="deleteTask(index)" class="bg-red-500 rounded-sm p-1">Delete</button>
    </li>
  </div>
</template>
