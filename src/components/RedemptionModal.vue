<script setup lang="ts">
import { ref, computed } from 'vue'
import Icons from './Icons.vue'

const props = defineProps<{
  isOpen: boolean
  rewardName: string
  rewardPoints: number
}>()

const emit = defineEmits<{
  close: []
}>()

// Generate a unique redemption code based on reward name and timestamp
const redemptionCode = computed(() => {
  const timestamp = Date.now().toString().slice(-8)
  const nameHash = props.rewardName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return `711${nameHash}${timestamp}`
})

const expiryTime = computed(() => {
  const now = new Date()
  now.setMinutes(now.getMinutes() + 15)
  return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
})

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="redemption-modal" @click="closeModal">
      <div class="redemption-modal__content" @click.stop>
        <!-- Success Header -->
        <div class="redemption-modal__header">
          <div class="success-icon">
            <Icons name="check" :size="48" />
          </div>
          <button class="close-btn" @click="closeModal">
            <Icons name="x" :size="24" />
          </button>
        </div>

        <div class="redemption-modal__body">
          <h2>Redemption Successful!</h2>
          <p class="reward-redeemed">{{ rewardName }}</p>
          <p class="points-deducted">-{{ rewardPoints }} points</p>

          <!-- Barcode Section -->
          <div class="barcode-section">
            <p class="barcode-instruction">Show this barcode to the cashier</p>
            
            <div class="barcode-large">
              <svg viewBox="0 0 300 120" class="barcode-large__svg">
                <!-- Full-size barcode stripes -->
                <rect x="20" y="10" width="5" height="80" fill="#000"/>
                <rect x="27" y="10" width="3" height="80" fill="#000"/>
                <rect x="32" y="10" width="6" height="80" fill="#000"/>
                <rect x="40" y="10" width="3" height="80" fill="#000"/>
                <rect x="45" y="10" width="5" height="80" fill="#000"/>
                <rect x="52" y="10" width="7" height="80" fill="#000"/>
                <rect x="61" y="10" width="3" height="80" fill="#000"/>
                <rect x="66" y="10" width="5" height="80" fill="#000"/>
                <rect x="73" y="10" width="3" height="80" fill="#000"/>
                <rect x="78" y="10" width="6" height="80" fill="#000"/>
                <rect x="86" y="10" width="4" height="80" fill="#000"/>
                <rect x="92" y="10" width="3" height="80" fill="#000"/>
                <rect x="97" y="10" width="7" height="80" fill="#000"/>
                <rect x="106" y="10" width="3" height="80" fill="#000"/>
                <rect x="111" y="10" width="5" height="80" fill="#000"/>
                <rect x="118" y="10" width="6" height="80" fill="#000"/>
                <rect x="126" y="10" width="3" height="80" fill="#000"/>
                <rect x="131" y="10" width="5" height="80" fill="#000"/>
                <rect x="138" y="10" width="3" height="80" fill="#000"/>
                <rect x="143" y="10" width="7" height="80" fill="#000"/>
                <rect x="152" y="10" width="4" height="80" fill="#000"/>
                <rect x="158" y="10" width="3" height="80" fill="#000"/>
                <rect x="163" y="10" width="6" height="80" fill="#000"/>
                <rect x="171" y="10" width="3" height="80" fill="#000"/>
                <rect x="176" y="10" width="5" height="80" fill="#000"/>
                <rect x="183" y="10" width="7" height="80" fill="#000"/>
                <rect x="192" y="10" width="3" height="80" fill="#000"/>
                <rect x="197" y="10" width="5" height="80" fill="#000"/>
                <rect x="204" y="10" width="3" height="80" fill="#000"/>
                <rect x="209" y="10" width="6" height="80" fill="#000"/>
                <rect x="217" y="10" width="4" height="80" fill="#000"/>
                <rect x="223" y="10" width="3" height="80" fill="#000"/>
                <rect x="228" y="10" width="7" height="80" fill="#000"/>
                <rect x="237" y="10" width="3" height="80" fill="#000"/>
                <rect x="242" y="10" width="5" height="80" fill="#000"/>
                <rect x="249" y="10" width="6" height="80" fill="#000"/>
                <rect x="257" y="10" width="3" height="80" fill="#000"/>
                <rect x="262" y="10" width="5" height="80" fill="#000"/>
                <rect x="269" y="10" width="3" height="80" fill="#000"/>
                <rect x="274" y="10" width="6" height="80" fill="#000"/>
              </svg>
              <p class="barcode-number">{{ redemptionCode }}</p>
            </div>
          </div>

          <!-- Instructions -->
          <div class="redemption-instructions">
            <div class="instruction-item">
              <Icons name="clock" :size="20" />
              <div>
                <strong>Valid Until:</strong>
                <span>{{ expiryTime }} (15 minutes)</span>
              </div>
            </div>
            <div class="instruction-item">
              <Icons name="map-pin" :size="20" />
              <div>
                <strong>Redeem at:</strong>
                <span>Any 7-Eleven store nationwide</span>
              </div>
            </div>
            <div class="instruction-item">
              <Icons name="info" :size="20" />
              <div>
                <strong>Note:</strong>
                <span>One-time use only. Screenshot for reference.</span>
              </div>
            </div>
          </div>

          <button class="done-btn" @click="closeModal">Done</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.redemption-modal {
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

.redemption-modal__content {
  background: white;
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 450px;
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

.redemption-modal__header {
  position: relative;
  padding: var(--spacing-xl);
  padding-bottom: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .success-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    animation: scaleIn 0.4s ease-out 0.1s both;
  }

  .close-btn {
    position: absolute;
    top: var(--spacing-lg);
    right: var(--spacing-lg);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--color-surface);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: var(--color-divider);
    }
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

.redemption-modal__body {
  padding: var(--spacing-xl);
  text-align: center;

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);
  }

  .reward-redeemed {
    font-size: 16px;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xs);
  }

  .points-deducted {
    font-size: 18px;
    font-weight: 600;
    color: #DC2626;
    margin-bottom: var(--spacing-xl);
  }
}

.barcode-section {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);

  .barcode-instruction {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-lg);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.barcode-large {
  background: white;
  border-radius: var(--radius-md);
  padding: var(--spacing-xl);
  border: 2px solid var(--color-divider);

  &__svg {
    width: 100%;
    height: auto;
    margin-bottom: var(--spacing-md);
  }

  .barcode-number {
    font-size: 18px;
    font-weight: 700;
    font-family: 'Courier New', monospace;
    color: var(--color-text-primary);
    letter-spacing: 2px;
  }
}

.redemption-instructions {
  text-align: left;
  background: #FFF8EE;
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.instruction-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }

  svg {
    color: var(--color-primary);
    flex-shrink: 0;
    margin-top: 2px;
  }

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  strong {
    font-weight: 600;
    color: var(--color-text-primary);
  }

  span {
    color: var(--color-text-secondary);
    line-height: 1.5;
  }
}

.done-btn {
  width: 100%;
  padding: 16px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #E55F00;
  }

  &:active {
    transform: scale(0.98);
  }
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .redemption-modal__content {
  transition: transform 0.3s ease;
}

.modal-enter-from .redemption-modal__content {
  transform: translateY(20px);
}
</style>
