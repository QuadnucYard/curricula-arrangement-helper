<template>
  <nav>
    <left-menu-button
      v-for="(item, index) in items"
      :selected="index == activeIndex"
      @click="onClick(index)"
    >
      <component :is="item.icon" />
    </left-menu-button>
  </nav>
</template>

<script setup lang="ts">
import router from "@/router";
import LeftMenuButton from "./LeftMenuButton.vue";

const items = reactive([
  {
    routeName: "edit",
    icon: "Edit",
  },
  {
    routeName: "schedule",
    icon: "Calendar",
  },
]);

const activeIndex = ref(0);

function onClick(index: number) {
  console.log(index);
  if (index != activeIndex.value) {
    activeIndex.value = index;
    router.push({ name: items[index].routeName });
  }
}
</script>

<style lang="scss" scoped>
nav {
  background-color: #79bbff;
  position: fixed;
  height: 100%;
  text-align: center;
}
</style>