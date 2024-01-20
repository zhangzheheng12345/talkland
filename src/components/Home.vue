<template>
  <nav class="flex items-center justify-strecth mt-17px p-7px mb-1.6rem">
    <span
      class="i-mingcute-loading-3-fill animate-spin text-1.3rem"
      v-if="loading"
    ></span
    ><button
      class="i-mingcute-refresh-2-fill text-1.3rem"
      v-else
      @click="getTalks"
    ></button>
    <button
      @click="toWelcomePage"
      class="text-1.4rem mono-more ml-auto font-bold title_"
    >
      Talkland
    </button>
  </nav>
  <div class="p-10px mt-12px mb-8px relative block sticky top-15px">
    <textarea
      class="w-100% min-h-3.5rem p-10px pl-13px pr-13px focus:shadow-lg transition-160"
      v-model="talkContent"
    ></textarea>
    <div class="text-#8a8a8a absolute left-23px top-20px border-box reminding">
      写点什么...
    </div>
    <div class="flex justify-center">
      <button
        class="items-center button pl-10px mt-7px shadow-lg"
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
    class="p-15px mt-4.5rem mb-4.5rem transition-360"
    :style="{
      opacity: showUp.opacities.value[index],
      transform: `translate(0px, ${showUp.translations.value[index]})`
    }"
  >
    <p class="text-mid-gray text-1.2rem m-8px ml-5px">
      <span class="font-bold text-1.3rem text-mid-gray">#</span>
      {{ talk.id }}
    </p>
    <p class="min-h-10 vh pl-10px text-1.13rem mb-0.85rem">{{ talk.text }}</p>
    <p class="flex justify-end">
      <button class="flex mb-0.8rem border-0" @click="like(talk.id)">
        <span
          class="i-mingcute-heart-fill mr-0.2rem text-my-red hover:translate-y--3px transition-50"
          v-if="liked.find((x) => x === talk.id)"
        ></span>
        <span
          class="i-mingcute-heart-line mr-0.2rem text-mid-gray hover:translate-y--3px transition-50 hover:text-my-red op-80"
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
import { useShowUp } from '../logics/showUp'
import { sleep } from '../logics/showUp'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

type Talk = {
  id: number
  text: string
  time: string
  likes: number
}

const projectUrl = 'https://fewodbtarhcyzpqsdzzd.supabase.co'
const projectAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZld29kYnRhcmhjeXpwcXNkenpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMzOTMzMTUsImV4cCI6MjAxODk2OTMxNX0.9WfF0jC5H5h0vaNl6dCeJ5hdmlu4NG0sWfo4X7LPgFU'

const client = createClient(projectUrl, projectAnonKey)
const talks = useStorage<Array<Talk>>('talks', [])
const loading = ref(true)

const getTalks = async () => {
  loading.value = true
  const { data, error } = await client.from('talks').select()
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

const talkContent = ref('')
const submitTalk = async () => {
  const content = talkContent.value
  talkContent.value = ''
  if (talkContent.value.length > 200) {
    alert('Talk过长')
    return
  }
  const { error } = await client.from('talks').insert({
    text: content,
    time: dayjs().format('YYYY / MM / DD')
  })
  if (error != null) {
    alert('Request error')
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
    .from('talks')
    .update({ likes: talks.value.filter((x) => x.id === id)[0].likes })
    .eq('id', id)
  if (error != null) {
    alert('请求错误')
    return
  }
}

const showUp = useShowUp(talks.value.length, 240)

onMounted(() =>
  (async () => {
    await getTalks()
    showUp.setLength(talks.value.length)
    await sleep(120)
    await showUp.translate()
  })()
)

const router = useRouter()

const toWelcomePage = () => {
  router.push('/')
}
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
.sticky {
  background-color: rgba(234, 234, 234, 0.2);
  backdrop-filter: blur(4px);
  border-radius: 8px;
}
.title_ {
  border-width: 0px;
  border-bottom: 2px solid var(--deep-gray);
  padding-bottom: 4px;
}
</style>
