<template>
  <div class="container">
    <span class="paragraph-medium spacing-bottom-sm">
      Etapa <span class="text-primary-color">{{ currentStep + 1 }}</span> de {{ totalSteps }}
    </span>
    <Transition name="fade-step" mode="out-in">
      <h2 :key="stepTitle" class="heading-large">{{ stepTitle }}</h2>
    </Transition>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentStep: {
    type: Number,
    default: 0
  },
  steps: {
    type: Array,
    required: true
  }
});

const totalSteps = computed(() => props.steps.length);
const stepTitle = computed(() => props.steps[props.currentStep]?.title || '');

</script>

<style scoped>
.container {
  width: 100%;
}

.spacing-bottom-sm {
  margin-bottom: var(--spacing-8);
  display: block;
}

.fade-step-enter-active,
.fade-step-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-step-enter-from,
.fade-step-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
