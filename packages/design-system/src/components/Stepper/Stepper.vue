<template>
  <div class="stepper">
    <Steps
      :steps="stepsData"
      :currentStep="currentStep"
    />
    <Transition
      name="fade"
      mode="out-in"
    >
      <div :key="currentStep">
        <component
          :is="currentComponent"
          v-bind="currentProps"
          @next="handleNext"
          @back="handleBack"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, useSlots, watch } from 'vue';
import Steps from '../Steps/Steps.vue';

const props = defineProps({
  modelValue: {
    default: 0
  }
});

const emit = defineEmits(['update:modelValue']);

const slots = useSlots();

const slotSteps = computed(() => slots.default() || []);
const stepsData = computed(() => slotSteps.value.map(value => value.props));
const currentNode = computed(() => slotSteps.value[currentStep.value]);
const currentComponent = computed(() => currentNode.value);

const currentStep = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  currentStep.value = newValue;
  emit('update:modelValue', newValue);
});

function currentProps() {
  return currentNode.value?.props || {};
}

function goToStep(step){
  const stepsLength = stepsData.value.length;
  if (step >= 0 && step < stepsLength) {
    currentStep.value = step;
  }
};

function handleNext() {
  return goToStep(currentStep.value + 1)
}

function handleBack(){ 
  return goToStep(currentStep.value - 1)
}

</script>

<style scoped>

.stepper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-24);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>