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
  { name: 'Netflix', logo: 'https://icons.duckduckgo.com/ip3/netflix.com.ico', popular: true },
  { name: 'Disney+', logo: 'https://icons.duckduckgo.com/ip3/disneyplus.com.ico', popular: true },
  { name: 'HBO GO', logo: 'https://icons.duckduckgo.com/ip3/hbogoasia.ph.ico', popular: true },
  { name: 'Cignal TV', logo: 'https://icons.duckduckgo.com/ip3/cignal.tv.ico' },
  { name: 'Sky Cable', logo: 'https://icons.duckduckgo.com/ip3/mysky.com.ph.ico' },
  { name: 'Spotify Premium', logo: 'https://icons.duckduckgo.com/ip3/spotify.com.ico' },
  { name: 'YouTube Premium', logo: 'https://icons.duckduckgo.com/ip3/youtube.com.ico' },
  { name: 'Amazon Prime', logo: 'https://icons.duckduckgo.com/ip3/primevideo.com.ico' },
  { name: 'iWantTFC', logo: 'https://icons.duckduckgo.com/ip3/iwanttfc.com.ico' },
  { name: 'Viu Premium', logo: 'https://icons.duckduckgo.com/ip3/viu.com.ico' },
  { name: 'WeTV', logo: 'https://icons.duckduckgo.com/ip3/wetv.vip.ico' },
  { name: 'Apple TV+', logo: 'https://icons.duckduckgo.com/ip3/tv.apple.com.ico' },
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
  <div class="cable-billers-view">
    <TopBar title="Cable & Streaming" :show-back="true" @back="goBack" />
    
    <div class="cable-billers-view__content">
      <!-- Search -->
      <div class="search-section">
        <div class="search-box">
          <Icons name="search" :size="20" class="search-icon" />
          <input type="text" placeholder="Search streaming services..." />
        </div>
      </div>

      <!-- Popular Services -->
      <section class="section">
        <h2 class="section-title">Popular Services</h2>
        <div class="billers-list">
          <button 
            v-for="biller in billers.filter(b => b.popular)" 
            :key="biller.name"
            class="biller-item popular"
            @click="openPaymentModal(biller)"
          >
            <div class="biller-logo">
              <img :src="biller.logo" :alt="`${biller.name} logo`" onerror="this.src='/cliqq-logo.png'" />
            </div>
            <div class="biller-info">
              <h4>{{ biller.name }}</h4>
              <p>Subscribe or renew</p>
            </div>
            <div class="biller-badge">
              <Icons name="star" :size="14" />
            </div>
            <Icons name="arrow-right" :size="18" class="biller-arrow" />
          </button>
        </div>
      </section>

      <!-- All Services -->
      <section class="section">
        <h2 class="section-title">All Services</h2>
        <div class="billers-list">
          <button 
            v-for="biller in billers" 
            :key="biller.name"
            class="biller-item"
            @click="openPaymentModal(biller)"
          >
            <div class="biller-logo">
              <img :src="biller.logo" :alt="`${biller.name} logo`" onerror="this.src='/cliqq-logo.png'" />
            </div>
            <div class="biller-info">
              <h4>{{ biller.name }}</h4>
              <p>Subscribe or renew</p>
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
      billerCategory="cable"
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
.cable-billers-view {
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
    border-color: var(--color-primary);
    background: var(--color-primary-light);
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

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: var(--radius-md);
  }
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
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.biller-arrow {
  color: var(--color-text-tertiary);
  flex-shrink: 0;
}
</style>
