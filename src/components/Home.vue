<template>
  <nav
    class="flex items-center justify-strecth mt-17px p-7px mb-1.6rem transition-400 text-1.3rem"
    :style="{
      opacity: showUp1.opacities.value[0],
      transform: `translate(0px, ${showUp1.translations.value[0]}px)`
    }"
  >
    <button
      @click="toWelcomePage"
      class="hover:translate-x--3px hover:text-my-blue transition-160 i-mingcute-arrow-left-fill"
    ></button>
    <button
      class="i-mingcute-settings-1-fill hover:rotate-60 hover:text-my-blue transition-160 ml-auto mr-5px text-1.4rem"
      @click="toSettingPage"
    ></button>
    <span class="i-mingcute-loading-3-fill animate-spin" v-if="loading"></span>
    <button
      class="i-mingcute-refresh-2-fill hover:rotate-45 hover:text-my-blue transition-160"
      v-else
      @click="getTalks"
    ></button>
  </nav>
  <div
    class="p-10px mt-12px mb-8px relative block sticky top-15px transition-400"
    :style="{
      opacity: showUp1.opacities.value[1],
      transform: `translate(0px, ${showUp1.translations.value[1]}px)`
    }"
  >
    <textarea
      class="w-100% min-h-3.5rem p-10px pl-13px pr-13px focus:shadow-lg transition-160"
      v-model="talkContent"
    ></textarea>
    <div
      class="text-#8a8a8a absolute left-23px top-20px border-box reminding"
      v-if="talkContent.length === 0"
    >
      写点什么...
    </div>
    <div
      v-if="talkContent.length > maxTalkLength"
      class="flex items-center text-0.95rem text-my-red op-75 m-4px"
    >
      <span class="i-mingcute-warning-line mr-4px"></span>
      <span>Talk 过长</span>
    </div>
    <div class="flex justify-center">
      <button
        class="items-center button pl-10px mt-7px shadow-lg font-bold ml-4px"
        @mousedown="submitTalk"
      >
        <span>完成</span>
        <span
          class="i-mingcute-send-fill ml-6px mr-3px text-1.1rem text-my-blue"
        ></span>
      </button>
    </div>
  </div>
  <div
    v-for="(talk, index) in talks"
    class="p-15px mt-4rem mb-4rem transition-400"
    :style="{
      opacity: showUp2.opacities.value[index],
      transform: `translate(0px, ${showUp2.translations.value[index]}px)`
    }"
  >
    <p class="text-mid-gray text-1.3rem m-8px ml-5px">
      <span class="font-bold text-1.4rem text-mid-gray">#</span>
      {{ talk.id }}
    </p>
    <p class="min-h-10 vh pl-10px text-1.13rem mb-0.85rem">{{ talk.text }}</p>
    <p class="flex justify-end">
      <button class="flex mb-0.8rem border-0" @click="like(talk.id)">
        <span
          class="i-mingcute-heart-fill mr-0.2rem text-my-red like transition-50"
          v-if="liked.find((x) => x === talk.id)"
        ></span>
        <span
          class="i-mingcute-heart-line mr-0.2rem text-mid-gray like transition-50"
          v-else
        ></span>
        <span>
          {{ talk.likes }}
        </span>
      </button>
    </p>
    <p class="text-#888 float-right italic">{{ talk.time }}</p>
  </div>
</template>

<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'
import { onMounted, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

import { useShowUp } from '@/logics/showUp'
import { sleep } from '@/logics/showUp'
import { projectDBUrl, projectDBAnonKey, projectDBTableName } from '@/config'
import { useSettings } from '@/logics/settings'

const settings = useSettings()

type Talk = {
  id: number
  text: string
  time: string
  likes: number
}

const client = createClient(projectDBUrl, projectDBAnonKey)
const talks = useStorage<Array<Talk>>('talks', [])
const loading = ref(true)

const getTalks = async () => {
  loading.value = true
  const { data, error } = await client.from(projectDBTableName).select()
  if (error != null) {
    alert('请求错误')
  }
  talks.value = data as Talk[]
  talks.value.sort((a, b) =>
    dayjs(a.time, 'YYYY / MM / DD').isBefore(dayjs(b.time, 'YYYY / MM / DD'))
      ? 1
      : -1
  )
  loading.value = false
}

const maxTalkLength = 300
const talkContent = useStorage('talk-draft', '')
const submitTalk = async () => {
  const content = talkContent.value
  talkContent.value = ''
  if (content.length > maxTalkLength) {
    alert('Talk过长')
    return
  } else if (content.length === 0) {
    alert('Talk不能为空')
    return
  }
  loading.value = true
  const { error } = await client.from(projectDBTableName).insert({
    text: content,
    time: dayjs().format('YYYY / MM / DD')
  })
  if (error != null) {
    alert('请求错误')
    return
  }
  await getTalks()
}

const liked = useStorage<number[]>('likes', [])
const like = async (id: number) => {
  let delta = 0
  if (liked.value.find((x) => x === id)) {
    delta = -1
    liked.value = liked.value.filter((x) => x !== id)
  } else {
    delta = 1
    liked.value.push(id)
  }
  talks.value[talks.value.findIndex((x) => x.id === id)].likes += delta
  const { error } = await client
    .from(projectDBTableName)
    .update({ likes: talks.value.filter((x) => x.id === id)[0].likes })
    .eq('id', id)
  if (error != null) {
    alert('请求错误')
    return
  }
}

const showUp1 = useShowUp(2, 240)
onMounted(() => showUp1.translate())

const showUp2 = useShowUp(talks.value.length, 240)
onMounted(() =>
  (async () => {
    await getTalks()
    showUp2.setLength(talks.value.length)
    await sleep(120)
    await showUp2.translate()
  })()
)

const router = useRouter()

const toWelcomePage = async () => {
  await sleep(160)
  router.push('/')
}
const toSettingPage = async () => {
  await sleep(160)
  router.push('/setting')
}

onMounted(() =>
  window.addEventListener('beforeunload', () => {
    if (!settings.talkStored) window.localStorage.removeItem('talks')
    if (!settings.draftStored) window.localStorage.removeItem('talk-draft')
  })
)
</script>

<style scoped>
.button:hover .i-mingcute-send-fill {
  transform: translate(0.1rem, -0.1rem);
}
.button:hover .i-mingcute-add-fill {
  transform: rotate(135deg);
}
.reminding {
  z-index: -99;
}
textarea:focus ~ .reminding {
  display: none;
}
textarea ~ div button {
  display: none;
}
textarea:focus ~ div button {
  display: flex;
}
/* mobile friendly :hover */
@media (any-hover: hover) or (hover: hover) {
  button:hover .like {
    transform: translate(0, -3px);
  }
  button:hover .i-mingcute-heart-line {
    opacity: 0.8;
    color: var(--my-red);
  }
}
@media (any-hover: none) or (hover: hover) {
  button:active .like {
    transform: translate(0, -3px);
  }
}
.sticky {
  background-color: rgba(234, 234, 234, 0.2);
  backdrop-filter: blur(4px);
  border-radius: 8px;
  z-index: 999;
}
</style>
