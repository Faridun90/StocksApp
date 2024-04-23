<script setup lang="ts">
import { defineProps, ref } from 'vue'
const props = defineProps(['value'])
const updatedValue = ref(props.value)
const isUpdating = ref(false)
const emit = defineEmits(['deleteValue', 'updateValue'])

const onDeleteClick = () => {
  emit('deleteValue')
}

const onToggle = () => {
  isUpdating.value = true
}

const updateValue = () => {
  emit('updateValue', updatedValue.value)
  console.log(updatedValue.value)
  isUpdating.value = false
}
</script>

<template>
  <li class="mb-4 list-none border-[1px] border-slate-200 rounded-md w-full p-2">
    <div v-if="!isUpdating" class="flex gap-2">
      <h3 class="w-full">{{ props.value }}</h3>
      <button @click="onToggle" class="bg-green-600 rounded-sm p-1">Update</button>
      <button @click="onDeleteClick" class="bg-red-500 rounded-sm p-1">Delete</button>
    </div>
    <div v-else>
      <form @submit.prevent="updateValue" class="flex gap-2">
        <input type="text" v-model="updatedValue" class="text-md text-black" placeholder="props" />
        <button type="submit" class="bg-green-600 rounded-sm p-1">OK</button>
        <button @click="!isUpdating" class="bg-red-500 rounded-sm p-1">Cancel</button>
      </form>
    </div>
  </li>
</template>
