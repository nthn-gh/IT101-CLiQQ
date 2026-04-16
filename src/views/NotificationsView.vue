<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '@/components/TopBar.vue'
import Icons from '@/components/Icons.vue'

const router = useRouter()
const goBack = () => router.back()

// Transaction Notifications
const transactionsEnabled = ref(true)
const paymentSuccess = ref(true)
const paymentFailed = ref(true)
const loadWallet = ref(true)
const sendMoney = ref(true)

// Promotions & Rewards
const promotionsEnabled = ref(true)
const newDeals = ref(true)
const pointsExpiring = ref(true)
const rewardUnlocked = ref(false)
const specialOffers = ref(true)

// Security Alerts
const securityEnabled = ref(true)
const loginAttempt = ref(true)
const passwordChange = ref(true)
const deviceAdded = ref(true)

// Reminders
const remindersEnabled = ref(true)
const billReminders = ref(true)
const paymentDue = ref(true)
const lowBalance = ref(false)

// Notification Methods
const pushEnabled = ref(true)
const emailEnabled = ref(true)
const smsEnabled = ref(false)

const mockNotifications = [
  {
    id: 1,
    category: 'Transaction',
    title: 'Buy Load successful',
    message: 'Your Smart/TNT/Sun purchase for GIGA99 was completed for 0917-123-4567.',
    time: 'Today, 4:20 PM',
    unread: true,
    icon: 'phone',
  },
  {
    id: 2,
    category: 'Rewards',
    title: '150 points expiring soon',
    message: 'Use your points before April 30, 2026 to avoid losing them.',
    time: 'Today, 11:05 AM',
    unread: true,
    icon: 'gift',
  },
  {
    id: 3,
    category: 'Security',
    title: 'New login detected',
    message: 'Your account was accessed on a Vivo Android device in Quezon City.',
    time: 'Yesterday, 8:42 PM',
    unread: false,
    icon: 'lock',
  },
  {
    id: 4,
    category: 'Promo',
    title: 'Double points Friday is live',
    message: 'Earn 2x CLiQQ points on participating in-store purchases today.',
    time: 'Yesterday, 7:15 AM',
    unread: false,
    icon: 'star',
  },
]
</script>

