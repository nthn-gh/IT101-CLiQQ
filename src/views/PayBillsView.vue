<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '@/components/TopBar.vue'
import Icons from '@/components/Icons.vue'
import BillerPaymentModal from '@/components/BillerPaymentModal.vue'
import SuccessModal from '@/components/SuccessModal.vue'

const router = useRouter()
const goBack = () => router.back()

// Recent billers data
const recentBillers = [
  { name: 'Meralco', logo: '⚡', category: 'utilities', lastAmount: '2,450.50' },
  { name: 'Manila Water', logo: '💧', category: 'utilities', lastAmount: '650.00' },
  { name: 'PLDT Home', logo: '📞', category: 'telco', lastAmount: '1,699.00' },
]

// Modal state
const isPaymentModalOpen = ref(false)
const isSuccessModalOpen = ref(false)
const selectedBiller = ref<{ name: string; logo: string; category: string } | null>(null)
const paymentAmount = ref(0)
const accountNumber = ref('')

const openPaymentModal = (biller: { name: string; logo: string; category: string }) => {
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
  <div class="pay-bills-view">
    <TopBar title="Pay Bills" :show-back="true" @back="goBack" />
    
    <div class="pay-bills-view__content">
      <!-- Search -->
      <div class="search-section">
        <div class="search-box">
          <Icons name="search" :size="20" class="search-icon" />
          <input type="text" placeholder="Search for billers..." />
        </div>
      </div>

    <!-- Recent Bills (Pattern #9: Recent & Repeat) -->
    <section class="section">
        <h2 class="section-title">Recent Billers</h2>
        <div class="recent-billers">
          <button 
            v-for="biller in recentBillers" 
            :key="biller.name"
            class="recent-biller"
            @click="openPaymentModal(biller)"
          >
            <div class="biller-icon">
              <span class="biller-emoji">{{ biller.logo }}</span>
            </div>
            <div class="biller-info">
              <h4>{{ biller.name }}</h4>
              <p>Last: ₱{{ biller.lastAmount }}</p>
            </div>
            <Icons name="arrow-right" :size="18" class="biller-arrow" />
          </button>
        </div>
      </section>

    <!-- Categories -->
    <section class="section">
        <h2 class="section-title">All Categories</h2>
        <div class="categories">
          <button class="category-card" @click="router.push('/billers/telco')">
            <div class="category-icon">
              <Icons name="phone" :size="28" />
            </div>
            <div class="category-content">
              <h3>Telco & Internet</h3>
              <p>12 billers available</p>
            </div>
            <Icons name="arrow-right" :size="20" class="category-arrow" />
          </button>

          <button class="category-card" @click="router.push('/billers/utilities')">
            <div class="category-icon">
              <Icons name="download" :size="28" />
            </div>
            <div class="category-content">
              <h3>Utilities</h3>
              <p>8 billers available</p>
            </div>
            <Icons name="arrow-right" :size="20" class="category-arrow" />
          </button>

          <button class="category-card" @click="router.push('/billers/cable')">
            <div class="category-icon">
              <Icons name="settings" :size="28" />
            </div>
            <div class="category-content">
              <h3>Cable & Streaming</h3>
              <p>6 billers available</p>
            </div>
            <Icons name="arrow-right" :size="20" class="category-arrow" />
          </button>

          <button class="category-card" @click="router.push('/billers/government')">
            <div class="category-icon">
              <Icons name="settings" :size="28" />
            </div>
            <div class="category-content">
              <h3>Government</h3>
              <p>15 billers available</p>
            </div>
            <Icons name="arrow-right" :size="20" class="category-arrow" />
          </button>

          <button class="category-card" @click="router.push('/billers/healthcare')">
            <div class="category-icon">
              <Icons name="plus" :size="28" />
            </div>
            <div class="category-content">
              <h3>Healthcare</h3>
              <p>4 billers available</p>
            </div>
            <Icons name="arrow-right" :size="20" class="category-arrow" />
          </button>

          <button class="category-card" @click="router.push('/billers/education')">
            <div class="category-icon">
              <Icons name="settings" :size="28" />
            </div>
            <div class="category-content">
              <h3>Education</h3>
              <p>10 billers available</p>
            </div>
            <Icons name="arrow-right" :size="20" class="category-arrow" />
          </button>
        </div>
      </section>
    </div>
  </div>

  <!-- Biller Payment Modal -->
  <BillerPaymentModal 
    v-if="isPaymentModalOpen && selectedBiller"
    :billerName="selectedBiller.name"
    :billerLogo="selectedBiller.logo"
    :billerCategory="selectedBiller.category"
    @close="closePaymentModal"
    @payment-success="handlePaymentSuccess"
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
</template>

<style scoped lang="scss">
.pay-bills-view {
  min-height: 100vh;
  background: var(--color-background);
  padding-top: var(--top-bar-height);

  &__content {
    padding: var(--spacing-2xl) var(--spacing-xl);
    padding-bottom: calc(var(--bottom-nav-height) + var(--spacing-2xl));
  }
}

/* Search Section */
.search-section {
  margin-bottom: var(--spacing-3xl);
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
    font-size: 20px;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-lg);
  }
}

/* Recent Billers (Pattern #9) */
.recent-billers {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.recent-biller {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border: 2px solid var(--color-divider);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-sm);
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  .biller-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-surface-secondary);
    border-radius: var(--radius-md);
    flex-shrink: 0;
    color: var(--color-primary);

    .biller-emoji {
      font-size: 24px;
    }
  }

  .biller-info {
    flex: 1;

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

  .biller-arrow {
    color: var(--color-text-tertiary);
  }
}

/* Category Cards */
.categories {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.category-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
  background: var(--color-surface);
  border: 2px solid var(--color-divider);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }

  .category-icon {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-surface-secondary);
    border-radius: var(--radius-md);
    flex-shrink: 0;
    color: var(--color-text-primary);
  }

  .category-content {
    flex: 1;

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text-primary);
      margin-bottom: 4px;
    }

    p {
      font-size: 13px;
      color: var(--color-text-secondary);
    }
  }

  .category-arrow {
    color: var(--color-text-tertiary);
  }
}
</style>
