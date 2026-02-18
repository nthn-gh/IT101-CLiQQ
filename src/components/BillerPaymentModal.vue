<script setup lang="ts">
import { ref, computed } from 'vue'
import Icons from './Icons.vue'

const emit = defineEmits<{
  close: []
  success: [amount: number, accountNumber: string]
}>()

const props = defineProps<{
  billerName: string
  billerLogo?: string
  billerCategory: string
}>()

const accountNumber = ref('')
const amount = ref('')
const saveAccount = ref(false)
const isProcessing = ref(false)

const isValid = computed(() => {
  return accountNumber.value.length >= 6 && parseFloat(amount.value) > 0
})

const formatAmount = (value: string) => {
  const num = parseFloat(value)
  return isNaN(num) ? '0.00' : num.toFixed(2)
}

const handlePay = async () => {
  if (!isValid.value) return

  isProcessing.value = true
  
  // Simulate payment processing
  setTimeout(() => {
    isProcessing.value = false
    emit('success', parseFloat(amount.value), accountNumber.value)
  }, 2000)
}

const handleClose = () => {
  if (!isProcessing.value) {
    emit('close')
  }
}

// Get account label based on category
const accountLabel = computed(() => {
  switch (props.billerCategory.toLowerCase()) {
    case 'telco':
    case 'load':
      return 'Mobile Number'
    case 'utilities':
      return 'Account Number'
    case 'cable':
      return 'Account Number'
    case 'government':
      return 'Reference Number'
    case 'healthcare':
      return 'Member ID'
    case 'education':
      return 'Student ID'
    default:
      return 'Account Number'
  }
})

const accountPlaceholder = computed(() => {
  switch (props.billerCategory.toLowerCase()) {
    case 'telco':
    case 'load':
      return '0917 123 4567'
    case 'utilities':
      return 'e.g., 1234567890'
    case 'cable':
      return 'e.g., 1234567890'
    case 'government':
      return 'e.g., 12-3456789-0'
    case 'healthcare':
      return 'e.g., 123456789'
    case 'education':
      return 'e.g., 2024-12345'
    default:
      return 'Enter account number'
  }
})
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click="handleClose">
      <div class="modal-content payment-modal" @click.stop>
        <button class="close-btn" @click="handleClose" :disabled="isProcessing">
          <Icons name="close" :size="24" />
        </button>

        <div class="modal-header">
          <div class="biller-logo" v-if="billerLogo">
            {{ billerLogo }}
          </div>
          <div class="header-icon" v-else>
            <Icons name="download" :size="32" />
          </div>
          <h2>Pay {{ billerName }}</h2>
          <p>Enter your payment details below</p>
        </div>

        <div class="modal-body">
          <!-- Account Number -->
          <div class="form-group">
            <label :for="'account-' + billerName">{{ accountLabel }}</label>
            <input
              :id="'account-' + billerName"
              v-model="accountNumber"
              type="text"
              :placeholder="accountPlaceholder"
              :disabled="isProcessing"
            />
          </div>

          <!-- Amount -->
          <div class="form-group">
            <label for="amount">Amount</label>
            <div class="input-wrapper">
              <span class="input-prefix">₱</span>
              <input
                id="amount"
                v-model="amount"
                type="number"
                placeholder="0.00"
                step="0.01"
                min="1"
                :disabled="isProcessing"
              />
            </div>
            <p class="helper-text" v-if="amount">
              You will pay: <strong>₱{{ formatAmount(amount) }}</strong>
            </p>
          </div>

          <!-- Save Account Option -->
          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                v-model="saveAccount"
                :disabled="isProcessing"
              />
              <span>Save this account for future payments</span>
            </label>
          </div>

          <!-- Payment Summary -->
          <div class="payment-summary">
            <div class="summary-row">
              <span>Biller</span>
              <strong>{{ billerName }}</strong>
            </div>
            <div class="summary-row">
              <span>{{ accountLabel }}</span>
              <strong>{{ accountNumber || '---' }}</strong>
            </div>
            <div class="summary-row total">
              <span>Total Amount</span>
              <strong>₱{{ amount ? formatAmount(amount) : '0.00' }}</strong>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button 
            class="btn btn-secondary" 
            @click="handleClose"
            :disabled="isProcessing"
          >
            Cancel
          </button>
          <button 
            class="btn btn-primary" 
            :disabled="!isValid || isProcessing"
            @click="handlePay"
          >
            <span v-if="!isProcessing">Pay Now</span>
            <span v-else>Processing...</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
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
  max-width: 440px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease-out;
}

.payment-modal {
  padding: var(--spacing-xl);
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

.close-btn {
  position: absolute;
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  background: var(--color-background);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--color-text-secondary);
  z-index: 1;

  &:hover:not(:disabled) {
    background: var(--color-surface);
    color: var(--color-text);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.modal-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);

  .biller-logo {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: var(--color-background);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--spacing-md);
    font-size: 32px;
  }

  .header-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--spacing-md);
    color: white;
  }

  h2 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: var(--spacing-sm);
    color: var(--color-text);
  }

  p {
    color: var(--color-text-secondary);
    font-size: 14px;
  }
}

.modal-body {
  .form-group {
    margin-bottom: var(--spacing-lg);

    label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: var(--spacing-sm);
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-prefix {
      position: absolute;
      left: var(--spacing-md);
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text);
      pointer-events: none;
    }

    input[type="number"] {
      padding-left: calc(var(--spacing-md) + 16px);
    }

    input[type="text"],
    input[type="number"] {
      width: 100%;
      padding: var(--spacing-md);
      border: 2px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: 16px;
      transition: all 0.2s;

      &:focus {
        outline: none;
        border-color: var(--color-primary);
      }

      &::placeholder {
        color: var(--color-text-tertiary);
      }

      &:disabled {
        background: var(--color-background);
        cursor: not-allowed;
      }
    }

    .helper-text {
      margin-top: var(--spacing-sm);
      font-size: 13px;
      color: var(--color-text-secondary);

      strong {
        color: var(--color-primary);
      }
    }

    &.checkbox-group {
      margin-bottom: var(--spacing-xl);
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      cursor: pointer;
      font-weight: 400;

      input[type="checkbox"] {
        width: 18px;
        height: 18px;
        cursor: pointer;

        &:disabled {
          cursor: not-allowed;
        }
      }

      span {
        font-size: 14px;
        color: var(--color-text-secondary);
      }
    }
  }

  .payment-summary {
    background: var(--color-background);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    margin-top: var(--spacing-xl);

    .summary-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-sm) 0;
      font-size: 14px;

      span {
        color: var(--color-text-secondary);
      }

      strong {
        color: var(--color-text);
        font-weight: 600;
      }

      &:not(:last-child) {
        border-bottom: 1px solid var(--color-divider);
      }

      &.total {
        padding-top: var(--spacing-md);
        font-size: 16px;

        strong {
          color: var(--color-primary);
          font-size: 18px;
        }
      }
    }
  }
}

.modal-footer {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);

  .btn {
    flex: 1;
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: var(--radius-md);
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: none;

    &.btn-secondary {
      background: var(--color-background);
      color: var(--color-text);

      &:hover:not(:disabled) {
        background: var(--color-surface);
      }
    }

    &.btn-primary {
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      color: white;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
}
</style>
