<script setup lang="ts">
import Icons from './Icons.vue'

defineProps<{
  icon: string
  label: string
  variant?: 'primary' | 'secondary'
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button 
    :class="['quick-action', variant === 'primary' ? 'quick-action--primary' : '']"
    @click="emit('click')"
  >
    <div class="quick-action__icon">
      <Icons :name="icon" :size="24" />
    </div>
    <span class="quick-action__label">{{ label }}</span>
  </button>
</template>

<style scoped lang="scss">
.quick-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: var(--shadow-xs);
  min-width: 80px;

  &:hover {
    box-shadow: var(--shadow-sm);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.95);
  }

  &--primary {
    background: var(--color-primary);
    border-color: var(--color-primary);

    .quick-action__icon {
      color: white;
    }

    .quick-action__label {
      color: white;
    }

    &:hover {
      background: #E55F00;
    }
  }

  &__icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-full);
    background: var(--color-surface-secondary);
    color: var(--color-primary);
    transition: all 0.2s;
  }

  &--primary &__icon {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  &__label {
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text-primary);
    text-align: center;
  }
}
</style>
