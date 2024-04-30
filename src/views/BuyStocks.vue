<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '../utils/stockApi'

const response = ref()
const response2 = ref()
onMounted(async () => {
  try {
    response.value = await api.getStocks()
    console.log(response.value)
  } catch (error) {
    console.error(error)
  }
  try {
    response2.value = await api.getStock('MSFT')
    console.log(response2.value[0].o)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <h1>Hello World</h1>
</template>
