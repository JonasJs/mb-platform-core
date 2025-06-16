<template>
  <div>
    <div>
      <slot></slot>
    </div>
    <div class="step-buttons">
      <slot v-if="labelBackButton" name="left-button" :back="handleBack">
        <Button
          :disabled="disableBackButton"
          @click="handleBack"
          secondary
        >
          {{ labelBackButton }}
        </Button>
      </slot>

      <slot name="right-button" v-if="labelNextButton" :next="handleNext">
        <Button
          :disabled="disableNextButton"
          @click="handleNext"
        >
          {{ labelNextButton }}
        </Button>
      </slot>

    </div>
  </div>
</template>

<script setup>
import Button from "../Button/Button.vue";

const props = defineProps({
  nextAction: {
    type: Function,
    default: () => {},
  },
  backAction: {
    type: Function,
    default: () => {},
  },
  labelBackButton: String,
  labelNextButton: String,
  disableNextButton: Boolean,
  disableBackButton: Boolean
});

const emit = defineEmits(['next', 'back']);

async function handleNext() {
  try {
    await props.nextAction();
    emit('next');
  } catch {}
}


async function handleBack() {
  try {
    await props.backAction();
    emit('back');
  } catch {}
}
</script>

<style scoped>
.step-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-24);

  gap: var(--spacing-32);
}

.step-buttons button {
  flex: 1;
}

</style>