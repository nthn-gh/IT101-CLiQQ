<script setup lang="ts">
import { ref, computed } from 'vue'
import TopBar from '@/components/TopBar.vue'
import Icons from '@/components/Icons.vue'
import RedemptionModal from '@/components/RedemptionModal.vue'
import LinkRewardsCardModal from '@/components/LinkRewardsCardModal.vue'
import WiFiConversionModal from '@/components/WiFiConversionModal.vue'

type RewardItem = {
  id: string
  title: string
  description: string
  points: number
  icon: string
  badge?: string
}

const rewards: RewardItem[] = [
  {
    id: 'coffee',
    title: '7-Eleven Coffee',
    description: 'Any regular size hot or iced coffee from your nearest 7-Eleven store.',
    points: 150,
    icon: '☕',
    badge: 'Popular',
  },
  {
    id: 'slurpee',
    title: 'Free Slurpee',
    description: 'Any size Slurpee, any flavor. Cool down with 7-Eleven’s signature frozen drink.',
    points: 120,
    icon: '🥤',
    badge: 'Bestseller',
  },
  {
    id: 'hotdog',
    title: 'Big Bite Hot Dog',
    description: 'One free Big Bite hot dog with bun and your choice of toppings.',
    points: 180,
    icon: '🌭',
  },
  {
    id: 'meal-discount',
    title: '₱50 Off Ready-to-Eat Meals',
    description: 'Discount on any ready-to-eat meals including rice bowls, pasta, and sandwiches.',
    points: 200,
    icon: '🍱',
  },
  {
    id: 'snack-pack',
    title: 'Snack Pack Combo',
    description: 'Choose any 3 snack items: chips, cookies, chocolate bars, or candy.',
    points: 250,
    icon: '🍪',
  },
  {
    id: 'big-gulp',
    title: 'Big Gulp + Snack',
    description: 'Free Big Gulp drink plus one snack of your choice.',
    points: 220,
    icon: '🧊',
  },
  {
    id: 'breakfast',
    title: 'Breakfast Combo',
    description: 'Coffee plus pandesal or ensaymada for a quick morning pick-me-up.',
    points: 190,
    icon: '🥐',
  },
  {
    id: 'ice-cream',
    title: 'Free Ice Cream',
    description: 'Any flavor of ice cream from 7-Eleven’s single-serve selection.',
    points: 140,
    icon: '🍦',
  },
  {
    id: 'pizza-hut',
    title: '₱50 Pizza Hut Voucher',
    description: 'Discount voucher valid for dine-in or takeout at participating Pizza Hut branches.',
    points: 300,
    icon: '🍕',
  },
  {
    id: 'jollibee',
    title: 'Jollibee Meal Voucher',
    description: '₱100 off on any meal bundle for dine-in, takeout, or delivery orders.',
    points: 400,
    icon: '🍔',
  },
  {
    id: 'personal-care',
    title: 'Personal Care Bundle',
    description: '₱50 discount on toiletries such as shampoo, soap, toothpaste, or body wash.',
    points: 280,
    icon: '🧴',
  },
  {
    id: 'household',
    title: 'Household Items Discount',
    description: '₱30 off cleaning supplies, tissue, or laundry items at any 7-Eleven store.',
    points: 260,
    icon: '🧺',
  },
  {
    id: 'delivery',
    title: 'Free Delivery',
    description: 'Free delivery on your next 7-Eleven Delivery order with no minimum spend.',
    points: 200,
    icon: '📦',
  },
  {
    id: 'cinema',
    title: 'SM Cinema Ticket',
    description: 'One regular 2D movie ticket valid at participating SM Cinema locations.',
    points: 500,
    icon: '🎬',
  },
  {
    id: 'gaming-credit',
    title: '₱100 Gaming Credit',
    description: 'Digital gaming credit for Steam, PlayStation, or Xbox.',
    points: 600,
    icon: '🎮',
  },
  {
    id: 'shopee',
    title: '₱200 Shopee Voucher',
    description: 'E-commerce voucher valid on most categories with no minimum spend.',
    points: 800,
    icon: '🛒',
  },
  {
    id: 'gcash',
    title: '₱50 GCash Credits',
    description: 'Load credits directly to your GCash account with instant transfer.',
    points: 350,
    icon: '💳',
  },
  {
    id: 'petron',
    title: '₱100 Petron Fuel',
    description: 'Fuel voucher for participating Petron stations nationwide.',
    points: 700,
    icon: '⛽',
  },
  {
    id: 'birthday-special',
    title: 'Birthday Month Special',
    description: 'Free cake slice during your birthday month while stocks last.',
    points: 100,
    icon: '🍰',
  },
]

