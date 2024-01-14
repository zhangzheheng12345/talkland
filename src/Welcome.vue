<template>
  <div class="flex flex-col items-center">
    <h1
      class="m-1.2rem mt-2rem text-3rem text-center transition-460"
      :style="{
        opacity: showUp.opacities.value[0],
        transform: `translate(0px, ${showUp.translations.value[1]}px)`,
      }"
    >
      Talkland
    </h1>
    <p class="m-1.5rem text-1.2rem mb-25vh h-3rem text-center text-#555">
      {{ typer }}
    </p>
    <button
      @click="skipToHome"
      class="flex items-center button p-5px pl-8px pr-6px transition-140"
      :style="{
        opacity: showUp.opacities.value[1],
        transform: `translate(0px, ${showUp.translations.value[1]}px)`,
      }"
    >
      <span class="text-1.3rem font-bold pl-7px">进入</span>
      <span
        class="text-1.3rem i-mingcute-arrows-right-fill ml-4px mr-4px transition-160"
      ></span>
    </button>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { sleep, useShowUp } from "./showUp";

const router = useRouter();

const words = [
  "Say something...",
  "Wander.",
  "In an alley.",
  "Seventh Avenue.",
];

const typer = ref("");

const typeWords = async () => {
  await sleep(500);
  let i = 0;
  const typeWord = async () => {
    for (let j = 0; j <= words[i].length; j++) {
      typer.value = words[i].slice(0, j);
      await sleep(120);
    }
    await sleep(750);
    for (let j = words[i].length; j >= 0; j--) {
      typer.value = words[i].slice(0, j);
      await sleep(35);
    }
    await sleep(750);
  };
  while (true) {
    await typeWord();
    i++;
    if (i === words.length) i = 0;
  }
};

onMounted(typeWords);

const skipToHome = () => {
  router.push("/home");
};

const showUp = useShowUp(2, 360);
onMounted(() => showUp.translate());
</script>
<style scoped>
button:hover .i-mingcute-arrows-right-fill {
  transform: translate(5px, 0);
}
</style>
