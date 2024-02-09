<template>
  <div class="flex flex-col items-center slide-enter-content">
    <h1 class="m-1.2rem mt-2rem text-3rem text-center transition-460">
      Talkland 言他
    </h1>
    <p class="m-1.5rem text-1.2rem mb-25vh h-3rem text-center text-#8a8a8a">
      {{ typer.typer.value }}
    </p>
    <button
      @click="skipToHome"
      class="flex items-center button p-5px pl-8px pr-6px transition-160 hover:shadow-lg"
    >
      <span class="text-1.3rem font-bold pl-7px">进入</span>
      <span
        class="text-1.3rem i-mingcute-arrows-right-fill ml-2px mr-4px transition-160"
      ></span>
    </button>
    <button
      @click="skipToNoticeBoard"
      class="flex items-center button p-4px pl-7px pr-5px transition-160 mt-2rem hover:shadow-lg text-1.2rem"
    >
      <span class="font-bold pl-5px">公告牌</span>
      <span class="i-mingcute-right-fill transition-160"></span>
    </button>
    <button
      @click="skipToGitHub"
      class="flex items-center button p-4px pl-7px pr-5px transition-160 mt-0.7rem text-1.2rem"
    >
      <span class="font-bold pl-5px">GitHub</span>
      <span class="i-mingcute-github-line ml-3px mr-2px transition-140"></span>
    </button>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { sleep } from '@/logics/showUp'
import { useTyper } from '@/logics/typer'
import { projectLink } from '@/config'

const router = useRouter()

const typer = useTyper()
onMounted(() => typer.typeWords())

const skipToHome = async () => {
  await sleep(160)
  router.push('/home')
}
const skipToNoticeBoard = async () => {
  await sleep(160)
  router.push('/notice-board')
}
const skipToGitHub = async () => {
  await sleep(160)
  window.open(projectLink)
}
</script>
<style scoped>
button:hover .i-mingcute-arrows-right-fill {
  transform: translate(5px, 0);
  color: var(--my-blue);
}
button:hover .i-mingcute-right-fill {
  transform: translate(3px, 0);
  color: var(--my-blue);
}
@media (any-hover: hover) or (hover: hover) {
  button:hover .i-mingcute-github-line {
    transform: translate(0, -1px);
    color: var(--my-blue);
  }
  button:has(.i-mingcute-github-line):hover {
    /* Copied from the default generation of shadow-lg in UnoCSS*/
    --un-shadow: var(--un-shadow-inset) 0 10px 15px -3px var(--un-shadow-color, rgb(0
              0 0 / 0.1)),
      var(--un-shadow-inset) 0 4px 6px -4px var(--un-shadow-color, rgb(0 0 0 /
              0.1));
    box-shadow: var(--un-ring-offset-shadow), var(--un-ring-shadow),
      var(--un-shadow);
  }
}
@media (any-hover: none) or (hover: none) {
  button:active .i-mingcute-github-line {
    transform: translate(0, -1px);
    color: var(--my-blue);
  }
  button:has(.i-mingcute-github-line):active {
    /* Copied from the default generation of shadow-lg in UnoCSS*/
    --un-shadow: var(--un-shadow-inset) 0 10px 15px -3px var(--un-shadow-color, rgb(0
              0 0 / 0.1)),
      var(--un-shadow-inset) 0 4px 6px -4px var(--un-shadow-color, rgb(0 0 0 /
              0.1));
    box-shadow: var(--un-ring-offset-shadow), var(--un-ring-shadow),
      var(--un-shadow);
  }
}
</style>
