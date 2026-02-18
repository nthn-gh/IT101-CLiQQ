<script setup lang="ts">
import { ref } from 'vue'
import Icons from './Icons.vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
  success: [amount: number, method: string]
}>()

const selectedMethod = ref<'cash' | 'card' | 'bank'>('cash')
const amount = ref('')
const customAmount = ref(false)

const quickAmounts = [100, 200, 500, 1000, 2000, 5000]

const closeModal = () => {
  emit('close')
}

const selectQuickAmount = (value: number) => {
  amount.value = value.toString()
  customAmount.value = false
}

const enableCustomAmount = () => {
  customAmount.value = true
  amount.value = ''
}

const handleTopUp = () => {
  if (!amount.value) {
    alert('Please enter an amount')
    return
  }

  const amountNum = parseFloat(amount.value)
  if (isNaN(amountNum) || amountNum < 100) {
    alert('Minimum top-up amount is ₱100')
    return
  }

  const methodName = selectedMethod.value === 'cash' ? 'Cash at 7-Eleven' :
                      selectedMethod.value === 'card' ? 'Debit/Credit Card' : 'Bank Transfer'

  emit('success', amountNum, methodName)
  
  // Reset form
  amount.value = ''
  customAmount.value = false
  selectedMethod.value = 'cash'
}
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Top Up Wallet</h2>
          <button class="close-btn" @click="closeModal">
            <Icons name="x" :size="24" />
          </button>
        </div>

        <div class="modal-body">
          <div class="balance-info">
            <p>Current Balance</p>
            <h3>₱2,546.50</h3>
          </div>

          <form @submit.prevent="handleTopUp" class="topup-form">
            <!-- Quick Amount Selection -->
            <div class="form-section">
              <label class="section-label">Select Amount</label>
              <div class="quick-amounts">
                <button
                  v-for="quickAmount in quickAmounts"
                  :key="quickAmount"
                  type="button"
                  class="quick-amount-btn"
                  :class="{ active: amount === quickAmount.toString() && !customAmount }"
                  @click="selectQuickAmount(quickAmount)"
                >
                  ₱{{ quickAmount.toLocaleString() }}
                </button>
                <button
                  type="button"
                  class="quick-amount-btn"
                  :class="{ active: customAmount }"
                  @click="enableCustomAmount"
                >
                  Custom
                </button>
              </div>
            </div>

            <!-- Custom Amount Input -->
            <div v-if="customAmount" class="form-group">
              <label for="customAmount">Enter Amount</label>
              <div class="amount-input">
                <span class="currency">₱</span>
                <input 
                  type="number" 
                  id="customAmount"
                  v-model="amount"
                  placeholder="0.00"
                  step="0.01"
                  min="100"
                  required
                />
              </div>
              <p class="helper-text">Minimum: ₱100.00</p>
            </div>

            <!-- Payment Method -->
            <div class="form-section">
              <label class="section-label">Payment Method</label>
              <div class="payment-methods">
                <button
                  type="button"
                  class="method-btn"
                  :class="{ active: selectedMethod === 'cash' }"
                  @click="selectedMethod = 'cash'"
                >
                  <div class="method-icon">
                    <Icons name="store" :size="24" />
                  </div>
                  <div class="method-info">
                    <h4>Cash at 7-Eleven</h4>
                    <p>Visit any branch</p>
                  </div>
                  <div class="method-check" v-if="selectedMethod === 'cash'">
                    <Icons name="check" :size="18" />
                  </div>
                </button>

                <button
                  type="button"
                  class="method-btn"
                  :class="{ active: selectedMethod === 'card' }"
                  @click="selectedMethod = 'card'"
                >
                  <div class="method-icon">
                    <Icons name="credit-card" :size="24" />
                  </div>
                  <div class="method-info">
                    <h4>Debit/Credit Card</h4>
                    <p>Visa, Mastercard</p>
                  </div>
                  <div class="method-check" v-if="selectedMethod === 'card'">
                    <Icons name="check" :size="18" />
                  </div>
                </button>

                <button
                  type="button"
                  class="method-btn"
                  :class="{ active: selectedMethod === 'bank' }"
                  @click="selectedMethod = 'bank'"
                >
                  <div class="method-icon">
                    <Icons name="wallet" :size="24" />
                  </div>
                  <div class="method-info">
                    <h4>Bank Transfer</h4>
                    <p>InstaPay, PESONet</p>
                  </div>
                  <div class="method-check" v-if="selectedMethod === 'bank'">
                    <Icons name="check" :size="18" />
                  </div>
                </button>
              </div>
            </div>

            <div class="form-actions">
              <button type="button" class="btn-secondary" @click="closeModal">Cancel</button>
              <button type="submit" class="btn-primary" :disabled="!amount">Continue</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: var(--spacing-lg);
}

.modal-content {
  background: white;
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-xl);
  border-bottom: 2px solid var(--color-divider);

  h2 {
    font-size: 22px;
    font-weight: 700;
    color: var(--color-text-primary);
  }

  .close-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-surface);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: var(--color-divider);
    }
  }
}

.modal-body {
  padding: var(--spacing-xl);
}

.balance-info {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  text-align: center;
  margin-bottom: var(--spacing-xl);
  color: white;

  p {
    font-size: 13px;
    opacity: 0.9;
    margin-bottom: var(--spacing-xs);
  }

  h3 {
    font-size: 32px;
    font-weight: 700;
  }
}

.topup-form {
  .form-section {
    margin-bottom: var(--spacing-xl);
  }

  .section-label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-md);
  }
}

.quick-amounts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-sm);
}

.quick-amount-btn {
  padding: 14px;
  background: var(--color-surface);
  border: 2px solid var(--color-divider);
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--color-primary);
  }

  &.active {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
  }
}

.form-group {
  margin-bottom: var(--spacing-lg);

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
    border: 2px solid var(--color-divider);
    border-radius: var(--radius-md);
    font-size: 15px;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
    }

    &::placeholder {
      color: var(--color-text-tertiary);
    }
  }
}

.amount-input {
  position: relative;

  .currency {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text-primary);
  }

  input {
    padding-left: 40px;
    font-size: 18px;
    font-weight: 600;
  }
}

.helper-text {
  font-size: 12px;
  color: var(--color-text-tertiary);
  margin-top: var(--spacing-xs);
}

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.method-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border: 2px solid var(--color-divider);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    border-color: var(--color-primary);
  }

  &.active {
    border-color: var(--color-primary);
    background: rgba(255, 107, 0, 0.05);
  }

  .method-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: var(--radius-md);
    color: var(--color-primary);
    flex-shrink: 0;
  }

  .method-info {
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

  .method-check {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-primary);
    color: white;
    border-radius: 50%;
    flex-shrink: 0;
  }
}

.form-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);

  button {
    padding: 14px;
    border-radius: var(--radius-md);
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: none;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .btn-secondary {
    background: var(--color-surface);
    color: var(--color-text-primary);
    border: 2px solid var(--color-divider);

    &:hover {
      background: var(--color-divider);
    }
  }

  .btn-primary {
    background: var(--color-primary);
    color: white;

    &:hover:not(:disabled) {
      background: #E55F00;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(255, 107, 0, 0.3);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content {
  transform: translateY(20px);
}
</style>
