<script setup lang="ts">
import { ref, computed } from 'vue'
import TopBar from '@/components/TopBar.vue'
import Icons from '@/components/Icons.vue'
import RedemptionModal from '@/components/RedemptionModal.vue'

const availablePoints = ref(1250)

const canRedeem = (requiredPoints: number) => {
  return availablePoints.value >= requiredPoints
}

// Redemption modal state
const isModalOpen = ref(false)
const selectedRewardName = ref('')
const selectedRewardPoints = ref(0)

const handleRedeem = (rewardName: string, points: number) => {
  if (canRedeem(points)) {
    selectedRewardName.value = rewardName
    selectedRewardPoints.value = points
    isModalOpen.value = true
  }
}

const handleCloseModal = () => {
  // Deduct points when modal closes
  availablePoints.value -= selectedRewardPoints.value
  isModalOpen.value = false
  selectedRewardName.value = ''
  selectedRewardPoints.value = 0
}
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

      <!-- Human-Readable Descriptions -->
      <section class="section">
        <h2 class="section-title">Featured Rewards</h2>
        <div class="rewards-grid">
        <div class="reward-card featured">
          <div class="reward-header">
            <div class="reward-icon">☕</div>
            <span class="reward-badge">Popular</span>
          </div>
          <div class="reward-content">
            <h3>7-Eleven Coffee</h3>
            <p>Any regular size hot or iced coffee from your nearest 7-Eleven store</p>
            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-value">150</span>
                <span class="points-label">points</span>
              </div>
              <button class="redeem-btn" :class="{ primary: canRedeem(150) }" :disabled="!canRedeem(150)" @click.stop="handleRedeem('7-Eleven Coffee', 150)">Redeem</button>
            </div>
          </div>
        </div>

        <button class="reward-card featured">
          <div class="reward-header">
            <div class="reward-icon">🥤</div>
            <span class="reward-badge">Bestseller</span>
          </div>
          <div class="reward-content">
            <h3>Free Slurpee</h3>
            <p>Any size Slurpee, any flavor. Cool down with 7-Eleven's signature frozen drink</p>
            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-value">120</span>
                <span class="points-label">points</span>
              </div>
              <button class="redeem-btn" :class="{ primary: canRedeem(120) }" :disabled="!canRedeem(120)" @click.stop="handleRedeem('Free Slurpee', 120)">Redeem</button>
            </div>
          </div>
        </button>

        <button class="reward-card">
          <div class="reward-header">
            <div class="reward-icon">🌭</div>
          </div>
          <div class="reward-content">
            <h3>Big Bite Hot Dog</h3>
            <p>One free Big Bite hot dog with bun and your choice of toppings</p>
            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-value">180</span>
                <span class="points-label">points</span>
              </div>
              <button class="redeem-btn" :class="{ primary: canRedeem(180) }" :disabled="!canRedeem(180)" @click.stop="handleRedeem('Big Bite Hot Dog', 180)">Redeem</button>
            </div>
          </div>
        </button>

        <button class="reward-card">
          <div class="reward-header">
            <div class="reward-icon">🍱</div>
          </div>
          <div class="reward-content">
            <h3>₱50 Off Ready-to-Eat Meals</h3>
            <p>Discount on any ready-to-eat meals including rice bowls, pasta, and sandwiches</p>
            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-value">200</span>
                <span class="points-label">points</span>
              </div>
              <button class="redeem-btn" :class="{ primary: canRedeem(200) }" :disabled="!canRedeem(200)" @click.stop="handleRedeem('₱50 Off Ready-to-Eat Meals', 200)">Redeem</button>
            </div>
          </div>
        </button>

        <button class="reward-card">
          <div class="reward-header">
            <div class="reward-icon">🍪</div>
          </div>
          <div class="reward-content">
            <h3>Snack Pack Combo</h3>
            <p>Choose any 3 snack items: chips, cookies, chocolate bars, or candy</p>
            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-value">250</span>
                <span class="points-label">points</span>
              </div>
              <button class="redeem-btn" :class="{ primary: canRedeem(250) }" :disabled="!canRedeem(250)" @click.stop="handleRedeem('Snack Pack Combo', 250)">Redeem</button>
            </div>
          </div>
        </button>

        <button class="reward-card">
          <div class="reward-header">
            <div class="reward-icon">🧊</div>
          </div>
          <div class="reward-content">
            <h3>Big Gulp + Snack</h3>
            <p>Free Big Gulp drink (any flavor) plus one snack of your choice</p>
            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-value">220</span>
                <span class="points-label">points</span>
              </div>
              <button class="redeem-btn" :class="{ primary: canRedeem(220) }" :disabled="!canRedeem(220)" @click.stop="handleRedeem('Big Gulp', 220)">Redeem</button>
            </div>
          </div>
        </button>

        <button class="reward-card">
          <div class="reward-header">
            <div class="reward-icon">🥐</div>
          </div>
          <div class="reward-content">
            <h3>Breakfast Combo</h3>
            <p>Coffee + Pandesal or Ensaymada. Perfect way to start your morning</p>
            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-value">190</span>
                <span class="points-label">points</span>
              </div>
              <button class="redeem-btn" :class="{ primary: canRedeem(190) }" :disabled="!canRedeem(190)" @click.stop="handleRedeem('Breakfast Combo', 190)">Redeem</button>
            </div>
          </div>
        </button>

        <button class="reward-card">
          <div class="reward-header">
            <div class="reward-icon">🍦</div>
          </div>
          <div class="reward-content">
            <h3>Free Ice Cream</h3>
            <p>Any flavor of ice cream from 7-Eleven's selection. Single serving</p>
            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-value">140</span>
                <span class="points-label">points</span>
              </div>
              <button class="redeem-btn" :class="{ primary: canRedeem(140) }" :disabled="!canRedeem(140)" @click.stop="handleRedeem('Ice Cream', 140)">Redeem</button>
            </div>
          </div>
        </button>

        <button class="reward-card">
          <div class="reward-header">
            <div class="reward-icon">🍕</div>
          </div>
          <div class="reward-content">
            <h3>₱50 Pizza Hut Voucher</h3>
            <p>Discount voucher valid for dine-in or takeout at all Pizza Hut branches nationwide</p>
            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-value">300</span>
                <span class="points-label">points</span>
              </div>
              <button class="redeem-btn" :class="{ primary: canRedeem(300) }" :disabled="!canRedeem(300)" @click.stop="handleRedeem('₱100 Pizza Hut Voucher', 300)">Redeem</button>
            </div>
          </div>
        </button>

        <button class="reward-card">
          <div class="reward-header">
            <div class="reward-icon">🍔</div>
          </div>
          <div class="reward-content">
            <h3>Jollibee Meal Voucher</h3>
            <p>₱100 off on any meal bundle. Valid for dine-in, takeout, or delivery orders</p>
            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-value">400</span>
                <span class="points-label">points</span>
              </div>
              <button class="redeem-btn" :class="{ primary: canRedeem(400) }" :disabled="!canRedeem(400)" @click.stop="handleRedeem('₱150 Jollibee Meal', 400)">Redeem</button>
            </div>
          </div>
        </button>

        <button class="reward-card">
          <div class="reward-header">
            <div class="reward-icon">🧴</div>
          </div>
          <div class="reward-content">
            <h3>Personal Care Bundle</h3>
            <p>₱50 discount on toiletries: shampoo, soap, toothpaste, or body wash</p>
            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-value">280</span>
                <span class="points-label">points</span>
              </div>
              <button class="redeem-btn" :class="{ primary: canRedeem(280) }" :disabled="!canRedeem(280)" @click.stop="handleRedeem('Personal Care Bundle', 280)">Redeem</button>
            </div>
          </div>
        </button>

        <button class="reward-card">
          <div class="reward-header">
            <div class="reward-icon">🧺</div>
          </div>
          <div class="reward-content">
            <h3>Household Items Discount</h3>
            <p>₱30 off on cleaning supplies, tissue, or laundry items at any 7-Eleven store</p>
            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-value">260</span>
                <span class="points-label">points</span>
              </div>
              <button class="redeem-btn" :class="{ primary: canRedeem(260) }" :disabled="!canRedeem(260)" @click.stop="handleRedeem('Household Items Discount', 260)">Redeem</button>
            </div>
          </div>
        </button>

        <button class="reward-card">
          <div class="reward-header">
            <div class="reward-icon">📦</div>
          </div>
          <div class="reward-content">
            <h3>Free Delivery</h3>
            <p>Free delivery on your next 7-Eleven Delivery order. No minimum purchase required</p>
            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-value">200</span>
                <span class="points-label">points</span>
              </div>
              <button class="redeem-btn" :class="{ primary: canRedeem(200) }" :disabled="!canRedeem(200)" @click.stop="handleRedeem('Free Delivery', 200)">Redeem</button>
            </div>
          </div>
        </button>

        <button class="reward-card">
          <div class="reward-header">
            <div class="reward-icon">🎬</div>
          </div>
          <div class="reward-content">
            <h3>SM Cinema Ticket</h3>
            <p>One regular 2D movie ticket valid at all SM Cinema locations. Booking fee may apply</p>
            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-value">500</span>
                <span class="points-label">points</span>
              </div>
              <button class="redeem-btn" :class="{ primary: canRedeem(500) }" :disabled="!canRedeem(500)" @click.stop="handleRedeem('SM Cinema Ticket', 500)">Redeem</button>
            </div>
          </div>
        </button>

        <button class="reward-card">
          <div class="reward-header">
            <div class="reward-icon">🎮</div>
          </div>
          <div class="reward-content">
            <h3>₱100 Gaming Credit</h3>
            <p>Digital gaming credit for Steam, PlayStation, or Xbox. Perfect for gamers</p>
            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-value">600</span>
                <span class="points-label">points</span>
              </div>
              <button class="redeem-btn" :class="{ primary: canRedeem(600) }" :disabled="!canRedeem(600)" @click.stop="handleRedeem('₱100 Gaming Credit', 600)">Redeem</button>
            </div>
          </div>
        </button>

        <button class="reward-card">
          <div class="reward-header">
            <div class="reward-icon">🛒</div>
          </div>
          <div class="reward-content">
            <h3>₱200 Shopee Voucher</h3>
            <p>E-commerce voucher for Shopee. Valid on all categories with no minimum spend</p>
            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-value">800</span>
                <span class="points-label">points</span>
              </div>
              <button class="redeem-btn" :class="{ primary: canRedeem(800) }" :disabled="!canRedeem(800)" @click.stop="handleRedeem('₱200 Shopee Voucher', 800)">Redeem</button>
            </div>
          </div>
        </button>

        <button class="reward-card">
          <div class="reward-header">
            <div class="reward-icon">💳</div>
          </div>
          <div class="reward-content">
            <h3>₱50 GCash Credits</h3>
            <p>Load credits directly to your GCash account. Instant transfer</p>
            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-value">350</span>
                <span class="points-label">points</span>
              </div>
              <button class="redeem-btn" :class="{ primary: canRedeem(350) }" :disabled="!canRedeem(350)" @click.stop="handleRedeem('₱50 GCash Credits', 350)">Redeem</button>
            </div>
          </div>
        </button>

        <button class="reward-card">
          <div class="reward-header">
            <div class="reward-icon">⛽</div>
          </div>
          <div class="reward-content">
            <h3>₱100 Petron Fuel</h3>
            <p>Fuel voucher for Petron stations nationwide. Valid for all fuel types</p>
            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-value">700</span>
                <span class="points-label">points</span>
              </div>
              <button class="redeem-btn" :class="{ primary: canRedeem(700) }" :disabled="!canRedeem(700)" @click.stop="handleRedeem('₱100 Petron Fuel', 700)">Redeem</button>
            </div>
          </div>
        </button>

        <button class="reward-card">
          <div class="reward-header">
            <div class="reward-icon">🍰</div>
          </div>
          <div class="reward-content">
            <h3>Birthday Month Special</h3>
            <p>Free cake slice during your birthday month. Valid on all cake variants available</p>
            <div class="reward-footer">
              <div class="reward-points">
                <span class="points-value">100</span>
                <span class="points-label">points</span>
              </div>
              <button class="redeem-btn" :class="{ primary: canRedeem(100) }" :disabled="!canRedeem(100)" @click.stop="handleRedeem('Birthday Month Special', 100)">Redeem</button>
            </div>
          </div>
        </button>
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

/* Rewards Grid */
.rewards-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

/* Card-Based Layout */
.reward-card {
  background: var(--color-surface);
  border: 2px solid var(--color-divider);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
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

  &.featured {
    border-color: var(--color-primary);
    background: linear-gradient(135deg, var(--color-surface) 0%, #FFF8EE 100%);
  }

  .reward-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-lg);
  }

  .reward-icon {
    width: 72px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-surface-secondary);
    border-radius: var(--radius-lg);
    font-size: 40px;
  }

  &.featured .reward-icon {
    background: var(--color-primary-light);
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

  .reward-content {
    h3 {
      font-size: 18px;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-sm);
    }

    p {
      font-size: 14px;
      color: var(--color-text-secondary);
      line-height: 1.6;
      margin-bottom: var(--spacing-xl);
    }
  }

  .reward-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-md);
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
  padding: 12px 24px;
  background: var(--color-surface);
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-md);
  font-size: 15px;
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
