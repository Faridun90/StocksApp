<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
const props = defineProps(['task'])
const emit = defineEmits(['deleteTask'])
const deleteTask = (taskIndex: number) => {
  emit('deleteTask', taskIndex)
}
</script>

<template>
  <li class="mb-4 flex gap-2">
    <h3>{{ props.task }}</h3>
    <button @click="deleteTask(index)" class="bg-red-500 rounded-sm p-1">Delete</button>
  </li>
</template>
