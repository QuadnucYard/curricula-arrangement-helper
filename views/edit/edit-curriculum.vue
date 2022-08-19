<template>
  <div class="editor">
    <editor-curriculum-tab :data="curCurriculum" />
  </div>
</template>

<script setup lang="ts">
//const fs = require("@electron/remote").require("fs-extra");
import fs from "electron-fs-extra";
import {
  CourseGroupData,
  parseTJKCRaw,
  parseTYKCRaw,
  parseXGKCRaw,
} from "@/data/curriculum";

import EditorCurriculumTab from "./components/EditorCurriculumTab.vue";

const curCurriculum: CourseGroupData[] = [];
const curName = ref("");

onMounted(() => {
  curCurriculum.push({
    name: "推荐课程",
    data: parseTJKCRaw(fs.readJsonSync("E:/编程/项目/CurriculaVariable/something/raw2_TJKC.json")),
  });
  curCurriculum.push({
    name: "体育课程",
    data: parseTYKCRaw(fs.readJsonSync("E:/编程/项目/CurriculaVariable/something/raw2_TYKC.json")),
  });
  curCurriculum.push({
    name: "通选课程",
    data: parseXGKCRaw(fs.readJsonSync("E:/编程/项目/CurriculaVariable/something/raw_XGKC.json")),
  });
});
</script>

<style lang="scss"></style>
