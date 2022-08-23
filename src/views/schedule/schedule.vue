<template>
  <div>
    <my-schedule class="my-schedule" :scheduler="scheduler" />
    <my-selection class="my-selection" :src="file.curricula.data" :scheduler="scheduler" />
  </div>
</template>

<script setup lang="ts">
import { CAHFile } from "@/data/cah-file";
import { TeachingPlaceInfo } from "@/data/course-info";
import { Scheduler } from "@/data/schedule";
import { useStore } from "vuex";
import MySelection from "./components/MySelection.vue";
import MySchedule from "./components/MySchedule.vue";

const store = useStore();

const file = computed(() => store.state.activeFile as CAHFile);

const scheduler = reactive(new Scheduler());
scheduler.create(file.value.curricula.data.flatMap(t => t.data));
</script>

<style lang="scss">
@media (min-width: 1200px) {
  .my-schedule {
    float: left;
    max-width: 800px;
  }

  .my-selection {
    float: left;
    max-width: calc(100% - 800px);
  }
}
</style>