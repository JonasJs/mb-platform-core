<template>
  <label class="radio" :class="{'radio-disabled': disabled }">
    <input
      :name="name" 
      type="radio" 
      :value="value" 
      :checked="modelValue === value"
      :disabled="disabled"
      @change="$emit('update:modelValue', value)"
    >
    <span class="paragraph-medium text-semi-bold">{{ label }}</span>
  </label>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number, Boolean],
    required: true
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
.radio {
  --radio-size: 16px;
  cursor: pointer; 
  user-select: none;
  text-align: left;
}

.radio-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.radio input {
  display: none;
}

.radio input + span {
  position: relative;
  padding-left: calc(var(--spacing-4) + var(--radio-size));
}

.radio input + span:before {
  content: '';
  width: var(--radio-size);
  height: var(--radio-size);

  display: block; 
  position: absolute;
  top: 0px;
  left: 0px;
  margin-top: 2px;
  
  border-radius: 50%;
  border: 1px solid var(--gray-400);
  
  margin-right: 5px;
  background: var(--background-color);
}

.radio--disabled input + span:before {
  border-color: var(--gray-300);
  background: var(--gray-100);
}

.radio input + span:after {
  content: '';
  width: calc(var(--radio-size) - 6px);
  height: calc(var(--radio-size) - 6px);

  display: block; 
  position: absolute;
  top: 5px;
  left: 3px;

  border-radius: 50%;
  opacity: 0;

  transform: scale(0,0); 
  transition: all .2s;
  
  background: var(--primary-color);
}

.radio input:checked + span:after {
  opacity: 1;
  transform: scale(1,1);
}

.radio--disabled input:checked + span:after {
  background: var(--gray-400);
}
</style>