const availablePoints = ref(1250)
const wifiMB = ref(850) // Current WiFi MB balance
const isCardLinked = ref(false)
const linkedCardNumber = ref('')
const selectedRewardId = ref<string | null>(null)
const rewardPendingConfirmation = ref<RewardItem | null>(null)

const canRedeem = (requiredPoints: number) => {
  return availablePoints.value >= requiredPoints
}

// Redemption modal state
const isModalOpen = ref(false)
const selectedRewardName = ref('')
const selectedRewardPoints = ref(0)
const isRedeemConfirmOpen = ref(false)

// WiFi conversion modal state
const isWiFiModalOpen = ref(false)

// Link card modal state
const isLinkCardModalOpen = ref(false)

const selectReward = (rewardId: string) => {
  selectedRewardId.value = rewardId
}

const openRedeemConfirmation = (reward: RewardItem) => {
  if (!canRedeem(reward.points)) return
  selectedRewardId.value = reward.id
  rewardPendingConfirmation.value = reward
  isRedeemConfirmOpen.value = true
}

const closeRedeemConfirmation = () => {
  isRedeemConfirmOpen.value = false
  rewardPendingConfirmation.value = null
}

const confirmRedeem = () => {
  if (!rewardPendingConfirmation.value || !canRedeem(rewardPendingConfirmation.value.points)) {
    closeRedeemConfirmation()
    return
  }

  availablePoints.value -= rewardPendingConfirmation.value.points
  selectedRewardName.value = rewardPendingConfirmation.value.title
  selectedRewardPoints.value = rewardPendingConfirmation.value.points
  isModalOpen.value = true
  closeRedeemConfirmation()
}

const handleCloseModal = () => {
  isModalOpen.value = false
  selectedRewardName.value = ''
  selectedRewardPoints.value = 0
}

const openLinkCardModal = () => {
  isLinkCardModalOpen.value = true
}

const closeLinkCardModal = () => {
  isLinkCardModalOpen.value = false
}

const handleCardLinked = (cardNumber: string) => {
  isCardLinked.value = true
  linkedCardNumber.value = cardNumber
}

const openWiFiModal = () => {
  isWiFiModalOpen.value = true
}

const closeWiFiModal = () => {
  isWiFiModalOpen.value = false
}

const handleWiFiConversion = (points: number, mb: number) => {
  availablePoints.value -= points
  wifiMB.value += mb
  closeWiFiModal()
}

const maskedCardNumber = computed(() => {
  if (!linkedCardNumber.value) return ''
  const parts = linkedCardNumber.value.split('-')
  if (parts.length === 4) {
    return `****-****-****-${parts[3]}`
  }
  return linkedCardNumber.value
})

const selectedReward = computed(() => {
  return rewards.find((reward) => reward.id === selectedRewardId.value) ?? null
})
</script>

