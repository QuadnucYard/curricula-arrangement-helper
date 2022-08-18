<template>
  <div>
    <h1>edit</h1>
    <div style="text-align: left">
      <div v-for="group in curCurriculum">
        <div>{{ group.name }}</div>
        <div>
          <el-card v-for="item in group.data">
            <template #header>
              <div>
                <span>{{ item.cid }}</span>
                <span>{{ item.name }}</span>
                <span>{{ item.college }}</span>
                <span>{{ item.nature }}</span>
                <span>{{ item.credit }}学分</span>
                <span>{{ item.hours }}学时</span>
              </div>
            </template>
            <div>
              <div v-for="tc in item.tcList">
                <span>{{ tc.no }}</span>
                <span>{{ tc.teacher }}</span>
                <span>{{ tc.teachingPlace }}</span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//const fs = require("@electron/remote").require("fs-extra");
import fs from "electron-fs-extra";
import { CourseData, parseTJKCRaw } from "@/data/curriculum";

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
