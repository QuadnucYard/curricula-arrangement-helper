<template>
  <div class="editor" v-if="store.state.activeFile">
    <editor-curriculum-tab :data="store.state.activeFile.curricula" />
  </div>
</template>

<script setup lang="ts">
//const fs = require("@electron/remote").require("fs-extra");
import fs from "electron-fs-extra";
import { CourseGroupData, parseTJKCRaw, parseTYKCRaw, parseXGKCRaw } from "@/data/curriculum";

import EditorCurriculumTab from "./components/EditorCurriculumTab.vue";
import { CAHFile } from "@/data/cah-file";

const curCurriculum: CourseGroupData[] = [];
const curName = ref("");

import { useStore } from "vuex";
const store = useStore();
</script>

<style lang="scss"></style>
