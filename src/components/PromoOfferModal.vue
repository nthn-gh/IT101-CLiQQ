<script setup lang="ts">
import Icons from './Icons.vue'

const props = defineProps<{
  title: string
  description: string
  validUntil: string
  discount?: string
}>()

const emit = defineEmits<{
  close: []
}>()

// Generate barcode number for the promo
const barcodeNumber = `PROMO${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click="emit('close')">
      <div class="modal-container promo-modal" @click.stop>
        <!-- Header -->
        <div class="modal-header">
          <h2>Special Offer</h2>
          <button class="modal-close" @click="emit('close')">
            <Icons name="times" :size="24" />
          </button>
        </div>

        <!-- Content -->
        <div class="modal-content">
          <!-- Promo Details -->
          <div class="promo-details">
            <div class="promo-badge">
              <Icons name="gift" :size="32" />
            </div>
            <h3 class="promo-title">{{ title }}</h3>
            <p class="promo-description">{{ description }}</p>
            <div class="promo-validity">
              <Icons name="clock" :size="16" />
              <span>Valid until {{ validUntil }}</span>
            </div>
          </div>

          <!-- Barcode Display -->
          <div class="barcode-container">
            <p class="barcode-label">Show this barcode to cashier</p>
            <div class="barcode-display">
              <!-- SVG Barcode -->
              <svg class="barcode-svg" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
                <!-- Generate barcode-like pattern -->
                <rect x="10" y="10" width="2" height="50" fill="#000"/>
                <rect x="15" y="10" width="4" height="50" fill="#000"/>
                <rect x="22" y="10" width="2" height="50" fill="#000"/>
                <rect x="27" y="10" width="3" height="50" fill="#000"/>
                <rect x="33" y="10" width="2" height="50" fill="#000"/>
                <rect x="38" y="10" width="4" height="50" fill="#000"/>
                <rect x="45" y="10" width="2" height="50" fill="#000"/>
                <rect x="50" y="10" width="5" height="50" fill="#000"/>
                <rect x="58" y="10" width="2" height="50" fill="#000"/>
                <rect x="63" y="10" width="3" height="50" fill="#000"/>
                <rect x="69" y="10" width="4" height="50" fill="#000"/>
                <rect x="76" y="10" width="2" height="50" fill="#000"/>
                <rect x="81" y="10" width="3" height="50" fill="#000"/>
                <rect x="87" y="10" width="2" height="50" fill="#000"/>
                <rect x="92" y="10" width="4" height="50" fill="#000"/>
                <rect x="99" y="10" width="2" height="50" fill="#000"/>
                <rect x="104" y="10" width="5" height="50" fill="#000"/>
                <rect x="112" y="10" width="2" height="50" fill="#000"/>
                <rect x="117" y="10" width="3" height="50" fill="#000"/>
                <rect x="123" y="10" width="2" height="50" fill="#000"/>
                <rect x="128" y="10" width="4" height="50" fill="#000"/>
                <rect x="135" y="10" width="3" height="50" fill="#000"/>
                <rect x="141" y="10" width="2" height="50" fill="#000"/>
                <rect x="146" y="10" width="4" height="50" fill="#000"/>
                <rect x="153" y="10" width="2" height="50" fill="#000"/>
                <rect x="158" y="10" width="5" height="50" fill="#000"/>
                <rect x="166" y="10" width="2" height="50" fill="#000"/>
                <rect x="171" y="10" width="3" height="50" fill="#000"/>
                <rect x="177" y="10" width="2" height="50" fill="#000"/>
                <rect x="182" y="10" width="4" height="50" fill="#000"/>
              </svg>
              <p class="barcode-number">{{ barcodeNumber }}</p>
            </div>
          </div>

          <!-- Instructions -->
          <div class="instructions">
            <h4>How to Use:</h4>
            <ol>
              <li>Show this screen to the cashier at 7-Eleven</li>
              <li>Cashier will scan the barcode</li>
              <li>Discount will be applied automatically</li>
              <li>Valid for one-time use only</li>
            </ol>
          </div>

          <!-- Terms -->
          <div class="terms">
            <p><strong>Terms & Conditions:</strong></p>
            <ul>
              <li>Valid only at participating 7-Eleven stores nationwide</li>
              <li>Cannot be combined with other promos</li>
              <li>Promo expires on {{ validUntil }}</li>
              <li>Management reserves the right to refuse service</li>
            </ul>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button class="btn-primary" @click="emit('close')">
            Got it!
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

  &:hover {
    background: #f5f5f5;
    color: #1a1a1a;
  }
}

.modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.promo-details {
  text-align: center;
  margin-bottom: 32px;
}

.promo-badge {
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, #ff6900 0%, #e55f00 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.promo-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.promo-description {
  font-size: 15px;
  color: #666;
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.promo-validity {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #fff5f0;
  border-radius: 20px;
  color: #ff6900;
  font-size: 14px;
  font-weight: 600;
}

.barcode-container {
  background: #f8f8f8;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  text-align: center;
}

.barcode-label {
  font-size: 14px;
  font-weight: 600;
  color: #666;
  margin: 0 0 16px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.barcode-display {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.barcode-svg {
  width: 100%;
  max-width: 280px;
  height: 80px;
  margin: 0 auto 12px;
  display: block;
}

.barcode-number {
  font-family: 'Courier New', monospace;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: 2px;
  margin: 0;
}

.instructions {
  margin-bottom: 24px;

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 12px 0;
  }

  ol {
    margin: 0;
    padding-left: 20px;

    li {
      font-size: 14px;
      color: #666;
      line-height: 1.8;
      margin-bottom: 6px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.terms {
  background: #f8f8f8;
  border-radius: 12px;
  padding: 16px;

  p {
    font-size: 13px;
    color: #1a1a1a;
    margin: 0 0 8px 0;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      font-size: 12px;
      color: #666;
      line-height: 1.6;
      padding-left: 16px;
      position: relative;
      margin-bottom: 6px;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: #ff6900;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
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

  &:hover {
    background: #e55f00;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 105, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
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
