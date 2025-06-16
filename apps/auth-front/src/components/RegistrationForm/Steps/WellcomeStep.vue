<template>
  <Step
    :title={title}
    :next-action="handleSubmit"
    label-next-button="Continuar">
    <div class="form-content">
      <Input
        v-model="formData.email"
        label="Endereço de e-mail"
        type="email"
        placeholder="Digite seu e-mail"
        :error="errors.email"
      />

      <div class="radio-group">
        <RadioButton
          v-model="formData.personType"
          name="personType"
          :value="PERSON_TYPE_ENUM.INDIVIDUAL"
          label="Pessoa física"
        />
        <RadioButton
          v-model="formData.personType"
          name="personType"
          :value="PERSON_TYPE_ENUM.COMPANY"
          label="Pessoa jurídica"
        />
      </div>
      <span v-if="errors.personType" class="error-message">
        {{ errors.personType }}
      </span>
    </div>
  </Step>
</template>

<script setup>
import { ref } from 'vue'
import { Step, RadioButton, Input } from '@mb-platform/design-system'
import { validateSchema } from '@mb-platform/form-guard'
import { PERSON_TYPE_ENUM } from '../RegistrationForm.utils.js'
import { welcomeSchema } from './Step.schema.js'

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

const emit = defineEmits(['form-submitted']);
const errors = ref({})

function handleSubmit() {
  const validation = validateSchema({
    schema: welcomeSchema,
    data: {
      email: props.formData.email,
      personType: props.formData.personType
    }
  })

  if (!validation.success) {
    errors.value = validation.errors
    return Promise.reject(new Error('Validation failed'))
  }

  errors.value = {}

  return Promise.resolve(() => emit('form-submitted'))
}
</script>

<style scoped>
.form-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-16);
}

.radio-group {
  display: flex;
  justify-content: space-between;
}

.error-message {
  color: var(--error-color);
  font-size: var(--font-14);
  font-weight: var(--font-weight-regular);
}
</style>
