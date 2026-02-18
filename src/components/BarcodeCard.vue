<script setup lang="ts">
import { ref, computed } from 'vue'
import Icons from './Icons.vue'

const props = defineProps<{
  barcodeNumber?: string
  memberName?: string
}>()

const isExpanded = ref(false)
const barcodeValue = computed(() => props.barcodeNumber || '76543210123456')
const name = computed(() => props.memberName || 'Juan dela Cruz')

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

const closeExpanded = () => {
  isExpanded.value = false
}
</script>

<template>
  <div class="barcode-card">
    <!-- Compact View -->
    <button class="barcode-card__compact" @click="toggleExpanded">
      <div class="barcode-card__header">
        <div class="barcode-card__label">
          <Icons name="qrcode" :size="20" />
          <span>Member Barcode</span>
        </div>
        <span class="barcode-card__hint">Tap to expand</span>
      </div>
      
      <!-- Mini Barcode Preview -->
      <div class="barcode-preview">
        <svg viewBox="0 0 200 60" class="barcode-preview__svg">
          <!-- Simplified barcode stripes -->
          <rect x="10" y="10" width="3" height="40" fill="#000"/>
          <rect x="15" y="10" width="2" height="40" fill="#000"/>
          <rect x="20" y="10" width="4" height="40" fill="#000"/>
          <rect x="26" y="10" width="2" height="40" fill="#000"/>
          <rect x="30" y="10" width="3" height="40" fill="#000"/>
          <rect x="35" y="10" width="5" height="40" fill="#000"/>
          <rect x="42" y="10" width="2" height="40" fill="#000"/>
          <rect x="46" y="10" width="3" height="40" fill="#000"/>
          <rect x="51" y="10" width="2" height="40" fill="#000"/>
          <rect x="55" y="10" width="4" height="40" fill="#000"/>
          <rect x="61" y="10" width="3" height="40" fill="#000"/>
          <rect x="66" y="10" width="2" height="40" fill="#000"/>
          <rect x="70" y="10" width="5" height="40" fill="#000"/>
          <rect x="77" y="10" width="2" height="40" fill="#000"/>
          <rect x="81" y="10" width="3" height="40" fill="#000"/>
          <rect x="86" y="10" width="4" height="40" fill="#000"/>
          <rect x="92" y="10" width="2" height="40" fill="#000"/>
          <rect x="96" y="10" width="3" height="40" fill="#000"/>
          <rect x="101" y="10" width="2" height="40" fill="#000"/>
          <rect x="105" y="10" width="5" height="40" fill="#000"/>
          <rect x="112" y="10" width="3" height="40" fill="#000"/>
          <rect x="117" y="10" width="2" height="40" fill="#000"/>
          <rect x="121" y="10" width="4" height="40" fill="#000"/>
          <rect x="127" y="10" width="2" height="40" fill="#000"/>
          <rect x="131" y="10" width="3" height="40" fill="#000"/>
          <rect x="136" y="10" width="5" height="40" fill="#000"/>
          <rect x="143" y="10" width="2" height="40" fill="#000"/>
          <rect x="147" y="10" width="3" height="40" fill="#000"/>
          <rect x="152" y="10" width="2" height="40" fill="#000"/>
          <rect x="156" y="10" width="4" height="40" fill="#000"/>
          <rect x="162" y="10" width="3" height="40" fill="#000"/>
          <rect x="167" y="10" width="2" height="40" fill="#000"/>
          <rect x="171" y="10" width="5" height="40" fill="#000"/>
          <rect x="178" y="10" width="2" height="40" fill="#000"/>
          <rect x="182" y="10" width="3" height="40" fill="#000"/>
          <rect x="187" y="10" width="3" height="40" fill="#000"/>
        </svg>
        <p class="barcode-number">{{ barcodeValue }}</p>
      </div>
    </button>

    <!-- Expanded Modal -->
    <Transition name="modal">
      <div v-if="isExpanded" class="barcode-modal" @click="closeExpanded">
        <div class="barcode-modal__content" @click.stop>
          <div class="barcode-modal__header">
            <h2>Scan at 7-Eleven</h2>
            <button class="close-btn" @click="closeExpanded">
              <Icons name="x" :size="24" />
            </button>
          </div>

          <div class="barcode-modal__info">
            <p class="member-name">{{ name }}</p>
            <p class="member-subtitle">CLiQQ Rewards Member</p>
          </div>

          <!-- Large Barcode -->
          <div class="barcode-large">
            <svg viewBox="0 0 300 120" class="barcode-large__svg">
              <!-- Full-size barcode -->
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
              <rect x="86" y="10" width="5" height="80" fill="#000"/>
              <rect x="93" y="10" width="3" height="80" fill="#000"/>
              <rect x="98" y="10" width="7" height="80" fill="#000"/>
              <rect x="107" y="10" width="3" height="80" fill="#000"/>
              <rect x="112" y="10" width="5" height="80" fill="#000"/>
              <rect x="119" y="10" width="6" height="80" fill="#000"/>
              <rect x="127" y="10" width="3" height="80" fill="#000"/>
              <rect x="132" y="10" width="5" height="80" fill="#000"/>
              <rect x="139" y="10" width="3" height="80" fill="#000"/>
              <rect x="144" y="10" width="7" height="80" fill="#000"/>
              <rect x="153" y="10" width="5" height="80" fill="#000"/>
              <rect x="160" y="10" width="3" height="80" fill="#000"/>
              <rect x="165" y="10" width="6" height="80" fill="#000"/>
              <rect x="173" y="10" width="3" height="80" fill="#000"/>
              <rect x="178" y="10" width="5" height="80" fill="#000"/>
              <rect x="185" y="10" width="7" height="80" fill="#000"/>
              <rect x="194" y="10" width="3" height="80" fill="#000"/>
              <rect x="199" y="10" width="5" height="80" fill="#000"/>
              <rect x="206" y="10" width="3" height="80" fill="#000"/>
              <rect x="211" y="10" width="6" height="80" fill="#000"/>
              <rect x="219" y="10" width="5" height="80" fill="#000"/>
              <rect x="226" y="10" width="3" height="80" fill="#000"/>
              <rect x="231" y="10" width="7" height="80" fill="#000"/>
              <rect x="240" y="10" width="3" height="80" fill="#000"/>
              <rect x="245" y="10" width="5" height="80" fill="#000"/>
              <rect x="252" y="10" width="6" height="80" fill="#000"/>
              <rect x="260" y="10" width="3" height="80" fill="#000"/>
              <rect x="265" y="10" width="5" height="80" fill="#000"/>
              <rect x="272" y="10" width="5" height="80" fill="#000"/>
            </svg>
            <p class="barcode-large__number">{{ barcodeValue }}</p>
          </div>

          <div class="barcode-modal__instructions">
            <div class="instruction-item">
              <div class="instruction-icon">1</div>
              <p>Show this barcode to the cashier</p>
            </div>
            <div class="instruction-item">
              <div class="instruction-icon">2</div>
              <p>Earn points on every purchase</p>
            </div>
          </div>

          <button class="swipe-hint" @click="closeExpanded">
            Swipe down to close
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.barcode-card {
  &__compact {
    width: 100%;
    background: var(--color-surface);
    border: 1px solid var(--color-divider);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: var(--shadow-sm);

    &:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }

    &:active {
      transform: scale(0.98);
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
  }

  &__label {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-weight: 600;
    color: var(--color-text-primary);
    font-size: 15px;
  }

  &__hint {
    font-size: 13px;
    color: var(--color-text-tertiary);
  }
}

