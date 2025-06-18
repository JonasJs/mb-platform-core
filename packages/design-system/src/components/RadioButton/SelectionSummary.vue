<template>
  <div class="selection-summary">
    <h4 class="selection-summary__title">{{ title }}</h4>
    <div class="selection-summary__items">
      <div 
        v-for="item in items" 
        :key="item.label"
        class="selection-summary__item"
      >
        <span class="selection-summary__label">{{ item.label }}:</span>
        <span class="selection-summary__value">{{ item.value || 'Não selecionado' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Resumo das Seleções'
  },
  items: {
    type: Array,
    required: true,
    validator: (items) => {
      return items.every(item => 
        typeof item === 'object' && 
        'label' in item && 
        'value' in item
      );
    }
  }
});
</script>

<style scoped>
.selection-summary {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  color: white;
}

.selection-summary__title {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: white;
}

.selection-summary__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.selection-summary__item:last-child {
  border-bottom: none;
}

.selection-summary__label {
  font-weight: 500;
  opacity: 0.9;
}

.selection-summary__value {
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
}
</style>