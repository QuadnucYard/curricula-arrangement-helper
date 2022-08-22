<template>
  <el-tabs
    v-model="activeTabName"
    type="border-card"
    closable
    @tab-change="onTabChange"
    @tab-remove="onTabRemove"
  >
    <el-tab-pane
      v-for="item in store.state.openFiles"
      :key="item.identifier"
      :name="item.identifier"
      :label="item.curricula.name || '[Unnamed]'"
    >
      <slot></slot>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { CAHFile } from "@/data/cah-file";
import { TabPanelName } from "element-plus";
import { useStore } from "vuex";
import "@/utils/array-extensions";

const store = useStore();

const activeTabName = ref("");

const onTabChange = (name: TabPanelName) => {
  store.state.activeFile = store.state.openFiles.find((t: CAHFile) => t.identifier === name);
  return true;
};
const onTabRemove = (name: TabPanelName) => {
  const openFiles: CAHFile[] = store.state.openFiles;
  const index = openFiles.findIndex(t => t.identifier === name);
  openFiles.removeAt(index);
  store.state.activeFile = openFiles.length > 0 ? openFiles[index] : null;
  store.state.openFiles = openFiles;
};

watch(
  () => store.state.activeFile,
  (value, oldValue) => {
    if (value) activeTabName.value = value.identifier;
  }
);
</script>

<style lang="scss"></style>