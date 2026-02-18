<script setup lang="ts">
import { ref } from 'vue'
import Icons from './Icons.vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
  success: [amount: number, recipient: string]
}>()

const recipientName = ref('')
const recipientNumber = ref('')
const amount = ref('')
const message = ref('')

const closeModal = () => {
  emit('close')
}

const handleSend = () => {
  if (!recipientName.value || !recipientNumber.value || !amount.value) {
    alert('Please fill in all required fields')
    return
  }

  const amountNum = parseFloat(amount.value)
  if (isNaN(amountNum) || amountNum <= 0) {
    alert('Please enter a valid amount')
    return
  }

  if (amountNum > 2546.50) {
    alert('Insufficient balance')
    return
  }

  emit('success', amountNum, recipientName.value)
  
  // Reset form
  recipientName.value = ''
  recipientNumber.value = ''
  amount.value = ''
  message.value = ''
}
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Send Money</h2>
          <button class="close-btn" @click="closeModal">
            <Icons name="x" :size="24" />
          </button>
        </div>

        <div class="modal-body">
          <div class="balance-info">
            <p>Available Balance</p>
            <h3>₱2,546.50</h3>
          </div>

          <form @submit.prevent="handleSend" class="send-form">
            <div class="form-group">
              <label for="recipientName">Recipient Name *</label>
              <input 
                type="text" 
                id="recipientName"
                v-model="recipientName"
                placeholder="Enter recipient's name"
                required
              />
            </div>

            <div class="form-group">
              <label for="recipientNumber">Mobile Number *</label>
              <input 
                type="tel" 
                id="recipientNumber"
                v-model="recipientNumber"
                placeholder="09171234567"
                pattern="[0-9]{11}"
                maxlength="11"
                required
              />
            </div>

            <div class="form-group">
              <label for="amount">Amount *</label>
              <div class="amount-input">
                <span class="currency">₱</span>
                <input 
                  type="number" 
                  id="amount"
                  v-model="amount"
                  placeholder="0.00"
                  step="0.01"
                  min="1"
                  max="2546.50"
                  required
                />
              </div>
              <p class="helper-text">Minimum: ₱1.00 • Maximum: ₱2,546.50</p>
            </div>

            <div class="form-group">
              <label for="message">Message (Optional)</label>
              <textarea 
                id="message"
                v-model="message"
                placeholder="Add a note..."
                rows="3"
                maxlength="100"
              ></textarea>
              <p class="char-count">{{ message.length }}/100</p>
            </div>

            <div class="form-actions">
              <button type="button" class="btn-secondary" @click="closeModal">Cancel</button>
              <button type="submit" class="btn-primary">Send Money</button>
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
  background: linear-gradient(135deg, var(--color-primary) 0%, #FF8533 100%);
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

.send-form {
  .form-group {
    margin-bottom: var(--spacing-lg);

    label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-sm);
    }

    input,
    textarea {
      width: 100%;
      padding: 14px 16px;
      border: 2px solid var(--color-divider);
      border-radius: var(--radius-md);
      font-size: 15px;
      transition: all 0.2s;
      font-family: inherit;

      &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
      }

      &::placeholder {
        color: var(--color-text-tertiary);
      }
    }

    textarea {
      resize: vertical;
      min-height: 80px;
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

  .char-count {
    font-size: 12px;
    color: var(--color-text-tertiary);
    text-align: right;
    margin-top: var(--spacing-xs);
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

.modal-enter-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content {
  transform: translateY(20px);
}
</style>
