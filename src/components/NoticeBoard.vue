<template>
  <div class="slide-enter-content">
    <nav class="flex items-center mt-0.7rem">
      <button
        @click="backToHome"
        class="text-1.3rem i-mingcute-arrow-left-fill hover:text-my-blue hover:translate-x--3px transition-160"
      ></button>
    </nav>
    <h1 class="text-2rem text-center my-2rem">[ 公告牌 ]</h1>
    <div v-for="p in stateText" style="--start: 240ms">
      <br v-if="p === '||'" />
      <p v-else>{{ p }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { sleep } from '@/logics/showUp'

const router = useRouter()

// Use / to sep paragraphs
// Use || to add a <br />
const stateText =
  '你好呀！/这里是 Talkland ！/||/你可以/聆听心声，/畅所欲言，/以一个/匿名者。/||/声明：/> 每篇 Talk 应在300字以内。/> 言论责任自负。'.split(
    '/'
  )

const backToHome = async () => {
  await sleep(160)
  router.push('/')
}
</script>

<style scoped>
p {
  margin: 8px;
}
h1 {
  letter-spacing: 1px;
}
</style>
