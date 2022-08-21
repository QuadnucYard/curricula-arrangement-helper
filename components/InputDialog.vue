<template>
  <el-dialog v-model="visible" :title="props.title">
    <el-input
      v-model="text"
      :type="props.type"
      :rows="props.rows"
      placeholder="Please paste raw json text"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hide">Cancel</el-button>
        <el-button type="primary" @click="onConfirm">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ title: string; type?: string; rows?: number }>(), {
  type: "textarea",
  rows: 5,
});

const visible = ref(false);
const text = ref("");
let extraArgs: any[] = [];

const emit = defineEmits(["confirm"]);

const onConfirm = () => {
  hide();
  emit("confirm", text.value, ...extraArgs);
};

/** @param args 额外传递的参数，在confirm时原封不动传回 */
const show = (...args: any[]) => {
  visible.value = true;
  text.value = "";
  extraArgs = args;
};

const hide = () => {
  visible.value = false;
};

defineExpose({ show, hide });
</script>

<style lang="scss"></style>
