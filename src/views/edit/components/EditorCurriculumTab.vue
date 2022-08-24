<template>
  <div>
    <div class="options">
      <span>导入课程</span>
      <el-button @click="onOpenInputRaw(true)">追加到当前组</el-button>
      <el-button @click="onOpenInputRaw(false)">创建新组</el-button>
    </div>
  </div>
  <div>
    <el-tabs type="border-card" v-model="activeTab">
      <el-tab-pane v-for="(group, index) in props.data" :name="index" :label="group.name">
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
import { CourseData, CourseGroupData, autoParse } from "@/data/curriculum";
import { ElMessage, ElMessageBox } from "element-plus";
import "@/utils/array-extensions";

const props = defineProps<{ data: CourseGroupData[] }>();
const emit = defineEmits(["update:data"]);

const activeTab = ref(0);

const addTab = (name: string, data: CourseData[] = []) => {
  props.data.push({ name, data });
  activeTab.value = props.data.length - 1;
};

const onOpenInputRaw = async (append: boolean) => {
  ElMessageBox.prompt(`输入课程JSON`, "导入课程", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    inputType: "textarea",
  })
    .then(async ({ value }) => {
      try {
        const parsedData = autoParse(JSON.parse(value));
        if (!append) {
          try {
            const { value } = await ElMessageBox.prompt(`输入分组名称`, "", {
              confirmButtonText: "OK",
              cancelButtonText: "Cancel",
            });
            addTab(value, parsedData);
          } catch {}
        } else {
          props.data[activeTab.value].data.addRange(parsedData);
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

<style lang="scss" scoped>
.options {
  border: 2px solid #79bbff;
  border-radius: 10px;
  padding: 5px;
  margin: 0.5em;

  span {
    margin-right: 1em;
  }
}
</style>