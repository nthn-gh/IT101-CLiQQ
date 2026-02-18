<script setup lang="ts">
import { ref } from 'vue'
import Icons from './Icons.vue'

const emit = defineEmits<{
  close: []
  linked: [cardNumber: string]
}>()

const cardNumber = ref('')
const isValidating = ref(false)

const formatCardNumber = (value: string) => {
  // Remove non-digits
  const digits = value.replace(/\D/g, '')
  
  // Format as groups of 4: XXXX-XXXX-XXXX-XXXX
  const groups = digits.match(/.{1,4}/g)
  return groups ? groups.join('-') : digits
}

const handleInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  const formatted = formatCardNumber(input.value)
  cardNumber.value = formatted
}

const handleLinkCard = async () => {
  if (cardNumber.value.replace(/-/g, '').length < 16) {
    alert('Please enter a valid 16-digit card number')
    return
  }

  isValidating.value = true
  
  // Simulate API call
  setTimeout(() => {
    isValidating.value = false
    emit('linked', cardNumber.value)
    emit('close')
  }, 1500)
}

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click="handleClose">
      <div class="modal-content link-card-modal" @click.stop>
        <button class="close-btn" @click="handleClose">
          <Icons name="x" :size="24" />
        </button>

        <div class="modal-header">
          <div class="header-icon">
            <Icons name="card" :size="32" />
          </div>
          <h2>Link Rewards Card</h2>
          <p>Enter your 7-Eleven Rewards card number to link it to your account</p>
        </div>

        <div class="modal-body">
          <!-- Card Preview -->
          <div class="card-preview">
            <div class="physical-card">
              <div class="card-logo">7-ELEVEN</div>
              <div class="card-chip"></div>
              <div class="card-number">{{ cardNumber || 'XXXX-XXXX-XXXX-XXXX' }}</div>
              <div class="card-label">REWARDS MEMBER</div>
            </div>
          </div>

          <!-- Input Form -->
          <div class="form-group">
            <label for="cardNumber">Card Number</label>
            <input
              id="cardNumber"
              v-model="cardNumber"
              type="text"
              placeholder="0000-0000-0000-0000"
              maxlength="19"
              @input="handleInput"
            />
            <p class="helper-text">
              <Icons name="info" :size="16" />
              Find your card number on the back of your physical 7-Eleven Rewards card
            </p>
          </div>

          <!-- Benefits List -->
          <div class="benefits-list">
            <h3>Benefits of linking your card:</h3>
            <ul>
              <li>
                <Icons name="check" :size="20" />
                <span>Earn points on every purchase</span>
              </li>
              <li>
                <Icons name="check" :size="20" />
                <span>Access exclusive rewards and offers</span>
              </li>
              <li>
                <Icons name="check" :size="20" />
                <span>Track your points digitally</span>
              </li>
              <li>
                <Icons name="check" :size="20" />
                <span>No need to carry physical card</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="handleClose">
            Cancel
          </button>
          <button 
            class="btn btn-primary" 
            :disabled="cardNumber.replace(/-/g, '').length < 16 || isValidating"
            @click="handleLinkCard"
          >
            <span v-if="!isValidating">Link Card</span>
            <span v-else>Validating...</span>
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

.link-card-modal {
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

  &:hover {
    background: var(--color-surface);
    color: var(--color-text);
  }
}

.modal-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);

  .header-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FF6B1A, #FF8C42);
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
    line-height: 1.4;
  }
}

.modal-body {
  .card-preview {
    margin-bottom: var(--spacing-xl);
  }

  .physical-card {
    background: linear-gradient(135deg, #FF6B1A 0%, #D85614 100%);
    border-radius: var(--radius-lg);
    padding: var(--spacing-xl);
    color: white;
    position: relative;
    aspect-ratio: 1.586;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 8px 24px rgba(255, 107, 26, 0.3);

    .card-logo {
      font-size: 20px;
      font-weight: 900;
      letter-spacing: 1px;
    }

    .card-chip {
      width: 48px;
      height: 36px;
      background: linear-gradient(135deg, #FFD700, #FFA500);
      border-radius: 6px;
      position: absolute;
      top: 60px;
      left: var(--spacing-xl);
    }

    .card-number {
      font-size: 20px;
      font-weight: 600;
      letter-spacing: 2px;
      margin-top: var(--spacing-lg);
      font-family: 'Courier New', monospace;
    }

    .card-label {
      font-size: 12px;
      font-weight: 600;
      opacity: 0.9;
      letter-spacing: 1px;
    }
  }

  .form-group {
    margin-bottom: var(--spacing-xl);

    label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: var(--spacing-sm);
    }

    input {
      width: 100%;
      padding: var(--spacing-md);
      border: 2px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: 18px;
      font-family: 'Courier New', monospace;
      letter-spacing: 1px;
      transition: all 0.2s;

      &:focus {
        outline: none;
        border-color: #FF6B1A;
      }

      &::placeholder {
        color: var(--color-text-tertiary);
      }
    }

    .helper-text {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-sm);
      margin-top: var(--spacing-sm);
      font-size: 12px;
      color: var(--color-text-secondary);
      line-height: 1.4;
    }
  }

  .benefits-list {
    background: var(--color-background);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg);

    h3 {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: var(--spacing-md);
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    li {
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

      &:hover {
        background: var(--color-surface);
      }
    }

    &.btn-primary {
      background: linear-gradient(135deg, #FF6B1A, #D85614);
      color: white;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 107, 26, 0.3);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
}
</style>
