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
    default: true,
  },
  secondary: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);
const emitClick = () => emit("click");

const buttonClass = computed(() => {
  if (props.secondary) {
    return [{ "mb-secondary": props.secondary }]
  }
  return [{ "mb-primary": true }];;
});

</script>

<style scoped>
button {
  padding: var(--spacing-8) var(--spacing-32);
  
  border: none;
  border-radius: var(--border-radius-8);
  
  font-size: var(--font-16);
  font-weight: var(--font-weight-medium);
  
  color: var(--gray-50);
  cursor: pointer;
}

.mb-primary{
  background: var(--primary-color);
}

.mb-secondary {
  background: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
}
</style>
