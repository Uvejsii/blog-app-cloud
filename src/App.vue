<script setup>
import {Toast} from "primevue";
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { RouterView } from 'vue-router'
import Popups from "@/components/popups/Popups.vue";
</script>

<template>
  <Popups>
    <VueQueryDevtools />
    <Toast />
    <RouterView />
  </Popups>
</template>

<style scoped>
</style>
