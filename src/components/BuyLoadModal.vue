<script setup lang="ts">
import { ref, computed } from 'vue'
import Icons from './Icons.vue'

const emit = defineEmits<{
  close: []
  success: [amount: number, mobileNumber: string, network: string]
}>()

const mobileNumber = ref('')
const selectedNetwork = ref('')
const selectedAmount = ref(0)
const isProcessing = ref(false)

const networks = [
  { name: 'Globe/TM', logo: '🌐', value: 'globe' },
  { name: 'Smart/TNT/Sun', logo: '📱', value: 'smart' },
  { name: 'DITO', logo: '📡', value: 'dito' },
]

const loadAmounts = [
  { value: 15, label: '₱15' },
  { value: 30, label: '₱30' },
  { value: 50, label: '₱50' },
  { value: 100, label: '₱100' },
  { value: 300, label: '₱300' },
  { value: 500, label: '₱500' },
  { value: 1000, label: '₱1000' },
]

const isValid = computed(() => {
  return mobileNumber.value.length >= 10 && selectedNetwork.value && selectedAmount.value > 0
})

const formatMobileNumber = (value: string) => {
  // Remove non-digits
  const digits = value.replace(/\D/g, '')
  
  // Format as 0XXX-XXX-XXXX
  if (digits.length <= 4) {
    return digits
  } else if (digits.length <= 7) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`
  } else {
    return `${digits.slice(0, 4)}-${digits.slice(4, 7)}-${digits.slice(7, 11)}`
  }
}

const handleMobileInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  const formatted = formatMobileNumber(input.value)
  mobileNumber.value = formatted
}

const selectNetwork = (network: string) => {
  selectedNetwork.value = network
}

const selectAmount = (amount: number) => {
  selectedAmount.value = amount
}

const handleSubmit = () => {
  if (!isValid.value || isProcessing.value) return
  
  isProcessing.value = true
  
  // Simulate processing
  setTimeout(() => {
    isProcessing.value = false
    const cleanNumber = mobileNumber.value.replace(/\D/g, '')
    const networkName = networks.find(n => n.value === selectedNetwork.value)?.name || selectedNetwork.value
    emit('success', selectedAmount.value, cleanNumber, networkName)
  }, 2000)
}
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click="emit('close')">
      <div class="modal-container buy-load-modal" @click.stop>
        <!-- Header -->
        <div class="modal-header">
          <h2>Buy Load</h2>
          <button class="modal-close" @click="emit('close')" :disabled="isProcessing">
            <Icons name="times" :size="24" />
          </button>
        </div>

        <!-- Content -->
        <div class="modal-content">
          <!-- Network Selection -->
          <div class="form-group">
            <label class="form-label">Select Network</label>
            <div class="network-grid">
              <button
                v-for="network in networks"
                :key="network.value"
                class="network-item"
                :class="{ active: selectedNetwork === network.value }"
                @click="selectNetwork(network.value)"
                :disabled="isProcessing"
              >
                <span class="network-logo">{{ network.logo }}</span>
                <span class="network-name">{{ network.name }}</span>
              </button>
            </div>
          </div>

          <!-- Mobile Number Input -->
          <div class="form-group">
            <label class="form-label" for="mobile-number">Mobile Number</label>
            <div class="input-wrapper">
              <input
                id="mobile-number"
                type="tel"
                v-model="mobileNumber"
                @input="handleMobileInput"
                placeholder="0XXX-XXX-XXXX"
                maxlength="14"
                class="form-input"
                :disabled="isProcessing"
              />
            </div>
          </div>

          <!-- Load Amount Selection -->
          <div class="form-group">
            <label class="form-label">Select Amount</label>
            <div class="amount-grid">
              <button
                v-for="amount in loadAmounts"
                :key="amount.value"
                class="amount-item"
                :class="{ active: selectedAmount === amount.value }"
                @click="selectAmount(amount.value)"
                :disabled="isProcessing"
              >
                {{ amount.label }}
              </button>
            </div>
          </div>

          <!-- Payment Summary -->
          <div v-if="isValid" class="payment-summary">
            <div class="summary-row">
              <span class="summary-label">Load Amount</span>
              <span class="summary-value">₱{{ selectedAmount.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">Convenience Fee</span>
              <span class="summary-value">₱0.00</span>
            </div>
            <div class="summary-divider"></div>
            <div class="summary-row summary-total">
              <span class="summary-label">Total</span>
              <span class="summary-value">₱{{ selectedAmount.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button 
            class="btn-primary" 
            :disabled="!isValid || isProcessing"
            @click="handleSubmit"
          >
            <span v-if="!isProcessing">Confirm Purchase</span>
            <span v-else class="processing">
              <span class="spinner"></span>
              Processing...
            </span>
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
  align-items: flex-end;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-container {
  background: white;
  border-radius: 24px 24px 0 0;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 16px;
  border-bottom: 1px solid #f0f0f0;

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
  }
}

.modal-close {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #f5f5f5;
    color: #1a1a1a;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.network-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.network-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  background: #f8f8f8;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
  color: #666;

  &:hover:not(:disabled) {
    background: #f0f0f0;
  }

  &.active {
    background: #fff5f0;
    border-color: #ff6900;
    color: #ff6900;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.network-logo {
  font-size: 32px;
  line-height: 1;
}

.network-name {
  font-weight: 500;
  text-align: center;
  line-height: 1.2;
}

.input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  transition: all 0.2s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #ff6900;
  }

  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }
}

.amount-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.amount-item {
  padding: 14px 8px;
  background: #f8f8f8;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;

  &:hover:not(:disabled) {
    background: #f0f0f0;
  }

  &.active {
    background: #fff5f0;
    border-color: #ff6900;
    color: #ff6900;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.payment-summary {
  background: #f8f8f8;
  border-radius: 12px;
  padding: 16px;
  margin-top: 24px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
}

.summary-label {
  font-size: 14px;
  color: #666;
}

.summary-value {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
}

.summary-divider {
  height: 1px;
  background: #e5e5e5;
  margin: 12px 0;
}

.summary-total {
  .summary-label,
  .summary-value {
    font-size: 16px;
    font-weight: 700;
    color: #1a1a1a;
  }
}

.modal-footer {
  padding: 16px 24px 24px;
  border-top: 1px solid #f0f0f0;
}

.btn-primary {
  width: 100%;
  padding: 16px;
  background: #ff6900;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background: #e55f00;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 105, 0, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
}

.processing {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (min-width: 768px) {
  .modal-overlay {
    align-items: center;
  }

  .modal-container {
    border-radius: 24px;
    max-height: 85vh;
  }
}
</style>
