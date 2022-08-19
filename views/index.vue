<template>
  <left-menu style="width: 3.7em; float: left" />
  <div style="margin-left: 3.7em">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import LeftMenu from "./components/LeftMenu.vue";

router.push({ name: "edit" });
</script>

<style lang="scss"></style>
