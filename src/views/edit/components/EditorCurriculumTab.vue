<template>
  <div>
    <div style="border: 2px solid #79bbff; border-radius: 10px; padding: 5px; margin: 0.5em">
      <span>导入课程</span>
      <el-button @click="onOpenInputRaw(1)">推荐课程</el-button>
      <el-button @click="onOpenInputRaw(2)">体育课程</el-button>
      <el-button @click="onOpenInputRaw(3)">通选课</el-button>
    </div>
  </div>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane v-for="(group, index) in props.data" :label="group.name">
        <editor-course-group
          :data="props.data[index].data"
          @change="onChange"
          @update:data="props.data[index].data = $event"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import EditorCourseGroup from "./EditorCourseGroup.vue";
import {
  CourseData,
  CourseGroupData,
  parseTJKCRaw,
  parseTYKCRaw,
  parseXGKCRaw,
} from "@/data/curriculum";
import { ElMessage, ElMessageBox } from "element-plus";

const props = defineProps<{ data: CourseGroupData[] }>();
const emit = defineEmits(["update:data"]);

const addTab = (name: string, data: CourseData[] = []) => {
  props.data.push({ name, data });
};

const onOpenInputRaw = (type: number) => {
  ElMessageBox.prompt(`输入${["推荐", "体育", "通选"][type - 1]}课程JSON`, "导入课程", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    inputType: "textarea",
  })
    .then(({ value }) => {
      try {
        switch (type) {
          case 1:
            addTab("推荐课程", parseTJKCRaw(JSON.parse(value)));
            break;
          case 2:
            addTab("体育课程", parseTYKCRaw(JSON.parse(value)));
            break;
          case 3:
            addTab("通选课", parseXGKCRaw(JSON.parse(value)));
            break;
        }
      } catch (e) {
        ElMessage.error("Fail to parse JSON text.\n" + e);
      }
    })
    .catch(() => {});
};

const onChange = () => {
  console.log(props.data[0].data);
  emit("update:data", props.data);
};
</script>

<style lang="scss"></style>