<template>
  <div class="class-item" @mouseenter="showOptions = true" @mouseleave="showOptions = false">
    <div v-if="!editing" style="display: inline-block; margin-right: 4em">
      <span>{{ props.data.no }}</span>
      <span>{{ props.data.teacher }}</span>
      <span>{{ props.data.teachingPlace }}</span>
    </div>
    <div v-else style="display: inline-block">
      <input v-model="editingData.no" style="width: 3em" />
      <input v-model="editingData.teacher" style="width: 6em" />
      <input v-model="editingData.teachingPlace" style="width: 30em" />
      <!-- <el-row style="width:100%">
        <el-col :span="2"> <el-input v-model="editingData.no"/></el-col>
        <el-col :span="4"> <el-input v-model="editingData.teacher" /> </el-col>
        <el-col :span="18"> <el-input v-model="editingData.teachingPlace" /> </el-col>
      </el-row> -->
    </div>
    <div style="float: right" v-if="showOptions">
      <el-button type="primary" :icon="Edit" @click="onEditSelf" size="small" class="opt-button" />
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

<script setup lang="ts">
import { Delete, Edit } from "@element-plus/icons-vue";
import { ClassData } from "@/data/curriculum";

const props = defineProps<{ data: ClassData }>();
const emit = defineEmits(["delete"]);

const showOptions = ref(false);
const editing = ref(false);
const editingData = reactive({
  no: 0,
  teacher: "",
  teachingPlace: "",
});

const onEditSelf = () => {
  editing.value = !editing.value;
  if (editing.value) {
    Object.assign(editingData, props.data);
  } else {
    Object.assign(props.data, editingData);
  }
};

const onDeleteSelf = () => {
  emit("delete");
};
</script>

<style lang="scss">
.editor .class-item {
  margin-top: 0.3em;
  margin-bottom: 0.3em;

  .el-input__inner {
    width: 4em;
  }
}
</style>
