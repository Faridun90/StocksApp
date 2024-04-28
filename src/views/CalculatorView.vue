<script setup lang="ts">
import { ButtonMapper } from '../constants/const'
import CalcButton from '../components/CalcButton.vue'
import { ref } from 'vue'

const dispalyedData = ref('0')

const flipSign = (value: string) => {
  if (value.startsWith('-')) {
    return value.substring(1)
  } else {
    return `-${value}`
  }
}
const handlePercentage = (string: String) => {
  const regex = /[-+*/÷x]/
  const splitStep = string.split(regex)
  const percentage = splitStep[splitStep.length - 1].replace('%', '')
  const numPercent = Number(percentage)
  const pow = numPercent / Math.pow(10, 2)
  const targetNum = splitStep[splitStep.length - 2]
  const target = Number(targetNum)

  let res
  if (string.includes('+')) {
    res = target + target * pow
  } else {
    res = target - target * pow
  }
  return String(res)
}
const handleButtonClick = (value: string) => {
  console.log('this is  btn value: ', value)
  console.log('this is display value before if-state:', dispalyedData.value)

  let updateDisplayData = dispalyedData.value

  if (value === '=') {
    try {
      if (updateDisplayData.includes('%')) {
        updateDisplayData = handlePercentage(updateDisplayData)
      } else {
        if (eval(updateDisplayData) % 1 != 0) {
          updateDisplayData = eval(updateDisplayData).toFixed(5)
        }
        updateDisplayData = eval(updateDisplayData)
      }
    } catch (error) {
      updateDisplayData = 'Error'
    }
  } else if (value === 'clear') {
    updateDisplayData = '0'
  } else if (value === '+/-') {
    updateDisplayData = flipSign(updateDisplayData)
  } else {
    if (updateDisplayData === '0') {
      updateDisplayData = value
    } else {
      updateDisplayData += value
    }
  }

  dispalyedData.value = updateDisplayData
}
</script>
<template>
  <div class="bg-gradient-to-r from-blue-400 to-green-400 h-screen text-white">
    <h1>Calculator App</h1>
    <div
      class="flex flex-col justify-center bg-lightGray max-w-[350px] mx-auto rounded-lg border border-black shadow-lg"
    >
      <div
        class="flex justify-end items-end pr-8 bg-opacity-75 bg-gray-800 text-white text-6xl min-h-[110px] max-h-[200px] break-words break-all rounded-t-[8px]"
      >
        {{ dispalyedData }}
      </div>

      <div class="max-w-[400px] grid grid-cols-4 rounded-b-[8px]">
        <CalcButton
          v-for="(button, index) in ButtonMapper"
          :key="index"
          :value="button"
          @click="handleButtonClick(button.value)"
          class="h-20 text-white text-lg font-normal border border-black cursor-pointer hover:opacity-70"
        />
      </div>
    </div>
  </div>
</template>
