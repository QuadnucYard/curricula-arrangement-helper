<template>
  <div :class="selected ? 'menu-button selected' : 'menu-button'">
    <el-icon :size="30">
      <slot style="margin: auto"></slot>
    </el-icon>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ selected?: boolean }>(), { selected: false });
</script>

<style lang="scss" scoped>
.menu-button {
  //width: 48px;
  //height: 48px;
  padding: 6px 8px;
  text-align: center;
  //line-height: 48px;
  cursor: pointer;
  border-left: 2px solid #00000000;
  border-right: 2px solid #00000000;

  &:hover .el-icon {
    --color: white;
  }

  .el-icon {
    --color: #ecf5ff;
  }
}

.menu-button.selected {
  border-left: 2px solid white;

  .el-icon {
    --color: white;
  }
}
</style>
