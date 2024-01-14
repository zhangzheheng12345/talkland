<template>
  <nav class="flex items-center mt-17px p-7px">
    <button
      class="i-mingcute-refresh-2-fill text-1.3rem"
      v-if="!loading"
      @click="getTalks"
    ></button>
    <span
      class="i-mingcute-loading-3-fill animate-spin text-1.3rem"
      v-if="loading"
    ></span>
  </nav>
  <div class="p-10px mt-12px mb-8px relative block sticky top-15px">
    <textarea
      class="w-100% min-h-3.5rem p-10px pl-13px pr-13px"
      v-model="talkContent"
    ></textarea>
    <div class="text-#555 absolute left-23px top-20px border-box reminding">
      写点什么...
    </div>
    <div class="flex justify-center">
      <button class="items-center button pl-10px mt-7px" @click="submitTalk">
        <span>完成</span>
        <span class="i-mingcute-send-fill ml-6px mr-3px text-1.1rem"></span>
      </button>
    </div>
  </div>
  <div
    v-for="(talk, index) in talks"
    class="p-15px mt-4.5rem mb-4.5rem transition-460"
    :style="{
      opacity: showUp.opacities.value[index],
      transform: `translate(0px, ${showUp.translations.value[index]})`,
    }"
  >
    <p class="min-h-10 vh pl-10px text-1.13rem mb-0.85rem">{{ talk.text }}</p>
    <p class="text-#888 float-right">{{ talk.time }}</p>
  </div>
</template>

<script setup lang="ts">
import { createClient } from "@supabase/supabase-js";
import { onMounted, ref } from "vue";
import { useStorage } from "@vueuse/core";
import { useShowUp } from "./showUp";
import { sleep } from "./showUp";
import dayjs from "dayjs";

type Talk = {
  id: number;
  text: string;
  time: string;
};

const projectUrl = "https://fewodbtarhcyzpqsdzzd.supabase.co";
const projectAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZld29kYnRhcmhjeXpwcXNkenpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMzOTMzMTUsImV4cCI6MjAxODk2OTMxNX0.9WfF0jC5H5h0vaNl6dCeJ5hdmlu4NG0sWfo4X7LPgFU";

const client = createClient(projectUrl, projectAnonKey);
const talks = useStorage<Array<Talk>>("talks", []);
const loading = ref(true);

const getTalks = async () => {
  loading.value = true;
  const { data, error } = await client.from("talks").select();
  if (error != null) {
    alert("请求错误");
  }
  talks.value = data as Talk[];
  talks.value.sort((a, b) =>
    dayjs(a.time, "YYYY / MM / DD").isBefore(dayjs(b.time, "YYYY / MM / DD"))
      ? 1
      : -1
  );
  loading.value = false;
};

let showUp = useShowUp(talks.value.length, 280);

onMounted(() =>
  (async () => {
    await getTalks();
    await sleep(120);
    await showUp.translate();
  })()
);

const talkContent = ref("");

const submitTalk = async () => {
  if (talkContent.value.length > 200) {
    alert("Talk过长");
    return;
  }
  if (talkContent.value.length === 0) {
    alert("内容不能为空");
    return;
  }
  const { error } = await client.from("talks").insert({
    text: talkContent.value,
    time: dayjs().format("YYYY / MM / DD"),
  });
  if (error != null) {
    alert("Request error");
    return;
  }
  getTalks();
};
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
  background-color: rgba(5, 5, 5, 0.3);
  backdrop-filter: blur(8px);
  border-radius: 5px;
}
</style>
