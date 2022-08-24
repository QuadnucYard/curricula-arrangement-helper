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
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import LeftMenu from "./components/LeftMenu.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import TopTabs from "./components/TopTabs.vue";
import MainMenu from "./components/MainMenu.vue";
import { dialog } from "@tauri-apps/api";

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
    const selected = (await dialog.open({
      multiple: false,
      filters: [{ name: "CAH File", extensions: ["cah"] }],
    })) as [string | null];
    console.log(selected);
    if (selected != null) {
      store.commit("openFile", { path: selected });
      ElMessage.success("成功打开文件");
    }
  });

  menu.value.on("save-file", async () => {
    const activeFile = store.state.activeFile;
    if (activeFile.path) {
      activeFile.save();
      ElMessage.success("成功保存文件");
    } else {
      const filePath = await dialog.save({
        filters: [{ name: "CAH File", extensions: ["cah"] }],
      });
      if (filePath != null) {
        activeFile.save(filePath);
        ElMessage.success("成功保存文件");
      }
    }
  });
});
</script>

<style lang="scss" scoped>
.el-main {
  --el-main-padding: 0 !important;
}
</style>