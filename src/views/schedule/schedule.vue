<template>
  <div>
    <my-selection :src="file.curricula.data" :scheduler="scheduler" />
  </div>
</template>

<script setup lang="ts">
import { CAHFile } from "@/data/cah-file";
import { TeachingPlaceInfo } from "@/data/course-info";
import { Scheduler } from "@/data/schedule";
import { useStore } from "vuex";
import MySelection from "./components/MySelection.vue";

const store = useStore();

const file = computed(() => store.state.activeFile as CAHFile);

const scheduler = new Scheduler();
scheduler.create(file.value.curricula.data.flatMap(t => t.data));
</script>

<style lang="scss"></style>