<template>
  <Step :title="title" :show-back-button="false" :show-next-button="false">
    <div class="success">
      <DotLottieVue class="bg-animation" autoplay loop src="https://lottie.host/6f908582-d67f-407c-81c2-87aaa7af9592/O6DeDKxhYK.lottie" />
      <div class="content">
        <DotLottieVue class="happy-animation" :speed="0.5" dela autoplay loop src="https://lottie.host/89f46a9c-f684-459a-80df-c35226d9bf3e/w1DsQZzAjZ.lottie" />
        <p class="paragraph-medium">
          Seu cadastro foi processado e você receberá um e-mail de confirmação em breve.
        </p>

        <Button @click="goToRegistration">
          Criar uma nova conta
        </button>
      </div>
    </div>
  </Step>
</template>


<script setup>
import { Step, Button } from '@mb-platform/design-system'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

defineProps({
  title: {
    type: String,
    required: true
  }
})

function goToRegistration() {
  window.location.href = '/registration';
}

</script>

<style scoped>

.success {
  position: relative;
}

.success p {
  color: var(--gray-400);
  margin-bottom: var(--spacing-16)
}

.happy-animation {
  width: 100px;
  height: 100px;
}

.bg-animation {
  width: 400px;
  height: 400px;
}

.content {
  position: absolute;
  top: 0;
  z-index: 5;
}
</style>