<template>
  <div class="rewards-view">
    <TopBar title="Rewards" />
    
    <div class="rewards-view__content">
      <!-- GoTyme: Big Numbers First -->
      <div class="points-container">
        <div class="points-card">
          <p class="points-label">Available Points</p>
          <h2 class="points-amount">{{ availablePoints.toLocaleString() }}</h2>
          <div class="tier-badge">
            <Icons name="star" :size="18" />
            <span>Gold Member</span>
          </div>
        </div>
      </div>

      <!-- 7-Eleven WiFi Section -->
      <section class="section">
        <div class="wifi-card">
          <div class="wifi-header">
            <div class="wifi-icon-container">
              <span class="wifi-icon">📶</span>
            </div>
            <div class="wifi-info">
              <h3>7-Eleven WiFi</h3>
              <p>Convert points to WiFi data</p>
            </div>
          </div>
          
          <div class="wifi-balance">
            <div class="wifi-stat">
              <span class="wifi-stat-label">Available MB</span>
              <span class="wifi-stat-value">{{ wifiMB.toLocaleString() }} MB</span>
            </div>
            <div class="wifi-conversion-rate">
              <Icons name="info" :size="16" />
              <span>10 points = 100 MB</span>
            </div>
          </div>

          <button class="wifi-convert-btn" @click="openWiFiModal">
            <Icons name="plus" :size="20" />
            Convert Points to WiFi
          </button>
        </div>
      </section>

      <!-- Rewards Card Section -->
      <section class="section" v-if="!isCardLinked">
        <div class="card-link-prompt">
          <div class="icon-container">
            <Icons name="card" :size="32" />
          </div>
          <div class="prompt-content">
            <h3>Link Your Rewards Card</h3>
            <p>Connect your 7-Eleven Rewards card to earn points and unlock exclusive benefits</p>
          </div>
          <button class="link-btn" @click="openLinkCardModal">
            Link Card
            <Icons name="arrow-right" :size="18" />
          </button>
        </div>
      </section>

      <section class="section" v-else>
        <div class="linked-card">
          <div class="card-display">
            <div class="card-mini">
              <div class="card-logo">7-ELEVEN</div>
              <div class="card-number">{{ maskedCardNumber }}</div>
              <div class="card-status">
                <Icons name="check" :size="16" />
                <span>Linked</span>
              </div>
            </div>
          </div>
          <div class="card-benefits">
            <div class="benefit-item">
              <Icons name="star" :size="20" />
              <span>Earning points on every purchase</span>
            </div>
            <div class="benefit-item">
              <Icons name="gift" :size="20" />
              <span>Access to exclusive rewards</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Human-Readable Descriptions -->
      <section class="section">
        <h2 class="section-title">Featured Rewards</h2>
        <p class="section-subtitle">Tap a reward to compare it, then confirm redemption only when you are ready.</p>
        <div class="rewards-grid">
          <article
            v-for="reward in rewards"
            :key="reward.id"
            class="reward-card"
            :class="{
              featured: Boolean(reward.badge),
              'is-selected': selectedRewardId === reward.id,
              'is-disabled': !canRedeem(reward.points),
            }"
            tabindex="0"
            @click="selectReward(reward.id)"
            @keydown.enter.prevent="selectReward(reward.id)"
            @keydown.space.prevent="selectReward(reward.id)"
          >
            <div class="reward-header">
              <div class="reward-icon">{{ reward.icon }}</div>
              <div class="reward-meta">
                <span v-if="reward.badge" class="reward-badge">{{ reward.badge }}</span>
                <span v-if="selectedRewardId === reward.id" class="reward-selected-pill">
                  <Icons name="check" :size="14" />
                  Selected
                </span>
              </div>
            </div>

            <div class="reward-content">
              <h3>{{ reward.title }}</h3>
              <p>{{ reward.description }}</p>
            </div>

            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-value">{{ reward.points }}</span>
                <span class="points-label">points</span>
              </div>

              <button
                class="redeem-btn"
                :class="{ primary: canRedeem(reward.points) }"
                :disabled="!canRedeem(reward.points)"
                @click.stop="openRedeemConfirmation(reward)"
              >
                Redeem
              </button>
            </div>
          </article>
        </div>

        <div v-if="selectedReward" class="reward-selection-summary">
          <div>
            <p class="reward-selection-summary__label">Selected reward</p>
            <strong>{{ selectedReward.title }}</strong>
          </div>
          <span>{{ selectedReward.points }} points</span>
        </div>
      </section>

    <!-- Reward Categories -->
    <section class="section">
      <h2 class="section-title">Browse by Category</h2>
      <div class="category-grid">
        <button class="category-item">
          <div class="category-icon">🍔</div>
          <span>Food & Drinks</span>
        </button>
        <button class="category-item">
          <div class="category-icon">🛒</div>
          <span>Grocery Items</span>
        </button>
        <button class="category-item">
          <div class="category-icon">🎬</div>
          <span>Entertainment</span>
        </button>
        <button class="category-item">
          <div class="category-icon">🛍️</div>
          <span>Shopping</span>
        </button>
        <button class="category-item">
          <div class="category-icon">💳</div>
          <span>E-Wallets</span>
        </button>
        <button class="category-item">
          <div class="category-icon">⛽</div>
          <span>Fuel & Travel</span>
        </button>
      </div>
    </section>

    <!-- Points Activity -->
    <section class="section">
      <h2 class="section-title">Recent Activity</h2>
      <div class="activity-list">
        <div class="activity-item earned">
          <div class="activity-icon">+</div>
          <div class="activity-details">
            <h4>Points Earned</h4>
            <p>Purchase at 7-Eleven SM North</p>
            <span class="activity-date">Today, 2:30 PM</span>
          </div>
          <div class="activity-points positive">+45</div>
        </div>

        <div class="activity-item redeemed">
          <div class="activity-icon">−</div>
          <div class="activity-details">
            <h4>Reward Redeemed</h4>
            <p>Free Slurpee</p>
            <span class="activity-date">Yesterday</span>
          </div>
          <div class="activity-points negative">-120</div>
        </div>

        <div class="activity-item earned">
          <div class="activity-icon">+</div>
          <div class="activity-details">
            <h4>Points Earned</h4>
            <p>Purchase at 7-Eleven Megamall</p>
            <span class="activity-date">Feb 16, 2026</span>
          </div>
          <div class="activity-points positive">+30</div>
        </div>

        <div class="activity-item bonus">
          <div class="activity-icon">🎁</div>
          <div class="activity-details">
            <h4>Bonus Points</h4>
            <p>Welcome Gold Member benefit</p>
            <span class="activity-date">Feb 15, 2026</span>
          </div>
          <div class="activity-points positive">+200</div>
        </div>
      </div>
    </section>

    <!-- Points Info -->
    <section class="section">
      <div class="info-card primary">
        <h3>💡 How to Earn More Points</h3>
        <ul>
          <li><strong>Every Purchase:</strong> Earn 1 point for every ₱20 spent</li>
          <li><strong>Featured Products:</strong> Up to 3x points on select items</li>
          <li><strong>Weekly Deals:</strong> Double points every Tuesday</li>
          <li><strong>Birthday Bonus:</strong> 100 free points on your birthday month</li>
          <li><strong>Bill Payments:</strong> 5 points for every bill payment</li>
          <li><strong>CLiQQ Delivery:</strong> 10 bonus points per order</li>
        </ul>
      </div>

      <div class="info-card warning">
        <h3>⏰ Points Expiry</h3>
        <p>Your points expire 12 months from the date earned. Check your points history to see expiry dates.</p>
        <div class="expiry-alert">
          <strong>150 points</strong> expiring on <strong>March 15, 2026</strong>
        </div>
      </div>

      <div class="info-card">
        <h3>🏆 Member Tiers</h3>
        <div class="tier-list">
          <div class="tier-item">
            <span class="tier-badge silver">Silver</span>
            <span class="tier-requirement">0 - 999 points</span>
          </div>
          <div class="tier-item active">
            <span class="tier-badge gold">Gold</span>
            <span class="tier-requirement">1,000 - 4,999 points</span>
          </div>
          <div class="tier-item">
            <span class="tier-badge platinum">Platinum</span>
            <span class="tier-requirement">5,000+ points</span>
          </div>
        </div>
        <p class="tier-progress">You need <strong>3,750 more points</strong> to reach Platinum tier</p>
      </div>
    </section>
    </div>

    <!-- Redemption Modal -->
    <RedemptionModal 
      :isOpen="isModalOpen"
      :rewardName="selectedRewardName"
      :rewardPoints="selectedRewardPoints"
      @close="handleCloseModal"
    />

    <!-- Link Rewards Card Modal -->
    <LinkRewardsCardModal 
      v-if="isLinkCardModalOpen"
      @close="closeLinkCardModal"
      @linked="handleCardLinked"
    />

    <!-- WiFi Conversion Modal -->
    <WiFiConversionModal
      v-if="isWiFiModalOpen"
      :availablePoints="availablePoints"
      :currentMB="wifiMB"
      @close="closeWiFiModal"
      @convert="handleWiFiConversion"
    />

    <Transition name="modal">
      <div v-if="isRedeemConfirmOpen && rewardPendingConfirmation" class="confirm-overlay" @click="closeRedeemConfirmation">
        <div class="confirm-modal" @click.stop>
          <div class="confirm-modal__header">
            <div class="confirm-modal__icon">
              <Icons name="gift" :size="24" />
            </div>
            <button class="confirm-modal__close" @click="closeRedeemConfirmation">
              <Icons name="x" :size="20" />
            </button>
          </div>

          <h3>Confirm reward redemption</h3>
          <p class="confirm-modal__copy">
            You’re about to redeem <strong>{{ rewardPendingConfirmation.title }}</strong>.
          </p>

          <div class="confirm-modal__summary">
            <div class="confirm-row">
              <span>Points to use</span>
              <strong>{{ rewardPendingConfirmation.points }}</strong>
            </div>
            <div class="confirm-row">
              <span>Balance after redemption</span>
              <strong>{{ (availablePoints - rewardPendingConfirmation.points).toLocaleString() }}</strong>
            </div>
          </div>

          <div class="confirm-modal__actions">
            <button class="confirm-btn secondary" @click="closeRedeemConfirmation">Cancel</button>
            <button class="confirm-btn primary" @click="confirmRedeem">Confirm</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.rewards-view {
  min-height: 100vh;
  background: var(--color-background);
  padding-top: var(--top-bar-height);

  &__content {
    padding: var(--spacing-2xl) var(--spacing-xl);
    padding-bottom: calc(var(--bottom-nav-height) + var(--spacing-2xl));
  }
}

