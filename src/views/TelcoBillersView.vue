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
  { name: 'Globe Postpaid', logo: '🌐', popular: true },
  { name: 'Smart/TNT/Sun', logo: '📱', popular: true },
  { name: 'PLDT Home', logo: '🏠', popular: true },
  { name: 'Converge ICT', logo: '🌐' },
  { name: 'DITO Telecommunity', logo: '📡' },
  { name: 'Sky Broadband', logo: '📺' },
  { name: 'Globe At Home', logo: '🏠' },
  { name: 'PLDT Fibr', logo: '⚡' },
  { name: 'Cignal TV', logo: '📡' },
  { name: 'Sky Cable', logo: '📺' },
  { name: 'Eastern Communications', logo: '🌐' },
  { name: 'Bayantel', logo: '📞' },
]

// Modal state
const isPaymentModalOpen = ref(false)
const isSuccessModalOpen = ref(false)
const selectedBiller = ref<{ name: string; logo: string } | null>(null)
const paymentAmount = ref(0)
const accountNumber = ref('')

const openPaymentModal = (biller: { name: string; logo: string }) => {
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
  <div class="telco-billers-view">
    <TopBar title="Telco & Internet" :show-back="true" @back="goBack" />
    
    <div class="telco-billers-view__content">
      <!-- Search -->
      <div class="search-section">
        <div class="search-box">
          <Icons name="search" :size="20" class="search-icon" />
          <input type="text" placeholder="Search billers..." />
        </div>
      </div>

      <!-- Popular Billers -->
      <section class="section">
        <h2 class="section-title">Popular Billers</h2>
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
              <p>Pay your bill</p>
            </div>
            <div class="biller-badge">
              <Icons name="star" :size="14" />
            </div>
            <Icons name="arrow-right" :size="18" class="biller-arrow" />
          </button>
        </div>
      </section>

      <!-- All Billers -->
      <section class="section">
        <h2 class="section-title">All Billers</h2>
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
              <p>Pay your bill</p>
            </div>
            <Icons name="arrow-right" :size="18" class="biller-arrow" />
          </button>
        </div>
      </section>
    </div>

    <!-- Payment Modal -->
    <BillerPaymentModal
      v-if="isPaymentModalOpen && selectedBiller"
      :billerName="selectedBiller.name"
      :billerLogo="selectedBiller.logo"
      billerCategory="telco"
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
.telco-billers-view {
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
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 2px solid var(--color-divider);
  transition: all 0.2s;

  &:focus-within {
    border-color: var(--color-primary);
  }

  .search-icon {
    color: var(--color-text-secondary);
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 15px;
    color: var(--color-text-primary);
    outline: none;

    &::placeholder {
      color: var(--color-text-tertiary);
    }
  }
}

/* Sections */
.section {
  margin-bottom: var(--spacing-3xl);
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
}

/* Billers List */
.billers-list {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.biller-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--color-divider);
  background: transparent;
  border-left: none;
  border-right: none;
  border-top: none;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  width: 100%;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--color-surface-secondary);
  }

  &:active {
    transform: scale(0.98);
  }

  &.popular {
    background: linear-gradient(90deg, rgba(255, 107, 0, 0.03) 0%, transparent 100%);
  }
}

.biller-logo {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface-secondary);
  border-radius: var(--radius-md);
  font-size: 28px;
  flex-shrink: 0;
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
  }
}

.biller-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--color-primary);
  border-radius: 50%;
  margin-right: -4px;

  span {
    filter: brightness(0) invert(1);
  }
}

.biller-arrow {
  color: var(--color-text-tertiary);
  flex-shrink: 0;
}
</style>
