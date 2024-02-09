<template>
  <div class="slide-enter-content">
    <nav class="transition-400">
      <button
        @click="backToHome"
        class="text-1.3rem i-mingcute-arrow-left-fill hover:text-my-blue hover:translate-x--3px transition-160"
      ></button>
    </nav>
    <h1 class="text-1.6rem my-0.8rem transition-400">设置</h1>
    <ul class="slide-enter-content">
      <SettingItem>
        <span>最大内容宽度</span>
        <input
          type="number"
          v-model="settingsTemp.maxContentWidth"
          class="ml-auto"
        />
      </SettingItem>
      <SettingItem>
        <span>Talk 数据缓存</span>
        <span
          class="ml-auto text-1.3rem toggle transition-160"
          :class="
            settingsTemp.talkStored
              ? 'i-mingcute-toggle-right-fill'
              : 'i-mingcute-toggle-left-line'
          "
          @click="settingsTemp.talkStored = !settingsTemp.talkStored"
        ></span>
      </SettingItem>
      <SettingItem>
        <span>Talk 草稿保存</span>
        <span
          class="ml-auto text-1.3rem toggle transition-160"
          :class="
            settingsTemp.draftStored
              ? 'i-mingcute-toggle-right-fill'
              : 'i-mingcute-toggle-left-line'
          "
          @click="settingsTemp.draftStored = !settingsTemp.draftStored"
        ></span>
      </SettingItem>
      <SettingItem>
        <button
          class="flex items-center button pl-10px mt-10vh m-auto"
          @click="apply"
        >
          <span>应用</span>
          <span class="ml-7px mr-1px transition-160 i-mingcute-pin-line"></span>
        </button>
      </SettingItem>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import SettingItem from './SettingItem.vue'

import { sleep } from '@/logics/showUp'
import type { Settings } from '@/logics/settings'
import { useSettings } from '@/logics/settings'

const settings = useSettings()

const settingsTemp = ref<Settings>({
  maxContentWidth: settings.maxContentWidth,
  talkStored: settings.talkStored,
  draftStored: settings.draftStored
})

const apply = () => {
  settings.maxContentWidth = settingsTemp.value.maxContentWidth
  settings.talkStored = settingsTemp.value.talkStored
  settings.draftStored = settingsTemp.value.draftStored
  backToHome()
}

const router = useRouter()

const backToHome = async () => {
  await sleep(160)
  router.push('/home')
}
</script>

<style scoped>
/* mobile friendly :hover */
@media (any-hover: hover) or (hover: hover) {
  button:hover .i-mingcute-pin-line {
    transform: translate(-2px, 2px);
    color: var(--my-blue);
  }
  button:has(.i-mingcute-pin-line):hover {
    /* Copied from the default generation of shadow-lg in UnoCSS*/
    --un-shadow: var(--un-shadow-inset) 0 10px 15px -3px var(--un-shadow-color, rgb(0
              0 0 / 0.1)),
      var(--un-shadow-inset) 0 4px 6px -4px var(--un-shadow-color, rgb(0 0 0 /
              0.1));
    box-shadow: var(--un-ring-offset-shadow), var(--un-ring-shadow),
      var(--un-shadow);
  }
  .toggle:hover {
    transform: translate(3px, 0);
  }
}
@media (any-hover: none) or (hover: hover) {
  button:active .i-mingcute-pin-line {
    transform: translate(-2px, 2px);
    color: var(--my-blue);
  }
  button:has(.i-mingcute-pin-line):active {
    /* Copied from the default generation of shadow-lg in UnoCSS*/
    --un-shadow: var(--un-shadow-inset) 0 10px 15px -3px var(--un-shadow-color, rgb(0
              0 0 / 0.1)),
      var(--un-shadow-inset) 0 4px 6px -4px var(--un-shadow-color, rgb(0 0 0 /
              0.1));
    box-shadow: var(--un-ring-offset-shadow), var(--un-ring-shadow),
      var(--un-shadow);
  }
  .toggle:active {
    transform: translate(3px, 0);
  }
}
</style>
