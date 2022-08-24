<template>
  <el-menu class="main-menu" mode="horizontal" menu-trigger="click" @select="handleSelect">
    <el-sub-menu index="file" class="main-menu-sub" :popper-offset="0">
      <template #title>File</template>
      <el-menu-item index="new-file">New</el-menu-item>
      <el-menu-item index="open-file">Open</el-menu-item>
      <el-menu-item index="save-file">Save</el-menu-item>
      <el-menu-item index="save-file-as">Save As</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
type Action = () => void;
interface CallbackEntry {
  [key: string]: Action;
}

const callbacks: CallbackEntry = {};

const on = (action: string, callback: Action) => {
  callbacks[action] = callback;
};

const handleSelect = (key: string, keyPath: string[]) => {
  callbacks[key]?.call(null);
};

defineExpose({ on });
</script>

<style lang="scss" scoped>
.main-menu {
  --el-menu-item-height: 20px;
  --el-menu-item-font-size: small;
}

.el-sub-menu {
  --active-color: var(--text-color);
}

.el-menu-item {
  --el-menu-item-font-size: small;
  --el-menu-horizontal-sub-item-height: 24px;
  --el-menu-active-color: var(--el-menu-text-color);
}

.el-sub-menu__title {
  border: none;
}
</style>
