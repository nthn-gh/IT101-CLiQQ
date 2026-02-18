<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '@/components/TopBar.vue'
import Icons from '@/components/Icons.vue'
import SendMoneyModal from '@/components/SendMoneyModal.vue'
import TopUpWalletModal from '@/components/TopUpWalletModal.vue'
import SuccessModal from '@/components/SuccessModal.vue'
import QRScannerModal from '@/components/QRScannerModal.vue'
import ReceiveQRModal from '@/components/ReceiveQRModal.vue'

const router = useRouter()

// Modal states
const isSendMoneyModalOpen = ref(false)
const isTopUpModalOpen = ref(false)
const isSuccessModalOpen = ref(false)
const isQRScannerOpen = ref(false)
const isReceiveQRModalOpen = ref(false)
const successType = ref<'send' | 'topup'>('send')
const successAmount = ref(0)
const successRecipient = ref('')
const successMethod = ref('')

const openSendMoneyModal = () => {
  isSendMoneyModalOpen.value = true
}

const closeSendMoneyModal = () => {
  isSendMoneyModalOpen.value = false
}

const openTopUpModal = () => {
  isTopUpModalOpen.value = true
}

const closeTopUpModal = () => {
  isTopUpModalOpen.value = false
}

const openQRScanner = () => {
  isQRScannerOpen.value = true
}

const closeQRScanner = () => {
  isQRScannerOpen.value = false
}

const openReceiveQRModal = () => {
  isReceiveQRModalOpen.value = true
}

const closeReceiveQRModal = () => {
  isReceiveQRModalOpen.value = false
}

const handleQRScanned = (data: string) => {
  closeQRScanner()
  
  // Process QR code data
  try {
    // Check if it's a payment QR code (could be JSON or specific format)
    const qrData = JSON.parse(data)
    
    if (qrData.type === 'payment' && qrData.recipient && qrData.amount) {
      // Open send money modal with pre-filled data
      // For now, just show an alert
      alert(`Scanned Payment QR:\nRecipient: ${qrData.recipient}\nAmount: ₱${qrData.amount}`)
    } else {
      alert(`QR Code Scanned: ${data}`)
    }
  } catch {
    // If not JSON, just show the raw data
    alert(`QR Code Scanned: ${data}`)
  }
}

const handleSendSuccess = (amount: number, recipient: string) => {
  closeSendMoneyModal()
  successType.value = 'send'
  successAmount.value = amount
  successRecipient.value = recipient
  isSuccessModalOpen.value = true
}

const handleTopUpSuccess = (amount: number, method: string) => {
  closeTopUpModal()
  successType.value = 'topup'
  successAmount.value = amount
  successMethod.value = method
  isSuccessModalOpen.value = true
}

const closeSuccessModal = () => {
  isSuccessModalOpen.value = false
  successAmount.value = 0
  successRecipient.value = ''
  successMethod.value = ''
}
</script>

<template>
  <div class="wallet-view">
    <TopBar title="Wallet" />

    <div class="wallet-view__content">
      <!-- GoTyme: Big Balance First -->
      <div class="balance-container">
        <div class="balance-card">
          <p class="balance-label">Available Balance</p>
          <h2 class="balance-amount">₱2,546.50</h2>
        </div>
      </div>

    <!-- One Primary Action Per Screen -->
    <section class="section">
        <h3 class="section-subtitle">What would you like to do?</h3>
        <div class="primary-actions">
          <button class="primary-action-card" @click="openSendMoneyModal">
            <div class="action-icon primary">
              <Icons name="send" :size="28" />
            </div>
            <div class="action-content">
              <h4>Send Money</h4>
              <p>To CLiQQ users</p>
            </div>
            <Icons name="arrow-right" :size="20" class="action-arrow" />
          </button>

          <button class="primary-action-card" @click="openTopUpModal">
            <div class="action-icon">
              <Icons name="plus" :size="28" />
            </div>
            <div class="action-content">
              <h4>Top Up Wallet</h4>
              <p>Add funds via 7-Eleven</p>
            </div>
            <Icons name="arrow-right" :size="20" class="action-arrow" />
          </button>
        </div>
      </section>

      <!-- QR Code Actions -->
      <section class="section">
        <h3 class="section-subtitle">QR Code</h3>
        <div class="qr-actions">
          <button class="qr-action-card" @click="openQRScanner">
            <div class="action-icon scan">
              <Icons name="qrcode" :size="28" />
            </div>
            <div class="action-content">
              <h4>Scan QR Code</h4>
              <p>Pay instantly</p>
            </div>
          </button>

          <button class="qr-action-card" @click="openReceiveQRModal">
            <div class="action-icon generate">
              <Icons name="download" :size="28" />
            </div>
            <div class="action-content">
              <h4>Generate QR</h4>
              <p>Receive money</p>
            </div>
          </button>
        </div>
      </section>

    <!-- Recent & Repeat Actions -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Recent Activity</h2>
        <button class="filter-btn">
          <span>All</span>
          <span class="filter-icon">▼</span>
        </button>
      </div>

        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-icon sent">
              <Icons name="arrow-up-right" :size="20" />
            </div>
            <div class="activity-info">
              <h4>Sent to Maria Santos</h4>
              <p>Today, 2:30 PM</p>
              <span class="activity-status success">Completed</span>
            </div>
            <div class="activity-amount debit">
              <div>-₱500.00</div>
              <button class="repeat-btn">Repeat</button>
            </div>
          </div>

          <div class="activity-item">
            <div class="activity-icon received">
              <Icons name="arrow-down-left" :size="20" />
            </div>
            <div class="activity-info">
              <h4>Cash In</h4>
              <p>Yesterday, 4:15 PM</p>
              <span class="activity-status success">Completed</span>
            </div>
            <div class="activity-amount credit">
              <div>+₱1,000.00</div>
            </div>
          </div>

          <div class="activity-item">
            <div class="activity-icon bill">
              <Icons name="download" :size="20" />
            </div>
            <div class="activity-info">
              <h4>Meralco</h4>
              <p>Feb 10, 2026 • Account: 123456789</p>
              <span class="activity-status success">Completed</span>
            </div>
            <div class="activity-amount debit">
              <div>-₱2,450.50</div>
              <button class="repeat-btn">Repeat</button>
            </div>
          </div>

          <div class="activity-item">
            <div class="activity-icon load">
              <Icons name="phone" :size="20" />
            </div>
            <div class="activity-info">
              <h4>Globe Load</h4>
              <p>Feb 8, 2026 • 0917 123 4567</p>
              <span class="activity-status success">Completed</span>
            </div>
            <div class="activity-amount debit">
              <div>-₱100.00</div>
              <button class="repeat-btn">Repeat</button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Modals -->
    <SendMoneyModal 
      :isOpen="isSendMoneyModalOpen"
      @close="closeSendMoneyModal"
      @success="handleSendSuccess"
    />

    <TopUpWalletModal 
      :isOpen="isTopUpModalOpen"
      @close="closeTopUpModal"
      @success="handleTopUpSuccess"
    />

    <SuccessModal 
      :isOpen="isSuccessModalOpen"
      :type="successType"
      :amount="successAmount"
      :recipient="successRecipient"
      :method="successMethod"
      @close="closeSuccessModal"
    />

    <QRScannerModal 
      :isOpen="isQRScannerOpen"
      @close="closeQRScanner"
      @scanned="handleQRScanned"
    />

    <ReceiveQRModal 
      v-if="isReceiveQRModalOpen"
      userName="Juan dela Cruz"
      userMobile="0917 123 4567"
      @close="closeReceiveQRModal"
    />
  </div>
