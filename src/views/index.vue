<template>
  <main-menu ref="menu" />
  <el-container>
    <el-aside width="48px">
      <left-menu />
    </el-aside>
    <el-main>
      <top-tabs> <router-view /> </top-tabs>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ipcRenderer } from "electron";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import LeftMenu from "./components/LeftMenu.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import TopTabs from "./components/TopTabs.vue";
import MainMenu from "./components/MainMenu.vue";

const remote = require("@electron/remote");

const router = useRouter();
router.push({ name: "edit" });

const store = useStore();

const menu = ref();

onMounted(() => {
  menu.value.on("new-file", async () => {
    ElMessageBox.prompt("Please input curricula name", "New CAH file", {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    })
      .then(({ value }) => {
        store.commit("openFile", { path: null, name: value });
        ElMessage.success("创建新文件");
      })
      .catch(() => {});
  });

  menu.value.on("open-file", async () => {
    const result = await remote.dialog.showOpenDialog({
      title: "打开文件",
      properties: ["openFile"],
      filters: [{ name: "CAH File", extensions: ["cah"] }],
    });
    console.log(result);
    if (!result.canceled && result.filePaths?.length > 0) {
      store.commit("openFile", { path: result.filePaths[0] });
      ElMessage.success("成功打开文件");
    }
  });

  menu.value.on("save-file", async () => {
    const activeFile = store.state.activeFile;
    if (activeFile.path) {
      activeFile.save();
      ElMessage.success("成功保存文件");
    } else {
      const result = await remote.dialog.showSaveDialog({
        title: "保存",
        properties: ["openFile"],
        filters: [{ name: "CAH File", extensions: ["cah"] }],
        defaultPath: activeFile.curricula.name,
      });
      if (!result.canceled) {
        activeFile.save(result.filePath);
        ElMessage.success("成功保存文件");
      }
      console.log(result);
    }
  });
});
</script>

<style lang="scss" scoped>
.el-main {
  --el-main-padding: 0 !important;
}
</style>