<template>
  <div style="margin: auto">
    <div class="title-block">
      <div class="center-block">
        <div>{{ showTypeWeek ? "周课程表" : "学期课程表" }}</div>
        <div v-if="showTypeWeek">
          <el-button :icon="ArrowLeftBold" circle size="small" />
          <span>
            第 <b style="width: 1.2em">{{ week }}</b> 周
          </span>
          <el-button :icon="ArrowRightBold" circle size="small" />
        </div>
      </div>
      <div class="side-switch">
        <el-switch
          v-model="showTypeWeek"
          inline-prompt
          active-text="周课表"
          inactive-text="学期课表"
          width="6em"
        />
      </div>
    </div>
    <table class="pure-table pure-table-bordered timetable">
      <tr>
        <th>节次/星期</th>
        <th>星期一</th>
        <th>星期二</th>
        <th>星期三</th>
        <th>星期四</th>
        <th>星期五</th>
        <th>星期六</th>
        <th>星期日</th>
      </tr>
      <tr v-for="i in _.range(13)">
        <td>{{ i + 1 }}</td>
        <template v-for="j in _.range(7)">
          <template v-if="showType == 'week'">
            <td v-if="shouldShowAsEmpty(i, j)"></td>
            <my-schedule-cell v-else :data="getShow(i, j) ?? null" />
          </template>
          <template v-else>
            <my-schedule-cell :data="getShow(i, j) ?? null" :rowspan="i < 10 ? 5 : 3" />
          </template>
        </template>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftBold, ArrowRightBold } from "@element-plus/icons-vue";
import { TeachingPlaceInfo } from "@/data/course-info";
import { ClassData } from "@/data/curriculum";
import MyScheduleCell from "./MyScheduleCell.vue";
import _ from "lodash";
import { Scheduler } from "@/data/schedule";

const props = defineProps<{ scheduler: Scheduler }>();

const showTypeWeek = ref(false);
const showType = computed(() => (showTypeWeek ? "semester" : "week"));
const week = ref(0);

const selectedTpi = computed(() =>
  props.scheduler.selected.map(t => TeachingPlaceInfo.get(props.scheduler.state.get(t)!.item))
);

const shouldShowAsEmpty = (row: number, col: number) => {
  return !selectedTpi.value.some(t =>
    t.sessions.some(u => u.week == week.value && u.day == col && u.contains(row))
  );
};

// 用于周课表
const getShow = (row: number, col: number) => {
  if (showType.value == "semester") {
    if (row % 5 != 0) return undefined;
    return _.chain(selectedTpi.value)
      .map(t =>
        t.sessions.find(u => u.day == col && Math.floor(u.tStart / 5) == Math.floor(row / 5))
      )
      .compact()
      .sortBy(t => t!.sortingOrder)
      .value();
  } else {
    return selectedTpi.value
      .flatMap(t => t.sessions)
      .find(u => u.week == week.value && u.day == col && u.tStart == row);
  }
};
</script>

<style lang="scss">
.title-block {
  background-color: #edf0e5;
  padding-top: 10px;
  user-select: none;

  --blue: #2196f3;
  --blue-dark: #1486e4;
  --blue-light: #409eff;

  .center-block {
    margin: 0px auto;
    padding-bottom: 10px;
    text-align: center;
    height: 3.5em;

    div:nth-child(1) {
      margin-bottom: 0.5em;
      color: var(--blue-dark);
      font-size: large;
    }
    div:nth-child(2) {
      color: var(--blue);
      .el-button {
        border-color: var(--blue);
        --color: var(--blue);
      }
    }
  }
  .side-switch {
    position: absolute;
    right: 2em;
    top: 2em;
    display: block;

    .el-switch {
      --el-switch-on-color: var(--blue-light);
      --el-switch-off-color: var(--blue-light);
    }
  }
}

.pure-table-bordered {
  border-collapse: collapse;
  td,
  th {
    border: 1px solid #4a90d6;
  }
}

.pure-table {
  td,
  th {
    font-size: inherit;
    margin: 0;
    overflow: visible;
  }
}

.timetable {
  background: #f3f7ec77;
  text-align: center;
  th {
    width: 3em;
  }
  tr {
    height: 3.5em;
  }
  td:not(:nth-child(1)) {
    width: 8em;
  }
}
</style>