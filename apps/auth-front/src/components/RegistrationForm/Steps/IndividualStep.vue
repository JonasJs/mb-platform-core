<template>
  <Step :title={title} :next-action="handleSubmit" label-next-button="Continuar"  label-back-button="Voltar">
    <div class="form-content">
      <Input
        v-model="formData.name"
        label="Nome"
        type="text"
        placeholder="Digite seu nome"
        :error="errors.name"
      />
      <Input
        v-model="formData.cpf"
        label="CPF"
        type="text"
        placeholder="Digite seu CPF"
        :error="errors.cpf"
      />
      <Input
        v-model="formData.birthDate"
        label="Data de Nascimento"
        type="text"
        placeholder="Digite sua data de nascimento"
        :error="errors.birthDate"
      />
      <Input
        v-model="formData.phone"
        label="Telefone"
        type="text"
        placeholder="Digite seu telefone"
        :error="errors.phone"
      />
    </div>
  </Step>
</template>

<script setup>
import { ref } from 'vue'
import { Step, Input } from '@mb-platform/design-system'
import { validateSchema } from '@mb-platform/form-guard'
import { individualStepSchema } from './Step.schema.js'

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
    schema: individualStepSchema,
    data: {
      name: props.formData.name,
      cpf: props.formData.cpf,
      birthDate: props.formData.birthDate,
      phone: props.formData.phone,
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
</style>
