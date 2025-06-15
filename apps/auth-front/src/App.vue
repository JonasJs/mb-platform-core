<template>
  <header>
    <Stepper>
      <Step
        title="Seja bem vindo(a)"
        :next-action="() => console.log('Próximo: Sobre')"
        label-next-button="Próximo"
      >
        <div>
         Step 0
        </div>
      </Step>


      <Step
        title="Concluir"
        :next-action="() => console.log('Próximo: Concluir')"
        :back-action="() => console.log('Voltar: Concluir')"
        label-next-button="Finalizar"
        label-back-button="Voltar"
      >
        <div>Step 3</div>
      </Step>
    </Stepper>
  </header>
</template>

<script setup>
import { Stepper, Step } from '@mb-platform/design-system';
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem;
  min-height: 100vh;
}
</style>