/* GoTyme: Big Points Display */
.points-container {
  margin-bottom: var(--spacing-3xl);
}

.points-card {
  background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%);
  border-radius: var(--radius-xl);
  padding: var(--spacing-4xl) var(--spacing-3xl);
  text-align: center;
  color: white;
  box-shadow: var(--shadow-md);

  .points-label {
    font-size: 14px;
    opacity: 0.9;
    margin-bottom: var(--spacing-md);
    font-weight: 500;
  }

  .points-amount {
    font-size: 56px;
    font-weight: 700;
    margin-bottom: var(--spacing-lg);
    letter-spacing: -2px;
  }

  .tier-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-full);
    font-size: 14px;
    font-weight: 600;
    backdrop-filter: blur(10px);
    color: white;
  }
}

/* WiFi Card */
.wifi-card {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border-radius: var(--radius-xl);
  padding: var(--spacing-3xl);
  color: white;
  box-shadow: var(--shadow-md);
}

.wifi-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.wifi-icon-container {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  backdrop-filter: blur(10px);

  .wifi-icon {
    font-size: 32px;
    line-height: 1;
  }
}

.wifi-info {
  h3 {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 4px 0;
    color: white;
  }

  p {
    font-size: 14px;
    margin: 0;
    color: rgba(255, 255, 255, 0.9);
  }
}

