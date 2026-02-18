<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '@/components/TopBar.vue'
import Icons from '@/components/Icons.vue'

const router = useRouter()
const goBack = () => router.back()

const biometricEnabled = ref(true)
const twoFactorEnabled = ref(false)
const showBalance = ref(true)
const showTransactions = ref(true)

const showPasswordModal = ref(false)
const showPinModal = ref(false)

const openPasswordModal = () => {
  showPasswordModal.value = true
}

const openPinModal = () => {
  showPinModal.value = true
}
</script>

<template>
  <div class="security-view">
    <TopBar title="Security & Privacy" :show-back="true" @back="goBack" />
    
    <div class="security-view__content">
      <!-- Login Security -->
      <section class="section">
        <h2 class="section-title">Login Security</h2>
        <div class="settings-list">
          <button class="setting-item" @click="openPasswordModal">
            <div class="setting-icon">
              <Icons name="lock" :size="20" />
            </div>
            <div class="setting-content">
              <h4>Change Password</h4>
              <p>Last changed 30 days ago</p>
            </div>
            <Icons name="arrow-right" :size="18" class="setting-arrow" />
          </button>

          <button class="setting-item" @click="openPinModal">
            <div class="setting-icon">
              <Icons name="lock" :size="20" />
            </div>
            <div class="setting-content">
              <h4>Change PIN</h4>
              <p>6-digit security PIN</p>
            </div>
            <Icons name="arrow-right" :size="18" class="setting-arrow" />
          </button>

          <div class="setting-item toggle">
            <div class="setting-icon">
              <Icons name="user" :size="20" />
            </div>
            <div class="setting-content">
              <h4>Biometric Login</h4>
              <p>Use fingerprint or face ID</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="biometricEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-item toggle">
            <div class="setting-icon">
              <Icons name="lock" :size="20" />
            </div>
            <div class="setting-content">
              <h4>Two-Factor Authentication</h4>
              <p>Extra security layer via SMS</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="twoFactorEnabled" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </section>

      <!-- Privacy Settings -->
      <section class="section">
        <h2 class="section-title">Privacy Settings</h2>
        <div class="settings-list">
          <div class="setting-item toggle">
            <div class="setting-icon">
              <Icons name="wallet" :size="20" />
            </div>
            <div class="setting-content">
              <h4>Show Balance on Home</h4>
              <p>Display wallet balance</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="showBalance" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-item toggle">
            <div class="setting-icon">
              <Icons name="history" :size="20" />
            </div>
            <div class="setting-content">
              <h4>Show Recent Transactions</h4>
              <p>Display on home screen</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="showTransactions" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </section>

      <!-- Active Sessions -->
      <section class="section">
        <h2 class="section-title">Active Sessions</h2>
        <div class="session-list">
          <div class="session-item current">
            <div class="session-icon">📱</div>
            <div class="session-info">
              <h4>iPhone 13 Pro</h4>
              <p>Current device • Metro Manila</p>
              <span class="session-badge">Active now</span>
            </div>
          </div>

          <div class="session-item">
            <div class="session-icon">💻</div>
            <div class="session-info">
              <h4>MacBook Pro</h4>
              <p>Last active 2 days ago</p>
            </div>
            <button class="remove-btn">Remove</button>
          </div>
        </div>
      </section>

      <!-- Danger Zone -->
      <section class="section">
        <h2 class="section-title danger">Danger Zone</h2>
        <div class="settings-list">
          <button class="setting-item danger">
            <div class="setting-icon">
              <Icons name="lock" :size="20" />
            </div>
            <div class="setting-content">
              <h4>Deactivate Account</h4>
              <p>Temporarily disable your account</p>
            </div>
            <Icons name="arrow-right" :size="18" class="setting-arrow" />
          </button>
        </div>
      </section>
    </div>

    <!-- Password Change Modal -->
    <Transition name="modal">
      <div v-if="showPasswordModal" class="modal-overlay" @click="showPasswordModal = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>Change Password</h3>
            <button class="close-btn" @click="showPasswordModal = false">
              <Icons name="x" :size="24" />
            </button>
          </div>
          <div class="modal-body">
            <div class="form-field">
              <label>Current Password</label>
              <input type="password" placeholder="Enter current password" />
            </div>
            <div class="form-field">
              <label>New Password</label>
              <input type="password" placeholder="Enter new password" />
            </div>
            <div class="form-field">
              <label>Confirm New Password</label>
              <input type="password" placeholder="Confirm new password" />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-secondary" @click="showPasswordModal = false">Cancel</button>
            <button class="btn-primary" @click="showPasswordModal = false">Save Changes</button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- PIN Change Modal -->
    <Transition name="modal">
      <div v-if="showPinModal" class="modal-overlay" @click="showPinModal = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>Change PIN</h3>
            <button class="close-btn" @click="showPinModal = false">
              <Icons name="x" :size="24" />
            </button>
          </div>
          <div class="modal-body">
            <div class="form-field">
              <label>Current PIN</label>
              <input type="password" maxlength="6" placeholder="Enter 6-digit PIN" />
            </div>
            <div class="form-field">
              <label>New PIN</label>
              <input type="password" maxlength="6" placeholder="Enter new 6-digit PIN" />
            </div>
            <div class="form-field">
              <label>Confirm New PIN</label>
              <input type="password" maxlength="6" placeholder="Confirm new PIN" />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-secondary" @click="showPinModal = false">Cancel</button>
            <button class="btn-primary" @click="showPinModal = false">Save Changes</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.security-view {
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
    margin-bottom: var(--spacing-lg);

    &.danger {
      color: var(--color-error);
    }
  }
}

