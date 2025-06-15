<template>
  <button :class="buttonClass" @click="emitClick">
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  primary: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);
const emitClick = () => emit("click");

const buttonClass = computed(() => [props.primary ? "mb-bg-primary" : ""]);
</script>

<style scoped>
.mb-bg-primary {
  background-color: var(--color-primary);
}

</style>