</template>

<style scoped lang="scss">
.wallet-view {
  min-height: 100vh;
  background: var(--color-background);
  padding-top: var(--top-bar-height);

  &__content {
    padding: var(--spacing-2xl) var(--spacing-xl);
    padding-bottom: calc(var(--bottom-nav-height) + var(--spacing-2xl));
  }
}

/* GoTyme: Big Balance Card */
.balance-container {
  margin-bottom: var(--spacing-3xl);
}

.balance-card {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--spacing-4xl) var(--spacing-3xl);
  text-align: center;
  box-shadow: var(--shadow-sm);

  .balance-label {
    font-size: 14px;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-md);
    font-weight: 500;
  }

  .balance-amount {
    font-size: 52px;
    font-weight: 700;
    color: var(--color-text-primary);
    letter-spacing: -1.5px;
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
    font-size: 20px;
    font-weight: 700;
    color: var(--color-text-primary);
  }

  &-subtitle {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-lg);
  }
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: var(--color-surface);
  border: 2px solid var(--color-divider);
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--color-primary);
  }

  .filter-icon {
    font-size: 10px;
    color: var(--color-text-secondary);
  }
}

/* Primary Action Cards */
.primary-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.primary-action-card {
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

  .action-icon {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-surface-secondary);
    border-radius: var(--radius-md);
    font-size: 28px;
    flex-shrink: 0;

    &.primary {
      background: var(--color-primary);
      
      span {
        filter: brightness(0) invert(1);
      }
    }
  }

  .action-content {
    flex: 1;

    h4 {
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

  .action-arrow {
    color: var(--color-text-tertiary);
  }
}

/* QR Actions */
.qr-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.qr-action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-xl);
  background: var(--color-surface);
  border: 2px solid var(--color-divider);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }

  .action-icon {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-surface-secondary);
    border-radius: var(--radius-md);
    flex-shrink: 0;

    &.scan {
      background: linear-gradient(135deg, #3B82F6, #2563EB);
      color: white;
    }

    &.generate {
      background: linear-gradient(135deg, #10B981, #059669);
      color: white;
    }
  }

  .action-content {
    h4 {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text-primary);
      margin-bottom: 4px;
    }

    p {
      font-size: 12px;
      color: var(--color-text-secondary);
    }
  }
}

/* Activity List */
.activity-list {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--color-divider);

  &:last-child {
    border-bottom: none;
  }

  .activity-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    flex-shrink: 0;

    &.sent {
      background: #FEE2E2;
      color: #DC2626;
    }

    &.received {
      background: #D1FAE5;
      color: #059669;
    }

    &.bill {
      background: #E0E7FF;
      color: #4F46E5;
    }

    &.load {
      background: #DBEAFE;
      color: #2563EB;
    }
  }

  .activity-info {
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
      line-height: 1.4;
    }
  }

  .activity-status {
    display: inline-block;
    padding: 4px 10px;
    border-radius: var(--radius-full);
    font-size: 11px;
    font-weight: 600;

    &.success {
      background: #D1FAE5;
      color: #059669;
    }
  }

  .activity-amount {
    text-align: right;
    flex-shrink: 0;

    > div {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    &.debit > div {
      color: var(--color-text-primary);
    }

    &.credit > div {
      color: var(--color-success);
    }
  }
}

.repeat-btn {
  padding: 6px 14px;
  background: transparent;
  border: 1.5px solid var(--color-divider);
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--color-primary-light);
    border-color: var(--color-primary);
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>
