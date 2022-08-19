<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane v-for="group in props.data" :label="group.name">
        <editor-course-group :data="group.data" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import EditorCourseGroup from "./EditorCourseGroup.vue";
import { CourseGroupData } from "@/data/curriculum";

const props = defineProps<{ data: CourseGroupData[] }>();
</script>

<style lang="scss"></style>
