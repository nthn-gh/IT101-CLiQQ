<template>
  <div id="app" class="app">
    <main class="app__main">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <BottomNav v-if="showBottomNav" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import BottomNav from './components/BottomNav.vue'

const route = useRoute()

// Hide bottom nav on login page
const showBottomNav = computed(() => route.path !== '/')
</script>

<style lang="scss">
@import './styles/global.scss';

.app {
  min-height: 100vh;
  width: 100%;

  &__main {
    min-height: 100vh;
    width: 100%;
  }
}
</style>
