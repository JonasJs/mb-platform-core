<template>
  <div class="radio-group">
    <h4 v-if="title" class="radio-group__title">{{ title }}</h4>
    <div class="radio-group__options">
      <RadioButton
        v-for="option in options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
        :name="name"
        :disabled="option.disabled || disabled"
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import RadioButton from './RadioButton.vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    required: true,
    validator: (options) => {
      return options.every(option => 
        typeof option === 'object' && 
        'value' in option && 
        'label' in option
      );
    }
  },
  name: {
    type: String,
    required: true
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);
</script>

<style scoped>
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.radio-group__title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary, #374151);
  border-bottom: 2px solid var(--border-light, #e5e7eb);
  padding-bottom: 8px;
}

.radio-group__options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>