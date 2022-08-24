<template>
  <template v-if="data">
    <td :rowspan="rowspan ?? (data as ClassSession).span" :class="{ 'align-top': isArray(data) }">
      <div
        v-for="item in isArray(data) ? data : [data]"
        class="section-label"
        :style="{
          'background-color': `hsl(${hue(item)}, 80%, 90%)`,
          'border-color': `hsl(${hue(item)}, 50%, 80%)`,
        }"
      >
        <p>{{ item.data.name }}-{{ item.data.no }}</p>
        <p>{{ item.raw[0] }}</p>
        <p>{{ item.raw[1] }} {{ item.raw[2] }}</p>
        <p>{{ item.raw[3] ?? "未安排教室" }}</p>
        <p>{{ item.data.teacher ?? "未指定教师" }}</p>
      </div>
    </td>
  </template>
</template>

<script setup lang="ts">
import { ClassSession } from "@/data/course-info";
import { isArray } from "lodash";

const props = defineProps<{ data: ClassSession | ClassSession[] | null; rowspan?: number }>();

const getHashCode = (str: string) => {
  let hash = 1315423911;
  for (let i = str.length - 1; i >= 0; i--) {
    hash ^= (hash << 5) + str.charCodeAt(i) + (hash >> 2);
  }
  return hash & 0x7fffffff;
};

const hue = (cs: ClassSession) => getHashCode(cs.data.cid) % 360;
</script>

<style lang="scss" scoped>
.align-top {
  vertical-align: top;
}

.section-label {
  border: 2px solid;
  border-radius: 8px;
  font-size: 0.8em;
  padding: 2px;
  margin: 2px;

  p {
    margin: 0;
    text-align: center;
  }
}
</style>
