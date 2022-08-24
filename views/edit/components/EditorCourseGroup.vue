<template>
  <div :key="refreshkey">
    <editor-course-item
      v-for="(item, index) in pageData"
      :key="item.cid"
      :data="pageData[index]"
      @update:data="pageData[index] = $event"
      @delete="onDeleteItem(item)"
    />
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
import "@/utils/array-extensions";
import EditorCourseItem from "./EditorCourseItem.vue";

const props = defineProps<{ data: CourseData[] }>();
const emit = defineEmits(["change", "update:data"]);

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
  pageData.value.removeOne(cd);
  props.data.removeOne(cd);
  emit("update:data", props.data);
};
</script>

<style lang="scss"></style>