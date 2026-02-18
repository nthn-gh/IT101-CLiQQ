<script setup lang="ts">
import { useRouter } from 'vue-router'
import TopBar from '@/components/TopBar.vue'
import Icons from '@/components/Icons.vue'

const router = useRouter()

const handleSignOut = () => {
  // Clear any stored user data (if you add authentication later)
  // localStorage.removeItem('authToken')
  // sessionStorage.clear()
  
  // Navigate to login page
  router.push('/')
}
</script>

<template>
  <div class="profile-view">
    <TopBar title="Profile" />
    
    <div class="profile-view__content">
      <!-- User Card with Better Hierarchy -->
      <div class="user-card">
        <div class="user-avatar">
          <span>JD</span>
        </div>
        <h2 class="user-name">Juan dela Cruz</h2>
        <p class="user-email">juan.delacruz@email.com</p>
        <span class="user-badge">Gold Member</span>
      </div>

    <!-- Stats with Minimalist Design -->
    <div class="stats-container">
      <div class="stat-item clickable" @click="router.push('/wallet')">
        <div class="stat-value">₱2,546.50</div>
        <div class="stat-label">Wallet Balance</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item clickable" @click="router.push('/rewards')">
        <div class="stat-value">1,250</div>
        <div class="stat-label">Reward Points</div>
      </div>
    </div>

    <!-- Quick Actions -->
    <section class="section">
        <h2 class="section-title">Quick Actions</h2>
        <div class="quick-actions">
          <button class="action-card" @click="router.push('/wallet')">
            <div class="action-icon">
              <Icons name="history" :size="26" />
            </div>
            <div class="action-content">
              <h4>Transaction History</h4>
              <p>View all your activity</p>
            </div>
            <Icons name="arrow-right" :size="18" class="action-arrow" />
          </button>

          <button class="action-card" @click="router.push('/rewards')">
            <div class="action-icon">
              <Icons name="gift" :size="26" />
            </div>
            <div class="action-content">
              <h4>My Rewards</h4>
              <p>Redeemed items & vouchers</p>
            </div>
            <Icons name="arrow-right" :size="18" class="action-arrow" />
          </button>
        </div>
      </section>

    <!-- Settings -->
    <section class="section">
        <h2 class="section-title">Settings</h2>
        <div class="settings-list">
          <button class="setting-item" @click="router.push('/settings/personal-info')">
            <div class="setting-icon">
              <Icons name="user" :size="20" />
            </div>
            <div class="setting-content">
              <h4>Personal Information</h4>
              <p>Name, email, phone number</p>
            </div>
            <Icons name="arrow-right" :size="18" class="setting-arrow" />
          </button>

          <button class="setting-item" @click="router.push('/settings/security')">
            <div class="setting-icon">
              <Icons name="lock" :size="20" />
            </div>
            <div class="setting-content">
              <h4>Security & Privacy</h4>
              <p>Password, PIN, biometrics</p>
            </div>
            <Icons name="arrow-right" :size="18" class="setting-arrow" />
          </button>

          <button class="setting-item" @click="router.push('/settings/notifications')">
            <div class="setting-icon">
              <Icons name="bell" :size="20" />
            </div>
            <div class="setting-content">
              <h4>Notifications</h4>
              <p>Manage alerts and updates</p>
            </div>
            <Icons name="arrow-right" :size="18" class="setting-arrow" />
          </button>

          <button class="setting-item" @click="router.push('/settings/help')">
            <div class="setting-icon">
              <Icons name="help" :size="20" />
            </div>
            <div class="setting-content">
              <h4>Help & Support</h4>
              <p>FAQs, contact us</p>
            </div>
            <Icons name="arrow-right" :size="18" class="setting-arrow" />
          </button>
        </div>
      </section>

    <!-- Sign Out -->
    <section class="section">
        <button class="sign-out-btn" @click="handleSignOut">
          <span>Sign Out</span>
        </button>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile-view {
  min-height: 100vh;
  background: var(--color-background);
  padding-top: var(--top-bar-height);

  &__content {
    padding: var(--spacing-2xl) var(--spacing-xl);
    padding-bottom: calc(var(--bottom-nav-height) + var(--spacing-2xl));
  }
}

/* User Card */
.user-card {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--spacing-3xl) var(--spacing-2xl);
  margin-bottom: var(--spacing-xl);
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.user-avatar {
  width: 88px;
  height: 88px;
  margin: 0 auto var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-primary) 0%, #E55F00 100%);
  border-radius: 50%;
  font-size: 32px;
  font-weight: 700;
  color: white;
  box-shadow: var(--shadow-md);
}

.user-name {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.user-email {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
}

.user-badge {
  display: inline-block;
  padding: 8px 16px;
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 600;
}

/* Stats Container */
.stats-container {
  display: flex;
  align-items: stretch;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  margin-bottom: var(--spacing-2xl);
  box-shadow: var(--shadow-sm);
}

.stat-item {
  flex: 1;
  text-align: center;

  .stat-value {
    font-size: 24px;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);
  }

  .stat-label {
    font-size: 13px;
    color: var(--color-text-secondary);
  }

  &.clickable {
    cursor: pointer;
    transition: all 0.2s;
    padding: var(--spacing-md);
    border-radius: var(--radius-md);

    &:hover {
      background: var(--color-surface-secondary);
    }

    &:active {
      transform: scale(0.97);
    }
  }
}

.stat-divider {
  width: 1px;
  background: var(--color-divider);
  margin: 0 var(--spacing-xl);
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

/* Quick Actions */
.quick-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.action-card {
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
    box-shadow: var(--shadow-sm);
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  .action-icon {
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-surface-secondary);
    border-radius: var(--radius-md);
    flex-shrink: 0;
    color: var(--color-text-primary);
  }

  .action-content {
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

  .action-arrow {
    color: var(--color-text-tertiary);
  }
}

/* Settings List */
.settings-list {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.setting-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  border: none;
  background: var(--color-surface);
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid var(--color-divider);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--color-surface-secondary);
  }

  &:active {
    transform: scale(0.99);
  }

  .setting-icon {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-surface-secondary);
    border-radius: var(--radius-md);
    flex-shrink: 0;
    color: var(--color-text-secondary);
  }

  .setting-content {
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

  .setting-arrow {
    color: var(--color-text-tertiary);
  }
}

/* Sign Out Button */
.sign-out-btn {
  width: 100%;
  padding: 16px;
  background: var(--color-surface);
  border: 2px solid var(--color-divider);
  border-radius: var(--radius-lg);
  color: var(--color-error);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #FEE2E2;
    border-color: var(--color-error);
  }

  &:active {
    transform: scale(0.98);
  }
}
</style>
