<template>
  <div>
    <editor-course-item v-for="item in props.data" :data="item" />
  </div>
</template>

<script setup lang="ts">
import { CourseData } from "@/data/curriculum";
import EditorCourseItem from "./EditorCourseItem.vue";

const props = defineProps<{ data: CourseData[] }>();
</script>

<style lang="scss"></style>
