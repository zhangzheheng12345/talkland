<template>
  <div class="flex flex-col items-center">
    <h1 class="m-1.2rem mt-2rem text-3rem text-center">Talkland</h1>
    <p class="m-1.5rem text-1.2rem mb-25vh h-3rem text-center text-#555">
      {{ typer }}
    </p>
    <button
      @click="skipToHome"
      class="flex items-center button p-5px pl-8px pr-6px"
    >
      <span class="text-1.3rem font-bold">Enter</span>
      <span class="text-1.3rem i-mingcute-right-fill transition-160"></span>
    </button>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const words = ["Say something.", "Wander.", "Alley.", "Seventh Avenue."];

const sleep = async (delay: number) => {
  return new Promise((resolve, reject) => setTimeout(resolve, delay));
};

const typer = ref("");

const typeWords = async () => {
  let i = 0;
  const typeWord = async () => {
    for (let j = 0; j <= words[i].length; j++) {
      typer.value = words[i].slice(0, j);
      await sleep(120);
    }
  };
  while (true) {
    await typeWord();
    await sleep(750);
    i++;
    if (i === words.length) i = 0;
  }
};

onMounted(typeWords);

const skipToHome = () => {
  router.push("/home");
};
</script>
<style scoped>
button:hover .i-mingcute-right-fill {
  transform: translate(5px, 0);
}
</style>
