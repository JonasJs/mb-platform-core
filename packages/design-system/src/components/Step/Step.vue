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
        >
          {{ labelBackButton }}
        </Button>
      </slot>

      <div class="footer-content">
        <slot name="footer-content"></slot>
      </div>

      <div class="right-button" v-if="labelNextButton">
        <slot name="right-button" :next="handleNext">
          <Button
            :disabled="disableNextButton"
            @click="handleNext"
          >
            {{ labelNextButton }}
          </Button>
        </slot>
      </div>
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


function handleNext(){
  return Promise.resolve().then(props.nextAction).then(() => emit('next'));
};

function handleBack() {
  return Promise.resolve().then(props.backAction).then(() => emit('back'));
};
</script>