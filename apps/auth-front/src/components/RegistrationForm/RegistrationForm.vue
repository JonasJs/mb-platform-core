<template>
  <Stepper v-model="currentStep">
    <WellcomeStep title="Seja bem vindo(a)" :form-data="formData" @form-submitted="handleSubmitWellcomeStep" />

    <CompanyStep v-if="hasCompany" title="Pessoa Jurídica" :form-data="formData" />
    <IndividualStep v-else title="Pessoa Física" :form-data="formData" />

    <PasswordStep title="Senha de acesso" :form-data="formData" />
    <ReviewFormStep title="Revise suas informações" :form-data="formData"/>

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

const currentStep = 0;

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

function handleSubmitWellcomeStep() {
  console.log('handleSubmitWellcomeStep', formData)
}


</script>
