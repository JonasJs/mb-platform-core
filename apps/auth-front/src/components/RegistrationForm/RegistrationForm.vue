<template>
  <Stepper v-model="currentStep">
    <WellcomeStep title="Seja bem vindo(a)" :form-data="formData" />

    <CompanyStep v-if="hasCompany" title="Pessoa Jurídica" :form-data="formData" />
    <IndividualStep v-else title="Pessoa Física" :form-data="formData" />

    <PasswordStep title="Senha de acesso" :form-data="formData" />
    <ReviewFormStep title="Revise suas informações" :form-data="formData" @form-submitted="handleSubmitForm"/>

  </Stepper>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { Stepper } from '@mb-platform/design-system'
import { PERSON_TYPE_ENUM } from './RegistrationForm.utils.js'

import WellcomeStep from './Steps/WellcomeStep.vue'
import IndividualStep from './Steps/IndividualStep.vue'
import CompanyStep from './Steps/CompanyStep.vue'
import PasswordStep from './Steps/PasswordStep.vue'
import ReviewFormStep from './Steps/ReviewFormStep.vue'

const currentStep = 3;

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

const hasCompany = computed(() => {
  return formData.personType === PERSON_TYPE_ENUM.COMPANY
})

async function handleSubmitForm() {
  try {
    const baseUrl = `${import.meta.env.VITE_API_URL}/registration`

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error('Erro ao enviar o formulário');

    await response.json();

  } catch (error) {
    console.log(error)
  }
}


</script>