.barcode-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);

  &__svg {
    width: 100%;
    max-width: 200px;
    height: 50px;
  }
}

.barcode-number {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  letter-spacing: 1px;
}

/* Modal Styles */
.barcode-modal {
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

  &__content {
    background: var(--color-surface);
    border-radius: var(--radius-xl);
    padding: var(--spacing-3xl);
    max-width: 400px;
    width: 100%;
    box-shadow: var(--shadow-lg);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-2xl);

    h2 {
      font-size: 22px;
      font-weight: 700;
      color: var(--color-text-primary);
    }
  }

  &__info {
    text-align: center;
    margin-bottom: var(--spacing-3xl);
  }

  &__instructions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    margin-top: var(--spacing-3xl);
    padding: var(--spacing-xl);
    background: var(--color-surface-secondary);
    border-radius: var(--radius-md);
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

.member-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}

.member-subtitle {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.barcode-large {
  background: white;
  border: 2px solid var(--color-divider);
  border-radius: var(--radius-md);
  padding: var(--spacing-2xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);

  &__svg {
    width: 100%;
    max-width: 300px;
    height: 100px;
  }

  &__number {
    font-family: 'Courier New', monospace;
    font-size: 16px;
    font-weight: 700;
    color: #000;
    letter-spacing: 2px;
  }
}

.instruction-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  
  p {
    font-size: 14px;
    color: var(--color-text-secondary);
    margin: 0;
  }
}

.instruction-icon {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
}

.swipe-hint {
  width: 100%;
  margin-top: var(--spacing-xl);
  padding: var(--spacing-md);
  background: none;
  border: 1px dashed var(--color-divider);
  border-radius: var(--radius-md);
  color: var(--color-text-tertiary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
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

.modal-enter-from .barcode-modal__content,
.modal-leave-to .barcode-modal__content {
  transform: scale(0.9) translateY(20px);
}

.modal-enter-active .barcode-modal__content,
.modal-leave-active .barcode-modal__content {
  transition: all 0.3s ease;
}
</style>
