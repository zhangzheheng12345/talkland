<template>
  <div :style="`margin: auto; max-width: ${settings.maxContentWidth}px;`">
    <div class="p-15px"><router-view></router-view></div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSettings } from './logics/settings'

const settings = useSettings()
</script>
