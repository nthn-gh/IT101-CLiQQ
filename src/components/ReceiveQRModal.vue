<script setup lang="ts">
import { ref, computed } from 'vue'
import Icons from './Icons.vue'

const emit = defineEmits<{
  close: []
}>()

const props = defineProps<{
  userName?: string
  userMobile?: string
}>()

const amount = ref('')
const message = ref('')

// Generate a simple QR code as SVG (for demo purposes)
const qrData = computed(() => {
  return JSON.stringify({
    type: 'receive',
    recipient: props.userName || 'Juan dela Cruz',
    mobile: props.userMobile || '09171234567',
    amount: amount.value ? parseFloat(amount.value) : 0,
    message: message.value
  })
})

// Simple QR code representation (in production, use a proper QR library)
const qrCodeSize = 200
const moduleSize = 4

const handleClose = () => {
  emit('close')
}

const handleShare = () => {
  alert('QR Code sharing functionality')
}

const handleDownload = () => {
  alert('QR Code download functionality')
}
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click="handleClose">
      <div class="modal-content receive-qr-modal" @click.stop>
        <button class="close-btn" @click="handleClose">
          <Icons name="close" :size="24" />
        </button>

        <div class="modal-header">
          <div class="header-icon">
            <Icons name="qrcode" :size="32" />
          </div>
          <h2>Receive Money</h2>
          <p>Share this QR code to receive money instantly</p>
        </div>

        <div class="modal-body">
          <!-- QR Code Display -->
          <div class="qr-code-container">
            <div class="qr-code">
              <!-- Simple QR code placeholder - in production use qrcode library -->
              <svg :width="qrCodeSize" :height="qrCodeSize" viewBox="0 0 200 200">
                <rect width="200" height="200" fill="white" />
                <!-- QR Code patterns -->
                <g fill="black">
                  <!-- Top-left finder pattern -->
                  <rect x="10" y="10" width="60" height="60" />
                  <rect x="20" y="20" width="40" height="40" fill="white" />
                  <rect x="30" y="30" width="20" height="20" fill="black" />
                  
                  <!-- Top-right finder pattern -->
                  <rect x="130" y="10" width="60" height="60" />
                  <rect x="140" y="20" width="40" height="40" fill="white" />
                  <rect x="150" y="30" width="20" height="20" fill="black" />
                  
                  <!-- Bottom-left finder pattern -->
                  <rect x="10" y="130" width="60" height="60" />
                  <rect x="20" y="140" width="40" height="40" fill="white" />
                  <rect x="30" y="150" width="20" height="20" fill="black" />
                  
                  <!-- Data modules (simplified pattern) -->
                  <rect x="90" y="90" width="20" height="20" />
                  <rect x="80" y="100" width="8" height="8" />
                  <rect x="100" y="80" width="8" height="8" />
                  <rect x="110" y="90" width="12" height="12" />
                </g>
              </svg>
            </div>
            
            <div class="user-info">
              <h3>{{ userName || 'Juan dela Cruz' }}</h3>
              <p>{{ userMobile || '0917 123 4567' }}</p>
            </div>
          </div>

          <!-- Optional Amount -->
          <div class="form-group">
            <label for="amount">Request Amount (Optional)</label>
            <div class="input-wrapper">
              <span class="input-prefix">₱</span>
              <input
                id="amount"
                v-model="amount"
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <!-- Optional Message -->
          <div class="form-group">
            <label for="message">Add Message (Optional)</label>
            <input
              id="message"
              v-model="message"
              type="text"
              placeholder="e.g., Payment for lunch"
              maxlength="50"
            />
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="handleShare">
            <Icons name="share" :size="20" />
            Share QR
          </button>
          <button class="btn btn-secondary" @click="handleDownload">
            <Icons name="download" :size="20" />
            Download
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

.receive-qr-modal {
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
  .qr-code-container {
    background: var(--color-background);
    border-radius: var(--radius-lg);
    padding: var(--spacing-xl);
    margin-bottom: var(--spacing-lg);
    text-align: center;
  }

  .qr-code {
    background: white;
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    display: inline-block;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: var(--spacing-md);

    svg {
      display: block;
    }
  }

  .user-info {
    h3 {
      font-size: 18px;
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: 4px;
    }

    p {
      font-size: 14px;
      color: var(--color-text-secondary);
    }
  }

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

    input {
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
    }
  }
}

.modal-footer {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);

  .btn {
    flex: 1;
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);

    &.btn-secondary {
      background: var(--color-background);
      color: var(--color-text);

      &:hover {
        background: var(--color-surface);
      }
    }
  }
}
</style>
