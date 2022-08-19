<template>
  <div class="editor">
    <h1>edit</h1>
    <div style="text-align: left">
      <div v-for="group in curCurriculum">
        <div>{{ group.name }}</div>
        <editor-course-group :data="group.data" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//const fs = require("@electron/remote").require("fs-extra");
import fs from "electron-fs-extra";
import { CourseData, parseTJKCRaw } from "@/data/curriculum";
import EditorCourseGroup from "./components/EditorCourseGroup.vue";

const curCurriculum: { name: string; data: CourseData[] }[] = [
  {
    name: "test",
    data: [],
  },
];

onMounted(() => {
  curCurriculum[0].data = parseTJKCRaw(
    fs.readJsonSync("E:/编程/项目/CurriculaVariable/something/raw2_TJKC.json")
  );
  console.log(curCurriculum);
});
</script>

<style lang="scss"></style>
