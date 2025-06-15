<template>
  <Stepper>
    <WellcomeStep title="Seja bem vindo(a)" :form-data="formData" @form-submitted="handleSubmitWellcomeStep" />
  </Stepper>
</template>

<script setup>
import { reactive } from 'vue'
import { Stepper } from '@mb-platform/design-system'
import WellcomeStep from './Steps/WellcomeStep.vue'
import { PERSON_TYPE_ENUM } from './RegistrationForm.utils.js'

const formData = reactive({
  email: undefined,
  personType: PERSON_TYPE_ENUM.INDIVIDUAL,

  nome: '',
  cpf: '',
  dataNascimento: '',

  razaoSocial: '',
  cnpj: '',
  dataAbertura: '',

  telefone: '',
  senha: ''
})

function handleSubmitWellcomeStep() {
  console.log('handleSubmitWellcomeStep', formData)
}


</script>
