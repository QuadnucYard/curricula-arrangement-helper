<template>
  <div>
    <h1>index</h1>
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';

router.push({ name: "edit" })
</script>

<style lang="scss">
  
</style>