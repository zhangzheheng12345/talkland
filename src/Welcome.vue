<template>
  <div class="flex flex-col items-center">
    <h1 class="m-1.5rem text-3rem mb-30vh">Talkland</h1>
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
import { useRouter } from "vue-router";

const router = useRouter();

const skipToHome = () => {
  router.push("/home");
};
</script>
<style scoped>
button:hover .i-mingcute-right-fill {
  transform: translate(5px, 0);
}
</style>