<template>
  <div class="notifications-view">
    <TopBar title="Notifications" :show-back="true" @back="goBack" />
    
    <div class="notifications-view__content">
      <section class="section">
        <div class="section-header section-header--stacked">
          <div>
            <h2 class="section-title">Recent Notifications</h2>
            <p class="section-subtitle">Mock alerts to validate the bell flow and notifications layout.</p>
          </div>
          <span class="notification-count">{{ mockNotifications.filter(item => item.unread).length }} new</span>
        </div>

        <div class="feed-list">
          <article
            v-for="notification in mockNotifications"
            :key="notification.id"
            class="feed-item"
            :class="{ 'feed-item--unread': notification.unread }"
          >
            <div class="feed-item__icon">
              <Icons :name="notification.icon" :size="18" />
            </div>
            <div class="feed-item__content">
              <div class="feed-item__meta">
                <span class="feed-item__category">{{ notification.category }}</span>
                <span class="feed-item__time">{{ notification.time }}</span>
              </div>
              <h3>{{ notification.title }}</h3>
              <p>{{ notification.message }}</p>
            </div>
            <span v-if="notification.unread" class="feed-item__dot"></span>
          </article>
        </div>
      </section>

      <!-- Notification Methods -->
      <section class="section">
        <h2 class="section-title">Notification Methods</h2>
        <div class="settings-list">
          <div class="setting-item toggle">
            <div class="setting-icon">
              <Icons name="bell" :size="20" />
            </div>
            <div class="setting-content">
              <h4>Push Notifications</h4>
              <p>Receive alerts on this device</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="pushEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-item toggle">
            <div class="setting-icon">
              <span class="icon-text">📧</span>
            </div>
            <div class="setting-content">
              <h4>Email Notifications</h4>
              <p>Send updates to your email</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="emailEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-item toggle">
            <div class="setting-icon">
              <span class="icon-text">💬</span>
            </div>
            <div class="setting-content">
              <h4>SMS Notifications</h4>
              <p>Receive text messages</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="smsEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </section>

      <!-- Transaction Notifications -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">Transactions</h2>
          <label class="toggle-switch">
            <input type="checkbox" v-model="transactionsEnabled" />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="settings-list" :class="{ disabled: !transactionsEnabled }">
          <div class="setting-item toggle">
            <div class="setting-content">
              <h4>Payment Successful</h4>
              <p>Notify when payment completes</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="paymentSuccess" :disabled="!transactionsEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-item toggle">
            <div class="setting-content">
              <h4>Payment Failed</h4>
              <p>Alert on transaction errors</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="paymentFailed" :disabled="!transactionsEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-item toggle">
            <div class="setting-content">
              <h4>Wallet Load</h4>
              <p>Confirm money added to wallet</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="loadWallet" :disabled="!transactionsEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-item toggle">
            <div class="setting-content">
              <h4>Send Money</h4>
              <p>Notify when transfer completes</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="sendMoney" :disabled="!transactionsEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </section>

      <!-- Promotions & Rewards -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">Promotions & Rewards</h2>
          <label class="toggle-switch">
            <input type="checkbox" v-model="promotionsEnabled" />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="settings-list" :class="{ disabled: !promotionsEnabled }">
          <div class="setting-item toggle">
            <div class="setting-content">
              <h4>New Deals & Offers</h4>
              <p>Get notified of new promotions</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="newDeals" :disabled="!promotionsEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-item toggle">
            <div class="setting-content">
              <h4>Points Expiring Soon</h4>
              <p>Reminder before points expire</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="pointsExpiring" :disabled="!promotionsEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-item toggle">
            <div class="setting-content">
              <h4>Reward Unlocked</h4>
              <p>Alert when you earn new rewards</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="rewardUnlocked" :disabled="!promotionsEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-item toggle">
            <div class="setting-content">
              <h4>Special Member Offers</h4>
              <p>Exclusive deals for your tier</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="specialOffers" :disabled="!promotionsEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </section>

      <!-- Security Alerts -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">Security Alerts</h2>
          <label class="toggle-switch">
            <input type="checkbox" v-model="securityEnabled" />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="settings-list" :class="{ disabled: !securityEnabled }">
          <div class="setting-item toggle">
            <div class="setting-content">
              <h4>Login Attempt</h4>
              <p>Alert on new login activity</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="loginAttempt" :disabled="!securityEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-item toggle">
            <div class="setting-content">
              <h4>Password Changed</h4>
              <p>Confirm password updates</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="passwordChange" :disabled="!securityEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-item toggle">
            <div class="setting-content">
              <h4>Device Added</h4>
              <p>New device linked to account</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="deviceAdded" :disabled="!securityEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </section>

      <!-- Reminders -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">Reminders</h2>
          <label class="toggle-switch">
            <input type="checkbox" v-model="remindersEnabled" />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="settings-list" :class="{ disabled: !remindersEnabled }">
          <div class="setting-item toggle">
            <div class="setting-content">
              <h4>Bill Payment Due</h4>
              <p>Remind before due dates</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="billReminders" :disabled="!remindersEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-item toggle">
            <div class="setting-content">
              <h4>Scheduled Payment</h4>
              <p>Before auto-payment processes</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="paymentDue" :disabled="!remindersEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-item toggle">
            <div class="setting-content">
              <h4>Low Balance Alert</h4>
              <p>Warning when balance is low</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="lowBalance" :disabled="!remindersEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.notifications-view {
  min-height: 100vh;
  background: var(--color-background);
  padding-top: var(--top-bar-height);

  &__content {
    padding: var(--spacing-2xl) var(--spacing-xl);
    padding-bottom: calc(var(--bottom-nav-height) + var(--spacing-2xl));
  }
}

/* Section */
.section {
  margin-bottom: var(--spacing-3xl);

  &-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--color-text-primary);
  }

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
  }
}

.section-subtitle {
  margin-top: 6px;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.section-header--stacked {
  align-items: flex-start;
}

.notification-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 58px;
  padding: 6px 10px;
  border-radius: var(--radius-full);
  background: rgba(255, 107, 0, 0.12);
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 700;
}

.feed-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.feed-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-divider);
  box-shadow: var(--shadow-xs);

  &--unread {
    border-color: rgba(255, 107, 0, 0.2);
    background: #FFF9F4;
  }

  &__icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: var(--color-surface-secondary);
    color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__content {
    flex: 1;

    h3 {
      font-size: 15px;
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: 4px;
    }

    p {
      font-size: 14px;
      color: var(--color-text-secondary);
      line-height: 1.5;
    }
  }

  &__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-md);
    margin-bottom: 6px;
  }

  &__category {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-primary);
  }

  &__time {
    font-size: 12px;
    color: var(--color-text-tertiary);
    white-space: nowrap;
  }

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--color-primary);
    margin-top: 6px;
    flex-shrink: 0;
  }
}

/* Settings List */
.settings-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  transition: opacity 0.3s;

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}

.setting-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);

  &.toggle {
    cursor: default;
  }
}

.setting-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface-secondary);
  border-radius: var(--radius-md);
  flex-shrink: 0;
  color: var(--color-text-secondary);

  .icon-text {
    font-size: 20px;
  }
}

.setting-content {
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

/* Toggle Switch */
.toggle-switch {
  position: relative;
  width: 52px;
  height: 32px;
  flex-shrink: 0;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .toggle-slider {
      background: var(--color-primary);

      &::before {
        transform: translateX(20px);
      }
    }

    &:disabled + .toggle-slider {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-divider);
  border-radius: var(--radius-full);
  transition: all 0.3s;

  &::before {
    content: '';
    position: absolute;
    height: 24px;
    width: 24px;
    left: 4px;
    bottom: 4px;
    background: white;
    border-radius: 50%;
    transition: all 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
}
</style>
