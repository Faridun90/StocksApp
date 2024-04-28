<script setup lang="ts">
const props = defineProps(['value'])
</script>
<template>
  <button label="props.label" :class="props.value.class">{{ props.value.label }} {{}}</button>
</template>
