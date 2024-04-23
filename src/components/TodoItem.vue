<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
const props = defineProps(['value'])
const emit = defineEmits(['deleteValue'])

const onDeleteClick = () => {
  emit('deleteValue')
}
</script>

<template>
  <li class="mb-4 flex gap-2">
    <h3>{{ props.value }}</h3>
    <button @click="onDeleteClick" class="bg-red-500 rounded-sm p-1">Delete</button>
  </li>
</template>
