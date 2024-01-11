<template>
  <div class="flex flex-col items-center">
    <h1 class="m-1.5rem text-3rem mb-30vh">Talkland</h1>
    <router-link to="/home">
      <span class="text-1.3rem font-bold button">Enter</span>
    </router-link>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
<style scoped>
.i-tabler-chevrons-right:hover {
  transform: translate(5px, 0);
}
</style>
