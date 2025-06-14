<template>
  <button :class="buttonClass" @click="emitClick">
    {{ label }}
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  primary: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const emitClick = () => emit("click");

const buttonClass = computed(() => [props.primary ? "mb-bg-primary" : ""]);
</script>

<style scoped></style>
