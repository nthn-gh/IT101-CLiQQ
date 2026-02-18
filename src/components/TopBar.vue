<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  title?: string
  showBack?: boolean
}>()

const emit = defineEmits<{
  back: []
}>()
</script>

<template>
  <header class="top-bar">
    <button v-if="showBack" class="top-bar__back" @click="emit('back')">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    
    <div v-if="!title" class="top-bar__logo">
      <div class="logo">
        <div class="logo__badge">
          <span class="logo__seven">7</span>
          <span class="logo__eleven">11</span>
        </div>
        <span class="logo__text">CLiQQ</span>
      </div>
    </div>

    <h1 v-else class="top-bar__title">{{ title }}</h1>

    <div class="top-bar__actions">
      <button class="top-bar__action">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <span class="notification-dot"></span>
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.top-bar {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: var(--top-bar-height);
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-lg);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-divider);
  z-index: 9998;
  gap: var(--spacing-md);
  box-shadow: var(--shadow-xs);
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  &__back {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    background: none;
    border-radius: var(--radius-sm);
    color: var(--color-text-primary);
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: var(--color-surface-secondary);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  &__logo {
    flex: 1;
  }

  &__title {
    flex: 1;
    font-size: 18px;
    font-weight: 700;
    color: var(--color-text-primary);
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  &__action {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    background: none;
    border-radius: var(--radius-sm);
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: var(--color-surface-secondary);
      color: var(--color-text-primary);
    }

    &:active {
      transform: scale(0.95);
    }
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;

  &__badge {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 4px 8px;
    background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%);
    border-radius: 6px;
    font-weight: 800;
    line-height: 1;
    box-shadow: 0 2px 4px rgba(255, 107, 0, 0.2);
  }

  &__seven {
    color: white;
    font-size: 16px;
  }

  &__eleven {
    color: white;
    font-size: 14px;
  }

  &__text {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-text-primary);
    letter-spacing: -0.5px;
  }
}

.notification-dot {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  background: var(--color-error);
  border: 2px solid var(--color-surface);
  border-radius: 50%;
}
</style>
