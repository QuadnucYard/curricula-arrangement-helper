<template>
  <el-card class="course-item" @mouseenter="showOptions = true" @mouseleave="showOptions = false">
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
          <input v-model="editingData.cid" style="width: 5em" />
          <input v-model="editingData.name" style="width: 12em" />
          <input v-model="editingData.college" style="width: 12em" />
          <input v-model="editingData.nature" style="width: 3em" />
          <input v-model="editingData.credit" style="width: 3em" />学分
          <input v-model="editingData.hours" style="width: 3em" />学时
        </div>

        <div style="float: right" v-if="showOptions">
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
        :ref="setItemRef"
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
const emit = defineEmits(["delete"]);

const showOptions = ref(false);
const editing = ref(false);
const editingData = reactive({
  cid: "",
  name: "",
  college: "",
  nature: "",
  credit: 0,
  hours: 0,
});
const refreshkey = ref(0);

const itemRefs = ref<any[]>([]);

const setItemRef = (el: any) => {
  if (el) {
    itemRefs.value.push(el);
  }
};
onBeforeUpdate(() => {
  console.log("before");
  itemRefs.value = [];
});
onUpdated(() => {
  console.log("updated", itemRefs.value);
});

const refresh = () => refreshkey.value++;

const onEditSelf = () => {
  editing.value = !editing.value;
  if (editing.value) {
    Object.assign(editingData, props.data);
  } else {
    Object.assign(props.data, editingData);
    for (const item of props.data.tcList) {
      Object.assign(item, editingData);
    }
  }
};

const onAddItem = () => {
  props.data.tcList.push(toClassData(props.data));
  refresh();
  console.log(itemRefs.value);
};

const onDeleteSelf = () => {
  emit("delete");
};

const onDeleteItem = (tc: ClassData) => {
  props.data.tcList.splice(props.data.tcList.indexOf(tc), 1);
  refresh();
};
</script>

<style lang="scss">
.editor {
  .el-card {
    --el-card-padding: 0.5em;
  }

  .course-item {
    margin: 0.2em;

    span:not(:first-child) {
      margin-left: 1em;
    }

    input:not(:first-child) {
      margin-left: 1em;
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
