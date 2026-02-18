<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '@/components/TopBar.vue'
import Icons from '@/components/Icons.vue'
import BillerPaymentModal from '@/components/BillerPaymentModal.vue'
import SuccessModal from '@/components/SuccessModal.vue'

const router = useRouter()
const goBack = () => router.back()

const billers = [
  { name: 'Maxicare', logo: '🏥', popular: true, desc: 'Health Maintenance Organization' },
  { name: 'Medicard', logo: '💊', popular: true, desc: 'Health Insurance Provider' },
  { name: 'PhilHealth', logo: '🏥', popular: true, desc: 'National Health Insurance' },
  { name: 'Intellicare', logo: '❤️', desc: 'Healthcare Programs' },
  { name: 'Pacific Cross', logo: '✚', desc: 'International Health Insurance' },
  { name: 'Cocolife', logo: '🌴', desc: 'Life & Health Insurance' },
  { name: 'AXA Philippines', logo: '🛡️', desc: 'Health Insurance Solutions' },
  { name: 'Kaiser International', logo: '⚕️', desc: 'Health Maintenance Services' },
]

// Modal state
const isPaymentModalOpen = ref(false)
const isSuccessModalOpen = ref(false)
const selectedBiller = ref<{ name: string; logo: string; desc: string } | null>(null)
const paymentAmount = ref(0)
const accountNumber = ref('')

const openPaymentModal = (biller: { name: string; logo: string; desc: string }) => {
  selectedBiller.value = biller
  isPaymentModalOpen.value = true
}

const closePaymentModal = () => {
  isPaymentModalOpen.value = false
}

const handlePaymentSuccess = (amount: number, account: string) => {
  paymentAmount.value = amount
  accountNumber.value = account
  closePaymentModal()
  isSuccessModalOpen.value = true
}

const closeSuccessModal = () => {
  isSuccessModalOpen.value = false
  selectedBiller.value = null
  paymentAmount.value = 0
  accountNumber.value = ''
}
</script>

<template>
  <div class="healthcare-billers-view">
    <TopBar title="Healthcare" :show-back="true" @back="goBack" />
    
    <div class="healthcare-billers-view__content">
      <!-- Search -->
      <div class="search-section">
        <div class="search-box">
          <Icons name="search" :size="20" class="search-icon" />
          <input type="text" placeholder="Search healthcare providers..." />
        </div>
      </div>

      <!-- Popular Providers -->
      <section class="section">
        <h2 class="section-title">Popular Providers</h2>
        <div class="billers-list">
          <button 
            v-for="biller in billers.filter(b => b.popular)" 
            :key="biller.name"
            class="biller-item popular"
            @click="openPaymentModal(biller)"
          >
            <div class="biller-logo">{{ biller.logo }}</div>
            <div class="biller-info">
              <h4>{{ biller.name }}</h4>
              <p>{{ biller.desc }}</p>
            </div>
            <div class="biller-badge">
              <Icons name="star" :size="14" />
            </div>
            <Icons name="arrow-right" :size="18" class="biller-arrow" />
          </button>
        </div>
      </section>

      <!-- All Providers -->
      <section class="section">
        <h2 class="section-title">All Healthcare Providers</h2>
        <div class="billers-list">
          <button 
            v-for="biller in billers" 
            :key="biller.name"
            class="biller-item"
            @click="openPaymentModal(biller)"
          >
            <div class="biller-logo">{{ biller.logo }}</div>
            <div class="biller-info">
              <h4>{{ biller.name }}</h4>
              <p>{{ biller.desc }}</p>
            </div>
            <Icons name="arrow-right" :size="18" class="biller-arrow" />
          </button>
        </div>
      </section>

      <!-- Info Card -->
      <section class="section">
        <div class="info-card">
          <h3>💡 Healthcare Payment Tip</h3>
          <p>Pay your health insurance premiums on time to avoid lapses in coverage. Set up reminders or enable auto-payment for convenience.</p>
        </div>
      </section>
    </div>

    <!-- Payment Modal -->
    <BillerPaymentModal
      v-if="isPaymentModalOpen && selectedBiller"
      :billerName="selectedBiller.name"
      :billerLogo="selectedBiller.logo"
      billerCategory="healthcare"
      @close="closePaymentModal"
      @success="handlePaymentSuccess"
    />

    <!-- Success Modal -->
    <SuccessModal
      v-if="isSuccessModalOpen"
      :isOpen="isSuccessModalOpen"
      type="bill"
      :amount="paymentAmount"
      :recipient="selectedBiller?.name"
      @close="closeSuccessModal"
    />
  </div>
</template>

<style scoped lang="scss">
.healthcare-billers-view {
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
    border-color: #EF4444;
    background: #FEE2E2;
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
  background: #EF4444;
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
