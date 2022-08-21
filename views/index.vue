<template>
  <left-menu style="width: 3.7em; float: left" />
  <div style="margin-left: 3.7em">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from "electron";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import LeftMenu from "./components/LeftMenu.vue";
import { ElMessage } from "element-plus";
//import remote from "@electron/remote";
const remote = require("@electron/remote");

const router = useRouter();
router.push({ name: "edit" });

const store = useStore();

ipcRenderer.on("new-file", async e => {
  console.log(remote);
  store.commit("createFile", { path: null });
    ElMessage.success("创建新文件");
});

ipcRenderer.on("open-file", async e => {
  const result = await remote.dialog.showOpenDialog({
    title: "打开文件",
    properties: ["openFile"],
    filters: [{ name: "CAH File", extensions: ["cah"] }],
  });
  console.log(result);
  if (!result.canceled && result.filePaths?.length > 0) {
    store.commit("createFile", { path: result.filePaths[0] });
    ElMessage.success("成功打开文件");
  }
});

ipcRenderer.on("save-file", async e => {
  const activeFile = store.state.activeFile;
  if (activeFile.path) {
    activeFile.save();
    ElMessage.success("成功保存文件");
  } else {
    const result = await remote.dialog.showSaveDialog({
      title: "保存",
      properties: ["openFile"],
      filters: [{ name: "CAH File", extensions: ["cah"] }],
    });
    if (!result.canceled) {
      activeFile.save(result.filePath);
      ElMessage.success("成功保存文件");
    }
    console.log(result);
  }
});
</script>

<style lang="scss"></style>
