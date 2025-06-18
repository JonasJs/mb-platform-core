<template>
  <Step
    :title="title"
    label-next-button="Finalizar"
    label-back-button="Voltar"
    :next-action="handleSubmit"
    :disable-next-button="isLoading"
    >
    <div class="form-content">
      <Input
        v-model="formData.email"
        label="Endereço de e-mail"
        type="text"
        disabled
      />

      <div class="radio-group">
        <RadioButton
          v-model="formData.personType"
          name="personType"
          :value="PERSON_TYPE_ENUM.INDIVIDUAL"
          label="Pessoa física"
          disabled
        />
        <RadioButton
          disabled
          v-model="formData.personType"
          name="personType"
          :value="PERSON_TYPE_ENUM.COMPANY"
          label="Pessoa jurídica"
        />
      </div>

      <Input
         v-if="formData.name"
        v-model="formData.name"
        label="Nome"
        type="text"
        disabled
      />
      <Input
        v-if="formData.companyName"
        v-model="formData.companyName"
        label="Razão social"
        type="text"
        disabled
      />
      <Input
        v-if="formData.cpf"
        v-model="formData.cpf"
        label="CPF"
        type="text"
        disabled
      />
      <Input
        v-if="formData.cnpj"
        v-model="formData.cnpj"
        label="CNPJ"
        type="text"
        disabled
      />
      <Input
        v-if="formData.birthDate"
        v-model="formData.birthDate"
        label="Data de nascimento"
        type="text"
        disabled
      />
      <Input
        v-if="formData.openingDate"
        v-model="formData.openingDate"
        label="Data de abertura"
        type="text"
        disabled
      />
      <Input
        v-if="formData.phone"
        v-model="formData.phone"
        label="Telefone"
        type="text"
        disabled
      />
      <Input
        v-if="formData.password"
        v-model="formData.password"
        label="Sua senha"
        type="password"
        disabled
      />
    </div>

    <p class="loading paragraph-medium" v-if="isLoading">Enviando...</p>
  </Step>
</template>

<script setup>
import { PERSON_TYPE_ENUM } from '../RegistrationForm.utils.js'
import { Step, RadioButton, Input } from '@mb-platform/design-system'

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  isLoading: {
    type: Boolean,
    required: false
  }
})

const emit = defineEmits(['form-submitted']);

async function handleSubmit() {
  try {
    return new Promise((resolve, reject) => {
      emit('form-submitted', { resolve, reject });
    });
  } catch (error) {
    throw error;
  }
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

.loading {
  margin-top: var(--spacing-16);
  color: var(--green-600)
}
</style>
