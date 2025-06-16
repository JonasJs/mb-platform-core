<template>
  <Step :title={title} :next-action="handleSubmit" label-next-button="Continuar" label-back-button="Voltar">
    <Input
      v-model="formData.password"
      label="Sua senha"
      type="text"
      placeholder="Digite sua senha"
      :error="errors.password"
    />
  </Step>
</template>

<script setup>
import { ref } from 'vue'
import { Step, Input } from '@mb-platform/design-system'
import { validateSchema } from '@mb-platform/form-guard'
import { passwordStepSchema } from './Step.schema.js'

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true
  }
})

const errors = ref({})

function handleSubmit() {
  const validation = validateSchema({
    schema: passwordStepSchema,
    data: {
      password: props.formData.password,
    }
  })

  if (!validation.success) {
    errors.value = validation.errors
    return Promise.reject(new Error('Validation failed'))
  }

  errors.value = {}
  return Promise.resolve()
}

</script>
