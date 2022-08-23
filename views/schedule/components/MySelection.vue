<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane v-for="(group, index) in src" :label="group.name" class="clist">
        <div v-for="courseItem in group.data" class="course-item">
          <div class="header" @click="onClickCourseItem(courseItem.cid)">
            <span class="left-note-warpper">
              <span>{{ courseItem.cid }}</span>
              <span>{{ courseItem.name }}</span>
              <span>{{ courseItem.college }}</span>
            </span>
            <span class="right-note-wrapper">
              <span>{{ courseItem.hours }}/{{ courseItem.credit }}</span>
              <span>{{ courseItem.nature }}</span>
            </span>
          </div>
          <div class="tc-list" v-show="!collapsed[courseItem.cid]">
            <div
              v-for="classItem in courseItem.tcList"
              :class="getDisplayClass(classItem)"
              @click="onClickClassItem(classItem)"
            >
              <span>{{ classItem.no }}</span>
              <span>{{ classItem.teacher ?? "undefined" }}</span>
              <span>{{ classItem.teachingPlace ?? "undefined" }} </span>
              <span>
                <template v-if="classItem.capacity == classItem.capacityFull">
                  {{ classItem.occupancy }}/{{ classItem.capacity }}
                </template>
                <template v-else>
                  {{ classItem.occupancy }}/{{ classItem.capacity }}/{{ classItem.capacityFull }}
                </template>
              </span>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ckey } from "@/data/course-info";
import { ClassData, CourseGroupData } from "@/data/curriculum";
import { Scheduler, SelectionStatus } from "@/data/schedule";
import { ElNotification } from "element-plus";

const props = defineProps<{ src: CourseGroupData[]; scheduler: Scheduler }>();

const collapsed = reactive<{ [key: string]: boolean }>({});
const state = ref(props.scheduler.getStateObject());

const getStatus = (cd: ClassData) => {
  return state.value[ckey(cd)]!.status;
};

const getDisplayClass = (cd: ClassData) => {
  const status = getStatus(cd);
  return {
    "class-item": true,
    success: status == SelectionStatus.Selected,
    warning: status == SelectionStatus.WeakConflict,
    danger: status == SelectionStatus.StrongConflict,
  };
};

const onClickCourseItem = (cid: string) => {
  collapsed[cid] = !collapsed[cid];
};

const onClickClassItem = (cd: ClassData) => {
  const status = getStatus(cd);
  if (status === SelectionStatus.None || status == SelectionStatus.WeakConflict) {
    props.scheduler.select(cd);
    state.value = props.scheduler.getStateObject();
  } else if (status === SelectionStatus.Selected) {
    props.scheduler.unselect(cd);
    state.value = props.scheduler.getStateObject();
  } else {
    //ElMessage.warning("课程冲突！");
    const formatClassInfo = (cd: ClassData) => `${cd.name}-${cd.no}-${cd.teacher}`;
    ElNotification.warning({
      title: "课程冲突",
      message: h("div", null, [
        h("p", null, h("b", null, "无法选择课程：")),
        h("p", null, formatClassInfo(cd)),
        h("p", null, h("b", null, "冲突项：")),
        ...props.scheduler.getCollisions(cd).map(t => h("p", null, formatClassInfo(t))),
      ]),
    });
  }
  state.value = props.scheduler.getStateObject();
};
</script>

<style lang="scss" scoped>
.text-center {
  text-align: center;
}

.clist {
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  background-color: #ecf5ff;
  max-height: calc(100vh + 40px);
  overflow: auto;
  user-select: none;
  font-size: 90%;

  .course-item {
    display: block;
    padding: 4px;
    text-decoration: none;
    &:hover {
      background-color: #d9ecff;
      transition: 0.2s;
    }

    .header {
      display: block;
      padding: 0.4em 0;

      .left-note-warpper {
        > span {
          display: inline-block;
          &:nth-child(1) {
            color: #2c7ad6;
            width: 6em;
            font-weight: bold;
          }
          &:nth-child(2) {
            margin-right: 1em;
            font-weight: bold;
          }
          &:nth-child(3) {
            font-size: 90%;
          }
        }
      }

      .right-note-wrapper {
        float: right;

        span {
          display: inline-block;
          color: #9d3dcf;
          margin-right: 0.4em;
        }
      }
    }

    .tc-list {
      display: block;
      color: #000;
      background-color: #c6e2ff;
      margin-left: 8px;
      padding: 4px 0 4px 4px;
      text-decoration: none;
    }

    .class-item {
      display: block;
      text-decoration: none;
      &:hover {
        background-color: #a0cfff;
        transition: 0.2s;
      }
      &.success {
        background-color: #67c23a;
        &:hover {
          background-color: #95d475;
        }
      }
      &.warning {
        background-color: #eebe77;
        &:hover {
          background-color: #f3d19e;
        }
      }
      &.danger {
        background-color: #f56c6c;
        &:hover {
          background-color: #f89898;
        }
      }

      span {
        display: inline-block;
        border: none;
        border-radius: 4px;
        background-color: #1bb8a3;
        color: #f1f1f1;
        padding: 4px 6px 4px 4px;
        margin: 2px;
        &:nth-child(1) {
          background-color: #13c2c2;
          width: 2em;
          text-align: center;
        }
        &:nth-child(2) {
          background-color: #3498db;
          width: 6em;
          text-align: center;
        }
        &:nth-child(3) {
          background-color: #f39c11;
        }
        &:nth-child(4) {
          background-color: #ffc116;
        }
      }
    }
  }
}
</style>