.wifi-balance {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-md);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.wifi-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);

  &-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
  }

  &-value {
    font-size: 24px;
    font-weight: 700;
    color: white;
  }
}

.wifi-conversion-rate {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
}

.wifi-convert-btn {
  width: 100%;
  padding: var(--spacing-lg);
  background: white;
  color: #2563EB;
  border: none;
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.95);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
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

/* Rewards Card Section */
.card-link-prompt {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  background: linear-gradient(135deg, #FFF7ED, #FFEDD5);
  border: 2px solid #FED7AA;
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);

  .icon-container {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #FF6B1A, #D85614);
    border-radius: var(--radius-md);
    color: white;
    flex-shrink: 0;
  }

  .prompt-content {
    flex: 1;

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: 4px;
    }

    p {
      font-size: 13px;
      color: var(--color-text-secondary);
      line-height: 1.4;
    }
  }

  .link-btn {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md) var(--spacing-lg);
    background: linear-gradient(135deg, #FF6B1A, #D85614);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 107, 26, 0.3);
    }

    &:active {
      transform: scale(0.98);
    }
  }
}

.linked-card {
  background: var(--color-surface);
  border: 2px solid #10B981;
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);

  .card-display {
    margin-bottom: var(--spacing-lg);
  }

  .card-mini {
    background: linear-gradient(135deg, #FF6B1A 0%, #D85614 100%);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    color: white;
    position: relative;

    .card-logo {
      font-size: 14px;
      font-weight: 900;
      letter-spacing: 1px;
      margin-bottom: var(--spacing-md);
    }

    .card-number {
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 2px;
      font-family: 'Courier New', monospace;
      margin-bottom: var(--spacing-sm);
    }

    .card-status {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: rgba(255, 255, 255, 0.2);
      padding: 4px 10px;
      border-radius: var(--radius-full);
      font-size: 12px;
      font-weight: 600;
    }
  }

  .card-benefits {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .benefit-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 14px;
    color: var(--color-text-secondary);

    svg {
      color: #10B981;
      flex-shrink: 0;
    }
  }
}

