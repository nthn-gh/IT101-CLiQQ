<script setup lang="ts">
import { useRouter } from 'vue-router'
import TopBar from '@/components/TopBar.vue'
import Icons from '@/components/Icons.vue'

const router = useRouter()
const goBack = () => router.back()

const billers = [
  { name: 'Ateneo de Manila University', logo: '🎓', popular: true, category: 'University' },
  { name: 'De La Salle University', logo: '🟢', popular: true, category: 'University' },
  { name: 'University of the Philippines', logo: '🔴', popular: true, category: 'University' },
  { name: 'University of Santo Tomas', logo: '🟡', category: 'University' },
  { name: 'Polytechnic University of the Philippines', logo: '📚', category: 'University' },
  { name: 'Far Eastern University', logo: '📘', category: 'University' },
  { name: 'Mapúa University', logo: '🔨', category: 'University' },
  { name: 'Adamson University', logo: '💙', category: 'University' },
  { name: 'Centro Escolar University', logo: '📖', category: 'University' },
  { name: 'Saint Louis University', logo: '⛪', category: 'University' },
  { name: 'Kumon', logo: '✏️', category: 'Tutorial' },
  { name: 'Mind Gym', logo: '🧠', category: 'Tutorial' },
]
</script>

<template>
  <div class="education-billers-view">
    <TopBar title="Education" :show-back="true" @back="goBack" />
    
    <div class="education-billers-view__content">
      <!-- Search -->
      <div class="search-section">
        <div class="search-box">
          <Icons name="search" :size="20" class="search-icon" />
          <input type="text" placeholder="Search schools and institutions..." />
        </div>
      </div>

      <!-- Popular Schools -->
      <section class="section">
        <h2 class="section-title">Popular Schools</h2>
        <div class="billers-list">
          <button 
            v-for="biller in billers.filter(b => b.popular)" 
            :key="biller.name"
            class="biller-item popular"
          >
            <div class="biller-logo">{{ biller.logo }}</div>
            <div class="biller-info">
              <h4>{{ biller.name }}</h4>
              <p>{{ biller.category }}</p>
            </div>
            <div class="biller-badge">
              <Icons name="star" :size="14" />
            </div>
            <Icons name="arrow-right" :size="18" class="biller-arrow" />
          </button>
        </div>
      </section>

      <!-- Universities -->
      <section class="section">
        <h2 class="section-title">Universities & Colleges</h2>
        <div class="billers-list">
          <button 
            v-for="biller in billers.filter(b => b.category === 'University')" 
            :key="biller.name"
            class="biller-item"
          >
            <div class="biller-logo">{{ biller.logo }}</div>
            <div class="biller-info">
              <h4>{{ biller.name }}</h4>
              <p>Pay tuition and fees</p>
            </div>
            <Icons name="arrow-right" :size="18" class="biller-arrow" />
          </button>
        </div>
      </section>

      <!-- Tutorial Centers -->
      <section class="section">
        <h2 class="section-title">Tutorial & Review Centers</h2>
        <div class="billers-list">
          <button 
            v-for="biller in billers.filter(b => b.category === 'Tutorial')" 
            :key="biller.name"
            class="biller-item"
          >
            <div class="biller-logo">{{ biller.logo }}</div>
            <div class="biller-info">
              <h4>{{ biller.name }}</h4>
              <p>Pay enrollment fees</p>
            </div>
            <Icons name="arrow-right" :size="18" class="biller-arrow" />
          </button>
        </div>
      </section>

      <!-- Info Card -->
      <section class="section">
        <div class="info-card">
          <h3>💡 Education Payment Tip</h3>
          <p>Pay school fees early to avoid late payment penalties. Many institutions offer discounts for early or full payment of tuition fees.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.education-billers-view {
  min-height: 100vh;
  background: var(--color-background);
  padding-top: var(--top-bar-height);

  &__content {
    padding: var(--spacing-2xl) var(--spacing-xl);
    padding-bottom: calc(var(--bottom-nav-height) + var(--spacing-2xl));
  }
}

/* Search */
.search-section {
  margin-bottom: var(--spacing-2xl);
}

.search-box {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: 0 var(--spacing-lg);
  height: 56px;
  background: var(--color-surface);
  border: 2px solid var(--color-divider);
  border-radius: var(--radius-lg);
  transition: all 0.2s;

  &:focus-within {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-sm);
  }

  .search-icon {
    color: var(--color-text-tertiary);
    flex-shrink: 0;
  }

  input {
    flex: 1;
    border: none;
    background: none;
    font-size: 16px;
    outline: none;
    color: var(--color-text-primary);

    &::placeholder {
      color: var(--color-text-tertiary);
    }
  }
}

/* Section */
.section {
  margin-bottom: var(--spacing-3xl);

  &-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-lg);
  }
}

/* Billers List */
.billers-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.biller-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    box-shadow: var(--shadow-sm);
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  &.popular {
    border-color: #3B82F6;
    background: #DBEAFE;
  }
}

.biller-logo {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  flex-shrink: 0;
  background: var(--color-surface);
  border-radius: var(--radius-md);
}

.biller-info {
  flex: 1;
  min-width: 0;

  h4 {
    font-size: 15px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 4px;
  }

  p {
    font-size: 13px;
    color: var(--color-text-secondary);
    margin: 0;
  }
}

.biller-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: #3B82F6;
  color: white;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.biller-arrow {
  color: var(--color-text-tertiary);
  flex-shrink: 0;
}

/* Info Card */
.info-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  border: 1px solid var(--color-divider);

  h3 {
    font-size: 15px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-md);
  }

  p {
    font-size: 14px;
    line-height: 1.6;
    color: var(--color-text-secondary);
    margin: 0;
  }
}
</style>
