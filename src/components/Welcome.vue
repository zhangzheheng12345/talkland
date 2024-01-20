<template>
  <div class="flex flex-col items-center">
    <h1
      class="m-1.2rem mt-2rem text-3rem text-center transition-460"
      :style="{
        opacity: showUp.opacities.value[0],
        transform: `translate(0px, ${showUp.translations.value[1]}px)`
      }"
    >
      Talkland
    </h1>
    <p class="m-1.5rem text-1.2rem mb-25vh h-3rem text-center text-#8a8a8a">
      {{ typer.typer.value }}
    </p>
    <button
      @click="skipToHome"
      class="flex items-center button p-5px pl-8px pr-6px transition-160 hover:shadow-lg"
      :style="{
        opacity: showUp.opacities.value[1],
        transform: `translate(0px, ${showUp.translations.value[1]}px)`
      }"
    >
      <span class="text-1.3rem font-bold pl-7px">进入</span>
      <span
        class="text-1.3rem i-mingcute-arrows-right-fill ml-2px mr-4px transition-160"
      ></span>
    </button>
    <button
      @click="skipToGitHub"
      class="flex items-center button p-4px pl-7px pr-5px transition-160 mt-1rem hover:shadow-lg"
      :style="{
        opacity: showUp.opacities.value[2],
        transform: `translate(0px, ${showUp.translations.value[2]}px)`
      }"
    >
      <span class="text-1.2rem font-bold pl-5px">GitHub</span>
      <span
        class="text-1.2rem i-mingcute-github-line ml-3px mr-2px transition-140"
      ></span>
    </button>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useShowUp } from '@/logics/showUp'
import { useTyper } from '@/logics/typer'
import { projectLink } from '@/config'

const router = useRouter()

const typer = useTyper()

onMounted(() => typer.typeWords())

const skipToHome = () => {
  router.push('/home')
}
const skipToGitHub = () => {
  window.open(projectLink)
}

const showUp = useShowUp(3, 360)
onMounted(() => showUp.translate())
</script>
<style scoped>
button:hover .i-mingcute-arrows-right-fill {
  transform: translate(5px, 0);
}
button:hover .i-mingcute-github-line {
  transform: translate(0, -1px);
}
</style>
