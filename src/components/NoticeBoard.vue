<template>
  <button
    @click="backToHome"
    class="flex items-center transition-160 mt-0.7rem text-1.05rem border-0 transition-160"
    :style="{
      opacity: showUp.opacities.value[0],
      transform: `translate(0px, ${showUp.translations.value[0]}px)`
    }"
  >
    <span class="i-mingcute-left-fill transition-400"></span>
    <span class="pl-3px">回到开始页</span>
  </button>
  <h1
    class="text-2rem text-center my-2rem transition-400"
    :style="{
      opacity: showUp.opacities.value[1],
      transform: `translate(0px, ${showUp.translations.value[1]}px)`
    }"
  >
    [ 公告牌 ]
  </h1>
  <div
    class="transition-400"
    v-for="(p, index) in stateText"
    :style="{
      opacity: showUp.opacities.value[index + 2],
      transform: `translate(0px, ${showUp.translations.value[index + 2]}px)`
    }"
  >
    <br v-if="p === '||'" />
    <p v-else>{{ p }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useShowUp } from '@/logics/showUp'
import { onMounted } from 'vue'

const router = useRouter()
onMounted(() => showUp.translate())

// Use / to sep paragraphs
// Use || to add a <br />
const stateText =
  '你好呀！/这里是 Talkland ！/||/你可以/聆听心声，/畅所欲言，/以一个/匿名者。/||/声明：/> 每篇 Talk 应在200字以内。/> 言论责任自负。'.split(
    '/'
  )

const showUp = useShowUp(stateText.length + 2, 200)

const backToHome = () => {
  router.push('/')
}
</script>

<style scoped>
p {
  margin: 8px;
}
button:hover .i-mingcute-left-fill {
  transform: translate(-3px, 0);
  color: var(--my-blue);
}
h1 {
  letter-spacing: 1px;
}
</style>
