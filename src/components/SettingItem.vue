<template>
  <li
    class="flex items-center my-1.4rem transition-400"
    :style="{
      opacity: props.showUp.opacities.value[props.index],
      transform: `translate(0px, ${props.showUp.translations.value[props.index]}px)`
    }"
  >
    <slot></slot>
  </li>
</template>
<script setup lang="ts">
import { useShowUp } from '@/logics/showUp'

const props = defineProps<{
  showUp: ReturnType<typeof useShowUp>
  index: number
}>()
</script>

<style>
li > span {
  font-size: 1.1rem;
}
</style>
