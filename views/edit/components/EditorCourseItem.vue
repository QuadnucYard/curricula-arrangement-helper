<template>
  <el-card class="course-item"  @mouseenter="showOptions = true" @mouseleave="showOptions = false">
    <template #header>
      <div class="header">
        <div v-if="!editing" style="display: inline-block">
          <span>{{ props.data.cid }}</span>
          <span>{{ props.data.name }}</span>
          <span>{{ props.data.college }}</span>
          <span>{{ props.data.nature }}</span>
          <span>{{ props.data.credit }}学分</span>
          <span>{{ props.data.hours }}学时</span>
        </div>
        <div v-else style="display: inline-block">
          <!-- <input  v-model="editingData.no" style="width: 3em"/>
 <input  v-model="editingData.teacher" style="width: 6em"/>
 <input  v-model="editingData.teachingPlace" style="width: 30em"/> -->
        </div>

        <div style="float: right"  v-if="showOptions">
          <el-button
            type="success"
            :icon="Plus"
            @click="onAddItem"
            size="small"
            class="opt-button"
          />
          <el-button
            type="primary"
            :icon="Edit"
            @click="onEditSelf"
            size="small"
            class="opt-button"
          />
          <el-button
            type="danger"
            :icon="Delete"
            @click="onDeleteSelf"
            size="small"
            class="opt-button"
          />
        </div>
      </div>
    </template>
    <div :key="refreshkey">
      <editor-class-item
        v-for="tc in props.data.tcList"
        :key="tc.no"
        :data="tc"
        @delete="onDeleteItem(tc)"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { Delete, Edit, Plus } from "@element-plus/icons-vue";
import { ClassData, CourseData, toClassData } from "@/data/curriculum";
import EditorClassItem from "./EditorClassItem.vue";

const props = defineProps<{ data: CourseData }>();

const showOptions = ref(false);
const editing = ref(false);
const refreshkey = ref(0);

const refresh = () => refreshkey.value++;;

const onEditSelf = () => {};

const onAddItem = () => {
  props.data.tcList.push(toClassData(props.data));
  refresh();
};

const onDeleteSelf = () => {};

const onDeleteItem = (tc: ClassData) => {
  console.log("del");
  props.data.tcList.splice(props.data.tcList.indexOf(tc), 1);
  refresh();
};
</script>

<style lang="scss">
.editor {
  .el-card {
    --el-card-padding: 0.8em;
  }

  .course-item {
    margin: 0.5em;

    span {
      margin-right: 1em;
    }
  }

  .opt-button {
    padding: 4px;
  }

  .el-button {
    margin: 0 2px;
  }
}
</style>
