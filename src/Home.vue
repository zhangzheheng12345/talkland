<template>
  <nav class="flex items-center mt-17px p-7px">
    <button
      class="i-mingcute-refresh-2-fill text-1.3rem"
      @click="getTalks"
    ></button>
  </nav>
  <div class="flex justify-center p-15px" v-if="loading">
    <span class="i-mingcute-loading-3-fill animate-spin text-1.2em"></span>
  </div>
  <div class="p-10px mt-28px mb-18px">
    <textarea
      class="w-100% min-h-3.5rem text-center p-10px"
      v-model="talkContent"
    ></textarea>
    <div class="flex justify-center">
      <button
        class="flex items-center mt-7px button pl-10px"
        @click="submitTalk"
      >
        <span>Submit</span>
        <span class="i-mingcute-send-fill ml-6px mr-3px text-1.1rem"></span>
      </button>
    </div>
  </div>
  <div v-for="(talk, index) in talks" class="p-15px">
    <div class="w-100% h-1px bg-gray mt-15px mb-30px"></div>
    <p class="min-h-10 vh pl-10px">{{ talk.text }}</p>
    <p class="text-#888">at {{ talk.time }}</p>
  </div>
  <div class="w-35% h-1px m-auto bg-gray mt-15px mb-30px"></div>
</template>

<script setup lang="ts">
import { createClient } from "@supabase/supabase-js";
import { onMounted, ref } from "vue";
import { useStorage } from "@vueuse/core";
import dayjs from "dayjs";

type Talk = {
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
    alert("Request error");
  }
  talks.value = (data as Talk[]).sort((a, b) =>
    dayjs(a.time, "YYYY / MM /DD").isAfter(dayjs(b.time, "YYYY / MM / DD"))
      ? 1
      : 0
  );
  loading.value = false;
};
onMounted(() => {
  getTalks();
});

const talkContent = ref("");

const submitTalk = async () => {
  if (talkContent.value.length > 200) {
    alert("Your talk is too long");
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
</style>