/* Rewards Grid */
.rewards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--spacing-md);
}

/* Card-Based Layout */
.reward-card {
  background: var(--color-surface);
  border: 2px solid var(--color-divider);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  outline: none;

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px rgba(255, 107, 0, 0.16);
  }

  &.featured {
    background: linear-gradient(135deg, var(--color-surface) 0%, #FFF8EE 100%);
  }

  &.is-selected {
    border-color: var(--color-primary);
    box-shadow: 0 16px 32px rgba(255, 107, 0, 0.12);
    background: linear-gradient(135deg, var(--color-surface) 0%, #FFF6EC 100%);
  }

  &.is-disabled {
    opacity: 0.76;
  }

  .reward-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--spacing-md);
  }

  .reward-icon {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-surface-secondary);
    border-radius: var(--radius-lg);
    font-size: 30px;
    flex-shrink: 0;
  }

  &.featured .reward-icon {
    background: var(--color-primary-light);
  }

  .reward-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    min-height: 56px;
  }

  .reward-badge {
    padding: 6px 12px;
    background: var(--color-primary);
    color: white;
    border-radius: var(--radius-full);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .reward-selected-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    background: rgba(255, 107, 0, 0.12);
    color: var(--color-primary);
    border-radius: var(--radius-full);
    font-size: 12px;
    font-weight: 700;
  }

  .reward-content {
    h3 {
      font-size: 17px;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 6px;
    }

    p {
      font-size: 14px;
      color: var(--color-text-secondary);
      line-height: 1.5;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  .reward-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-md);
    margin-top: auto;
  }

  .reward-points {
    display: flex;
    align-items: baseline;
    gap: 6px;

    .points-value {
      font-size: 24px;
      font-weight: 700;
      color: var(--color-primary);
    }

    .points-label {
      font-size: 13px;
      color: var(--color-text-secondary);
      font-weight: 500;
    }
  }
}

.redeem-btn {
  padding: 10px 18px;
  background: var(--color-surface);
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background: var(--color-primary-light);
  }

  &:active {
    transform: scale(0.95);
  }

  &.primary {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);

    &:hover {
      background: #E55F00;
    }
  }

  &:disabled {
    background: #F3F4F6;
    color: #9CA3AF;
    border-color: #D1D5DB;
    cursor: not-allowed;
    opacity: 0.6;

    &:hover {
      background: #F3F4F6;
      transform: none;
    }

    &:active {
      transform: none;
    }
  }
}

.section-subtitle {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: -4px 0 var(--spacing-lg);
}

.reward-selection-summary {
  margin-top: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 107, 0, 0.18);
  background: #FFF9F2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);

  &__label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-text-tertiary);
    margin-bottom: 4px;
  }

  strong,
  span {
    color: var(--color-text-primary);
  }

  span {
    font-weight: 700;
    white-space: nowrap;
  }
}

.confirm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  z-index: 10001;
}

.confirm-modal {
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.2);

  h3 {
    font-size: 22px;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-lg);
  }

  &__icon {
    width: 48px;
    height: 48px;
    border-radius: 16px;
    background: rgba(255, 107, 0, 0.12);
    color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__close {
    width: 36px;
    height: 36px;
    border-radius: 999px;
    border: none;
    background: var(--color-surface-secondary);
    color: var(--color-text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  &__copy {
    font-size: 15px;
    line-height: 1.6;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-lg);
  }

  &__summary {
    border-radius: var(--radius-lg);
    background: var(--color-surface-secondary);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
  }

  &__actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-sm);
  }
}

