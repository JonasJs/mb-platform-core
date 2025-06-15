<template>
  <header>
    <Stepper>
      <Step
        title="Seja bem vindo(a)"
        :next-action="() => console.log('Próximo: Sobre')"
        label-next-button="Próximo"
      >
        <div>
          <p>Selecionado: {{ selectedOption }}</p>
         <div>
          <RadioButton
            v-model="selectedOption"
            name="options"
            value="opcao1"
            label="Primeira Opção"
          />

          <RadioButton
            v-model="selectedOption"
            name="options"
            value="opcao2"
            label="Segunda Opção"
          />

          <RadioButton
            v-model="selectedOption"
            name="options"
            value="opcao3"
            label="Terceira Opção"
          />
         </div>
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
import { ref } from 'vue';
import { Stepper, Step, RadioButton } from '@mb-platform/design-system';

const selectedOption = ref(null);

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
