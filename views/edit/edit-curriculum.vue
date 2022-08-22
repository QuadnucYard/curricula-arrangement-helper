<template>
  <div class="editor" v-if="store.state.activeFile">
    <editor-curriculum-tab
      :data="store.state.activeFile.curricula.data"
      @update:data="store.state.activeFile.curricula.data = $event"
    />
  </div>
</template>

<script setup lang="ts">
import EditorCurriculumTab from "./components/EditorCurriculumTab.vue";

import { useStore } from "vuex";
const store = useStore();
</script>

<style lang="scss"></style>