.confirm-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  font-size: 14px;
  color: var(--color-text-secondary);

  strong {
    color: var(--color-text-primary);
  }

  &:not(:last-child) {
    margin-bottom: var(--spacing-sm);
  }
}

.confirm-btn {
  min-height: 48px;
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &.secondary {
    background: white;
    color: var(--color-text-primary);
    border: 1px solid var(--color-divider);
  }

  &.primary {
    border: none;
    background: var(--color-primary);
    color: white;
  }
}

/* Info Card */
.info-card {
  background: var(--color-surface);
  border: 2px solid var(--color-divider);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);

  &:last-child {
    margin-bottom: 0;
  }

  &.primary {
    border-color: var(--color-primary);
    background: linear-gradient(135deg, var(--color-surface) 0%, #FFF8EE 100%);
  }

  &.warning {
    border-color: #FCD34D;
    background: #FFFBEB;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-md);
  }

  p {
    font-size: 14px;
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin-bottom: var(--spacing-md);
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);

    li {
      font-size: 14px;
      color: var(--color-text-secondary);
      padding-left: var(--spacing-lg);
      position: relative;
      line-height: 1.6;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--color-primary);
        font-weight: 700;
      }

      strong {
        color: var(--color-text-primary);
        font-weight: 600;
      }
    }
  }
}

/* Activity List */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.activity-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border: 2px solid var(--color-divider);
  border-radius: var(--radius-lg);
  transition: all 0.2s;

  &:hover {
    box-shadow: var(--shadow-sm);
  }

  .activity-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    font-size: 24px;
    font-weight: 700;
    flex-shrink: 0;
  }

  &.earned .activity-icon {
    background: #D1FAE5;
    color: #059669;
  }

  &.redeemed .activity-icon {
    background: #FEE2E2;
    color: #DC2626;
  }

  &.bonus .activity-icon {
    background: var(--color-primary-light);
    font-size: 28px;
  }

  .activity-details {
    flex: 1;
    min-width: 0;

    h4 {
      font-size: 15px;
      font-weight: 600;
      color: var(--color-text-primary);
      margin-bottom: 4px;
    }

    p {
      font-size: 14px;
      color: var(--color-text-secondary);
      margin-bottom: 4px;
    }

    .activity-date {
      font-size: 12px;
      color: var(--color-text-tertiary);
    }
  }

  .activity-points {
    font-size: 18px;
    font-weight: 700;
    flex-shrink: 0;

    &.positive {
      color: #059669;
    }

    &.negative {
      color: #DC2626;
    }
  }
}

/* Expiry Alert */
.expiry-alert {
  padding: var(--spacing-md);
  background: white;
  border: 2px solid #FCD34D;
  border-radius: var(--radius-md);
  text-align: center;
  font-size: 14px;
  color: var(--color-text-secondary);

  strong {
    color: var(--color-warning);
    font-weight: 700;
  }
}

/* Tier List */
.tier-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.tier-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  background: var(--color-surface-secondary);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  transition: all 0.2s;

  &.active {
    border-color: var(--color-primary);
    background: var(--color-primary-light);
  }

  .tier-badge {
    padding: 6px 16px;
    border-radius: var(--radius-full);
    font-size: 13px;
    font-weight: 600;
    color: white;

    &.silver {
      background: linear-gradient(135deg, #94A3B8 0%, #64748B 100%);
    }

    &.gold {
      background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%);
    }

    &.platinum {
      background: linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%);
    }
  }

  .tier-requirement {
    font-size: 13px;
    color: var(--color-text-secondary);
    font-weight: 500;
  }
}

.tier-progress {
  font-size: 14px;
  color: var(--color-text-secondary);
  text-align: center;
  margin: 0;

  strong {
    color: var(--color-primary);
    font-weight: 700;
  }
}

/* Category Grid */
.category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xl);
  background: var(--color-surface);
  border: 2px solid var(--color-divider);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    border-color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }

  &:active {
    transform: scale(0.98);
  }

  .category-icon {
    font-size: 32px;
    margin-bottom: var(--spacing-xs);
  }

  span {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-primary);
  }
}
</style>
