<template>
  <Stepper v-model="currentStep">
    <WellcomeStep title="Seja bem vindo(a)" :form-data="formData" />

    <CompanyStep v-if="hasCompany" title="Pessoa Jurídica" :form-data="formData" />
    <IndividualStep v-else title="Pessoa Física" :form-data="formData" />

    <PasswordStep title="Senha de acesso" :form-data="formData" />
    <ReviewFormStep
      title="Revise suas informações"
      :form-data="formData"
      @form-submitted="handleSubmitForm"
      :isLoading="isLoading"
    />
    <SuccessStep title="Sucesso!" />
  </Stepper>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { Stepper } from '@mb-platform/design-system'
import { PERSON_TYPE_ENUM } from './RegistrationForm.utils.js'

import WellcomeStep from './Steps/WellcomeStep.vue'
import IndividualStep from './Steps/IndividualStep.vue'
import CompanyStep from './Steps/CompanyStep.vue'
import PasswordStep from './Steps/PasswordStep.vue'
import ReviewFormStep from './Steps/ReviewFormStep.vue'
import SuccessStep from './Steps/SuccessStep.vue'

const formData = reactive({
  email: '',
  personType: PERSON_TYPE_ENUM.INDIVIDUAL,

  name: '',
  cpf: '',
  birthDate: '',
  phone: '',

  companyName: '',
  cnpj: '',
  openingDate: '',

  password: '',
})

const isLoading = ref(false)
const currentStep = ref(0)

const hasCompany = computed(() => {
  return formData.personType === PERSON_TYPE_ENUM.COMPANY
})

async function handleSubmitForm({ resolve, reject }) {
  try {
    isLoading.value = true
    // TEMP
    const url = import.meta.env.VITE_API_URL || 'http://localhost:3001'
    const baseUrl = `${url}/registration`

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) throw new Error('Erro ao enviar o formulário')

    await response.json();

    resolve();

  } catch (error) {
    alert("Erro ao enviar o formulário")
    reject(error);
  } finally {
    isLoading.value = false
  }
}
</script>
