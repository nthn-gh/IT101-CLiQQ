<script setup lang="ts">
import Icons from './Icons.vue'
import { computed } from 'vue'

const props = defineProps<{
  isOpen: boolean
  type: 'send' | 'topup' | 'load' | 'bill'
  amount: number
  recipient?: string
  method?: string
}>()

const emit = defineEmits<{
  close: []
}>()

const closeModal = () => {
  emit('close')
}

const successTitle = computed(() => {
  switch (props.type) {
    case 'send':
      return 'Money Sent Successfully!'
    case 'topup':
      return 'Top Up Successful!'
    case 'load':
    case 'bill':
      return 'Transaction Successfully Completed'
    default:
      return 'Transaction Successful!'
  }
})
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="success-icon">
          <Icons name="check" :size="56" />
        </div>

        <div class="success-body">
          <h2>{{ successTitle }}</h2>
          
          <div class="amount-display">
            <p class="amount-label">Amount</p>
            <h3 class="amount-value">₱{{ amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</h3>
          </div>

          <div class="transaction-details">
            <div class="detail-row" v-if="type === 'send' && recipient">
              <span class="detail-label">Sent to</span>
              <span class="detail-value">{{ recipient }}</span>
            </div>
            <div class="detail-row" v-if="type === 'topup' && method">
              <span class="detail-label">Method</span>
              <span class="detail-value">{{ method }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date & Time</span>
              <span class="detail-value">{{ new Date().toLocaleString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">New Balance</span>
              <span class="detail-value new-balance">
                ₱{{ type === 'send' 
                  ? (2546.50 - amount).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : (2546.50 + amount).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                }}
              </span>
            </div>
          </div>

          <div class="success-actions">
            <button class="btn-secondary" @click="closeModal">View Receipt</button>
            <button class="btn-primary" @click="closeModal">Done</button>
          </div>
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
  z-index: 10001;
  padding: var(--spacing-lg);
}

.modal-content {
  background: white;
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 420px;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease-out;
  text-align: center;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.success-icon {
  padding: var(--spacing-3xl) var(--spacing-xl) var(--spacing-lg);
  
  svg {
    width: 80px;
    height: 80px;
    padding: var(--spacing-lg);
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    color: white;
    border-radius: 50%;
    animation: scaleIn 0.4s ease-out 0.1s both;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.success-body {
  padding: 0 var(--spacing-xl) var(--spacing-xl);

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-xl);
  }
}

.amount-display {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);

  .amount-label {
    font-size: 13px;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xs);
  }

  .amount-value {
    font-size: 36px;
    font-weight: 700;
    color: var(--color-primary);
    letter-spacing: -1px;
  }
}

.transaction-details {
  background: white;
  border: 2px solid var(--color-divider);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-divider);
  }

  .detail-label {
    font-size: 14px;
    color: var(--color-text-secondary);
  }

  .detail-value {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-primary);
    text-align: right;

    &.new-balance {
      color: #10B981;
      font-size: 16px;
    }
  }
}

.success-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);

  button {
    padding: 14px;
    border-radius: var(--radius-md);
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
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

    &:hover {
      background: #E55F00;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(255, 107, 0, 0.3);
    }

    &:active {
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
</style>
