<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
  noPadding?: boolean
  clickable?: boolean
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div 
    :class="['info-card', { 'info-card--clickable': clickable, 'info-card--no-padding': noPadding }]"
    @click="clickable && emit('click')"
  >
    <div v-if="title || subtitle" class="info-card__header">
      <h3 v-if="title" class="info-card__title">{{ title }}</h3>
      <p v-if="subtitle" class="info-card__subtitle">{{ subtitle }}</p>
    </div>
    <div :class="['info-card__content', { 'info-card__content--no-padding': noPadding }]">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.info-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-divider);
  transition: all 0.2s;

  &--clickable {
    cursor: pointer;

    &:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }

    &:active {
      transform: scale(0.98);
    }
  }

  &__header {
    padding: var(--spacing-lg) var(--spacing-lg) 0;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 4px;
  }

  &__subtitle {
    font-size: 13px;
    color: var(--color-text-secondary);
    margin: 0;
  }

  &__content {
    padding: var(--spacing-lg);

    &--no-padding {
      padding: 0;
    }
  }

  &--no-padding {
    .info-card__content {
      padding: 0;
    }
  }
}
</style>
