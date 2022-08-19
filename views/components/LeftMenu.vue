<template>
  <nav>
    <el-icon :size="40" color=" #ecf5ff" @click="nav1">
      <Edit />
    </el-icon>
    <el-icon :size="40" color=" #ecf5ff">
      <Calendar />
    </el-icon>
  </nav>
</template>

<script setup lang="ts">
import router from "@/router";
import { Edit, Calendar } from "@element-plus/icons-vue";

function nav1() {
  router.push({ name: "edit" });
}
</script>

<style lang="scss" scoped>
nav {
  background-color: #79bbff;
  position: fixed;
  height: 100%;
  text-align: center;

  .el-icon {
    height: 50px;
  }
}
</style>
