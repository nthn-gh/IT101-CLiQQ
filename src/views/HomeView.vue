<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '@/components/TopBar.vue'
import Icons from '@/components/Icons.vue'
import BarcodeCard from '@/components/BarcodeCard.vue'
import InfoCard from '@/components/InfoCard.vue'
import QuickAction from '@/components/QuickAction.vue'
import BuyLoadModal from '@/components/BuyLoadModal.vue'
import SuccessModal from '@/components/SuccessModal.vue'

const router = useRouter()

// Dynamic greeting based on time of day
const greeting = computed(() => {
  const hour = new Date().getHours()
  
  if (hour >= 5 && hour < 12) {
    return 'Good morning'
  } else if (hour >= 12 && hour < 18) {
    return 'Good afternoon'
  } else {
    return 'Good evening'
  }
})

// Buy Load Modal State
const isBuyLoadModalOpen = ref(false)
const isSuccessModalOpen = ref(false)
const loadAmount = ref(0)
const recipientInfo = ref('')

const openBuyLoadModal = () => {
  isBuyLoadModalOpen.value = true
}

const closeBuyLoadModal = () => {
  isBuyLoadModalOpen.value = false
}

const handleLoadSuccess = (amount: number, mobileNumber: string, network: string) => {
  loadAmount.value = amount
  recipientInfo.value = `${network} - ${mobileNumber}`
  closeBuyLoadModal()
  isSuccessModalOpen.value = true
}

const closeSuccessModal = () => {
  isSuccessModalOpen.value = false
  loadAmount.value = 0
  recipientInfo.value = ''
}
</script>

<template>
  <div class="home-view">
    <TopBar />
    
    <!-- GoTyme-inspired Clean Layout -->
    <div class="home-view__content">
      <!-- Welcome Header -->
      <header class="welcome-header">
        <div>
          <p class="welcome-header__greeting">{{ greeting }}</p>
          <h1 class="welcome-header__name">Juan dela Cruz</h1>
        </div>
      </header>

      <!-- Prominent Balance Display -->
      <div class="balance-display">
        <p class="balance-display__label">Total Balance</p>
        <h2 class="balance-display__amount">₱2,546.50</h2>
        <div class="balance-display__rewards">
          <Icons name="star" :size="16" />
          <span>1,250 points • ₱125 rewards value</span>
        </div>
      </div>

      <!-- Member Barcode Card - Prominent Position -->
      <section class="section">
        <BarcodeCard 
          barcode-number="76543210123456"
          member-name="Juan dela Cruz"
        />
      </section>

      <!-- Quick Actions -->
      <section class="section">
        <h2 class="section-title">Quick Actions</h2>
        <div class="quick-actions-grid">
          <QuickAction 
            icon="phone" 
            label="Buy Load"
            @click="openBuyLoadModal"
          />
          <QuickAction 
            icon="receipt" 
            label="Pay Bills"
            @click="router.push('/pay-bills')"
          />
          <QuickAction 
            icon="wallet" 
            label="Wallet"
            @click="router.push('/wallet')"
          />
          <QuickAction 
            icon="qrcode" 
            label="Scan QR"
            @click="router.push('/wallet')"
          />
        </div>
      </section>

      <!-- Rewards Summary Card -->
      <section class="section">
        <InfoCard
          title="Your Rewards"
          subtitle="Earn more points with every purchase"
          clickable
          @click="router.push('/rewards')"
        >
          <div class="rewards-content">
            <div class="rewards-stat">
              <div class="rewards-stat__value">1,250</div>
              <div class="rewards-stat__label">Points Balance</div>
            </div>
            <div class="rewards-divider"></div>
            <div class="rewards-stat">
              <div class="rewards-stat__value">₱125</div>
              <div class="rewards-stat__label">Rewards Value</div>
            </div>
          </div>
          <div class="rewards-action">
            <Icons name="gift" :size="20" />
            <span>View available rewards</span>
            <Icons name="arrow-right" :size="16" />
          </div>
        </InfoCard>
      </section>

      <!-- Recent Transactions Card -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">Recent Activity</h2>
          <button class="section-link" @click="router.push('/wallet')">See all</button>
        </div>
        
        <InfoCard no-padding>
          <div class="transactions-list">
            <button class="transaction-item">
              <div class="transaction-item__icon transaction-item__icon--sent">
                <Icons name="arrow-up-right" :size="20" />
              </div>
              <div class="transaction-item__info">
                <h4 class="transaction-item__title">Sent to Maria Santos</h4>
                <p class="transaction-item__date">Today, 2:30 PM</p>
              </div>
              <div class="transaction-item__amount transaction-item__amount--debit">-₱500.00</div>
            </button>
            
            <div class="transaction-divider"></div>
            
            <button class="transaction-item">
              <div class="transaction-item__icon transaction-item__icon--received">
                <Icons name="arrow-down-left" :size="20" />
              </div>
              <div class="transaction-item__info">
                <h4 class="transaction-item__title">Cash In via 7-Eleven</h4>
                <p class="transaction-item__date">Yesterday, 4:15 PM</p>
              </div>
              <div class="transaction-item__amount transaction-item__amount--credit">+₱1,000.00</div>
            </button>
            
            <div class="transaction-divider"></div>
            
            <button class="transaction-item">
              <div class="transaction-item__icon transaction-item__icon--utility">
                <Icons name="receipt" :size="20" />
              </div>
              <div class="transaction-item__info">
                <h4 class="transaction-item__title">Meralco Payment</h4>
                <p class="transaction-item__date">Feb 10, 2026</p>
              </div>
              <div class="transaction-item__amount transaction-item__amount--debit">-₱2,450.50</div>
            </button>
          </div>
        </InfoCard>
      </section>

      <!-- Promotions Card -->
      <section class="section">
        <InfoCard
          title="Special Offers"
          subtitle="Exclusive deals for CLiQQ members"
        >
          <div class="promo-grid">
            <div class="promo-item">
              <div class="promo-item__icon">
                <Icons name="percent" :size="24" />
              </div>
              <div class="promo-item__content">
                <h4>20% Off Load</h4>
                <p>Valid until Feb 28</p>
              </div>
            </div>
            <div class="promo-item">
              <div class="promo-item__icon">
                <Icons name="zap" :size="24" />
              </div>
              <div class="promo-item__content">
                <h4>2x Points</h4>
                <p>On bills payment</p>
              </div>
            </div>
          </div>
        </InfoCard>
      </section>

      <!-- Bottom Spacing -->
      <div class="bottom-spacer"></div>
    </div>

    <!-- Buy Load Modal -->
    <BuyLoadModal
      v-if="isBuyLoadModalOpen"
      @close="closeBuyLoadModal"
      @success="handleLoadSuccess"
    />

    <!-- Success Modal -->
    <SuccessModal
      v-if="isSuccessModalOpen"
      :isOpen="isSuccessModalOpen"
      type="load"
      :amount="loadAmount"
      :recipient="recipientInfo"
      @close="closeSuccessModal"
    />
  </div>