/* Settings List */
.settings-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.setting-item {
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

  &:not(.toggle):hover {
    box-shadow: var(--shadow-sm);
    transform: translateY(-1px);
  }

  &:not(.toggle):active {
    transform: scale(0.98);
  }

  &.toggle {
    cursor: default;
  }

  &.danger {
    border-color: #FEE2E2;
    background: #FEF2F2;

    .setting-content h4 {
      color: var(--color-error);
    }
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

.setting-arrow {
  color: var(--color-text-tertiary);
  flex-shrink: 0;
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

/* Session List */
.session-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.session-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);

  &.current {
    border-color: var(--color-primary);
    background: var(--color-primary-light);
  }
}

.session-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.session-info {
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
    margin-bottom: 8px;
  }
}

.session-badge {
  display: inline-block;
  padding: 4px 10px;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 600;
}

.remove-btn {
  padding: 8px 16px;
  background: var(--color-surface);
  color: var(--color-error);
  border: 1px solid var(--color-error);
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s;

  &:hover {
    background: #FEE2E2;
  }

  &:active {
    transform: scale(0.95);
  }
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: var(--spacing-lg);
  backdrop-filter: blur(4px);
}

.modal-content {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  max-width: 400px;
  width: 100%;
  box-shadow: var(--shadow-lg);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--color-divider);

  h3 {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-text-primary);
  }
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: var(--color-surface-secondary);
  border-radius: var(--radius-full);
  cursor: pointer;
  color: var(--color-text-primary);
  transition: all 0.2s;

  &:hover {
    background: var(--color-divider);
  }

  &:active {
    transform: scale(0.95);
  }
}

.modal-body {
  padding: var(--spacing-xl);
  flex: 1;
  overflow-y: auto;
}

.form-field {
  margin-bottom: var(--spacing-lg);

  &:last-child {
    margin-bottom: 0;
  }

  label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);
  }

  input {
    width: 100%;
    padding: 14px 16px;
    background: var(--color-surface-secondary);
    border: 2px solid var(--color-divider);
    border-radius: var(--radius-md);
    font-size: 15px;
    color: var(--color-text-primary);
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: var(--shadow-sm);
      background: var(--color-surface);
    }

    &::placeholder {
      color: var(--color-text-tertiary);
    }
  }
}

.modal-footer {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-xl);
  border-top: 1px solid var(--color-divider);
}

.btn-secondary,
.btn-primary {
  flex: 1;
  padding: 14px 24px;
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.98);
  }
}

.btn-secondary {
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 2px solid var(--color-divider);

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
}

.btn-primary {
  background: var(--color-primary);
  color: white;
  border: none;
  box-shadow: var(--shadow-sm);

  &:hover {
    background: #E55F00;
    box-shadow: var(--shadow-md);
  }
}

/* Modal Transition */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9) translateY(20px);
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: all 0.3s ease;
}
</style>
