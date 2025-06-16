<template>
  <Step :title={title} :next-action="handleSubmit" label-next-button="Continuar"  label-back-button="Voltar">
    <div class="form-content">
      <Input
        v-model="formData.companyName"
        label="Razão Social"
        type="text"
        placeholder="Digite o nome da empresa"
        :error="errors.companyName"
      />
      <Input
        v-model="formData.cnpj"
        label="CNPJ"
        type="text"
        placeholder="Digite seu CNPJ"
        :error="errors.cnpj"
      />
      <Input
        v-model="formData.openingDate"
        label="Data de Abertura"
        type="text"
        placeholder="Digite sua data de abertura"
        :error="errors.openingDate"
      />
    </div>
  </Step>
</template>

<script setup>
import { ref } from 'vue'
import { Step, Input } from '@mb-platform/design-system'
import { validateSchema } from '@mb-platform/form-guard'
import { companyStepSchema } from './Step.schema.js'

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
    schema: companyStepSchema,
    data: {
      companyName: props.formData.companyName,
      cnpj: props.formData.cnpj,
      openingDate: props.formData.openingDate,
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
