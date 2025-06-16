<template>
  <div class="container">
    <label v-if="label" :for="inputId" class="label paragraph-medium text-semi-bold">
      {{ label }}
    </label>
    <input
      :id="inputId"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :class="inputClass"
      @input="onInput"
    >
    <span v-if="error" class="error-message">
      {{ error }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const inputId = computed(() => {
  if(props.label) {
    return `input-${props.label.toLowerCase().replace(/\s+/g, '-')}`;
  }
  return `input-${Date.now()}`;
})

const inputClass = computed(() => [
  'input-field',
  {
    'input-error': props.error,
    'input-disabled': props.disabled
  }
]);

function onInput(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.label {
  color: var(--text-color);
  font-size: var(--font-14);
  font-weight: var(--font-weight-medium);
}

.input-field {
  padding: var(--spacing-8);
  
  border: 1px solid var(--gray-400);
  border-radius: 4px;

  font-size: var(--font-16);
  font-weight: var(--font-weight-regular);
  color: var(--text-color);
  
  background-color: var(--background-color);
  transition: border-color 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: var(--primary-color);
}

.input-field:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: var(--gray-400);
}

.input-error {
  border-color: var(--error-color);
}

.input-field::placeholder {
  color: var(--gray-400);
}

.error-message {
  color: var(--error-color);
  font-size: var(--font-14);
  font-weight: var(--font-weight-regular);
} 
</style>