<template>
  <nav class="bottom-nav">
    <button
      v-for="tab in tabs"
      :key="tab.path"
      :class="['bottom-nav__tab', { 'is-active': isActive(tab.path) }]"
      @click="navigate(tab.path)"
    >
      <div class="bottom-nav__icon-wrapper">
        <Icons :name="tab.icon" :size="22" class="bottom-nav__icon" />
      </div>
      <span class="bottom-nav__label">{{ tab.label }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import Icons from './Icons.vue'

const router = useRouter()
const route = useRoute()

const tabs = [
  { path: '/home', icon: 'home', label: 'Home' },
  { path: '/pay-bills', icon: 'receipt', label: 'Pay' },
  { path: '/wallet', icon: 'wallet', label: 'Wallet' },
  { path: '/rewards', icon: 'gift', label: 'Rewards' },
  { path: '/profile', icon: 'user', label: 'Profile' }
]

const isActive = (path: string) => route.path === path
const navigate = (path: string) => router.push(path)
</script>

<style scoped lang="scss">
.bottom-nav {
  position: fixed !important;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: var(--bottom-nav-height);
  display: flex;
  background: var(--color-surface);
  border-top: 1px solid var(--color-divider);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.04);
  z-index: 9999;
  padding: var(--spacing-sm) 0;
  margin: 0;
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  &__tab {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border: none;
    background: none;
    cursor: pointer;
    transition: all 0.2s;
    padding: var(--spacing-xs);

    &:active {
      transform: scale(0.95);
    }

    &.is-active {
      .bottom-nav__icon-wrapper {
        background: var(--color-primary-light);
      }

      .bottom-nav__icon {
        color: var(--color-primary);
        font-weight: 700;
      }

      .bottom-nav__label {
        color: var(--color-primary);
        font-weight: 600;
      }
    }
  }

  &__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-md);
    transition: all 0.2s;
  }

  &__icon {
    color: var(--color-text-secondary);
    transition: all 0.2s;
  }

  &__label {
    font-size: 11px;
    color: var(--color-text-secondary);
    font-weight: 500;
    transition: all 0.2s;
    text-align: center;
  }
}
</style>
