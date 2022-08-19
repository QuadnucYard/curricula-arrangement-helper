<template>
  <div :key="refreshkey">
    <editor-course-item v-for="item in pageData" :data="item" @delete="onDeleteItem(item)" />
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="props.data.length"
      @size-change="refreshPage"
      @current-change="refreshPage"
    />
  </div>
</template>

<script setup lang="ts">
import { CourseData } from "@/data/curriculum";
import EditorCourseItem from "./EditorCourseItem.vue";

const props = defineProps<{ data: CourseData[] }>();

const currentPage = ref(1);
const pageSize = ref(20);
const pageData = ref<CourseData[]>([]);
const refreshkey = ref(0);

const refreshPage = () => {
  console.log("refresh");
  pageData.value = props.data.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
};

refreshPage();

const onDeleteItem = (cd: CourseData) => {
  console.log("del item",cd);
  props.data.splice(props.data.indexOf(cd), 1);
  pageData.value.splice(pageData.value.indexOf(cd), 1);
  refreshkey.value++;
};
</script>

<style lang="scss"></style>