</template>

<style scoped lang="scss">
.home-view {
  min-height: 100vh;
  background: var(--color-background);
  padding-top: var(--top-bar-height);

  &__content {
    padding: var(--spacing-2xl) var(--spacing-lg);
    max-width: 600px;
    margin: 0 auto;
  }
}

/* Welcome Header */
.welcome-header {
  margin-bottom: var(--spacing-3xl);

  &__greeting {
    font-size: 14px;
    color: var(--color-text-secondary);
    margin-bottom: 4px;
  }

  &__name {
    font-size: 28px;
    font-weight: 700;
    color: var(--color-text-primary);
  }
}

/* Prominent Balance Display - GoTyme Style */
.balance-display {
  background: linear-gradient(135deg, var(--color-primary) 0%, #E55F00 100%);
  border-radius: var(--radius-xl);
  padding: var(--spacing-3xl);
  margin-bottom: var(--spacing-3xl);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;

  /* Subtle pattern overlay */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }

  &__label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: var(--spacing-sm);
    font-weight: 500;
    position: relative;
  }

  &__amount {
    font-size: 48px;
    font-weight: 700;
    color: white;
    margin-bottom: var(--spacing-md);
    letter-spacing: -1px;
    position: relative;
  }

  &__rewards {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: var(--radius-full);
    font-size: 13px;
    color: white;
    font-weight: 600;
    border: 1px solid rgba(255, 255, 255, 0.3);
    position: relative;
  }
}

/* Section Styling */
.section {
  margin-bottom: var(--spacing-3xl);

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
  }

  &-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-lg);
  }

  &-link {
    background: none;
    border: none;
    color: var(--color-primary);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
}

/* Quick Actions Grid */
.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-md);
}

/* Rewards Content */
.rewards-content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: var(--spacing-lg) 0;
  margin-bottom: var(--spacing-lg);
}

.rewards-stat {
  text-align: center;

  &__value {
    font-size: 28px;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 4px;
  }

  &__label {
    font-size: 13px;
    color: var(--color-text-secondary);
  }
}

.rewards-divider {
  width: 1px;
  height: 40px;
  background: var(--color-divider);
}

.rewards-action {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--color-primary-light);
  border-radius: var(--radius-md);
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 600;
  margin-top: var(--spacing-md);
}

/* Transactions List */
.transactions-list {
  width: 100%;
}

.transaction-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-xl);
  background: none;
  border: none;
  width: 100%;
  cursor: pointer;
  transition: background 0.2s;
  text-align: left;

  &:hover {
    background: var(--color-surface-secondary);
  }

  &:active {
    transform: scale(0.98);
  }

  &__icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    flex-shrink: 0;

    &--sent {
      background: #FEE2E2;
      color: #DC2626;
    }

    &--received {
      background: #D1FAE5;
      color: #059669;
    }

    &--utility {
      background: #E0E7FF;
      color: #4F46E5;
    }
  }

  &__info {
    flex: 1;
    min-width: 0;
  }

  &__title {
    font-size: 15px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 4px;
  }

  &__date {
    font-size: 13px;
    color: var(--color-text-secondary);
    margin: 0;
  }

  &__amount {
    font-size: 16px;
    font-weight: 700;
    text-align: right;
    flex-shrink: 0;

    &--debit {
      color: var(--color-text-primary);
    }

    &--credit {
      color: var(--color-success);
    }
  }
}

.transaction-divider {
  height: 1px;
  background: var(--color-divider);
  margin: 0 var(--spacing-xl);
}

/* Promotions Grid */
.promo-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-md);
}

.promo-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-surface-secondary);
  border-radius: var(--radius-md);

  &__icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-primary-light);
    color: var(--color-primary);
    border-radius: var(--radius-md);
    flex-shrink: 0;
  }

  &__content {
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
      margin: 0;
    }
  }
}

/* Bottom Spacer */
.bottom-spacer {
  height: var(--spacing-4xl);
}

/* Responsive Design */
@media (max-width: 360px) {
  .quick-actions-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
  }

  .balance-display__amount {
    font-size: 40px;
  }
}
</style>
