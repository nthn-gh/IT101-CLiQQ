<script setup lang="ts">
import { ref, computed } from 'vue'
import Icons from './Icons.vue'

const props = defineProps<{
  availablePoints: number
  currentMB: number
}>()

const emit = defineEmits<{
  close: []
  convert: [points: number, mb: number]
}>()

// Conversion rate: 10 points = 100 MB
const POINTS_PER_100MB = 10

const selectedMB = ref(0)

const mbPackages = [
  { mb: 100, points: 10, label: '100 MB', popular: false },
  { mb: 500, points: 50, label: '500 MB', popular: true },
  { mb: 1000, points: 100, label: '1 GB', popular: false },
  { mb: 3000, points: 300, label: '3 GB', popular: false },
  { mb: 5000, points: 500, label: '5 GB', popular: false },
]

const requiredPoints = computed(() => {
  const selected = mbPackages.find(pkg => pkg.mb === selectedMB.value)
  return selected ? selected.points : 0
})

const canConvert = computed(() => {
  return selectedMB.value > 0 && props.availablePoints >= requiredPoints.value
})

const selectPackage = (mb: number) => {
  selectedMB.value = mb
}

const handleConvert = () => {
  if (!canConvert.value) return
  emit('convert', requiredPoints.value, selectedMB.value)
}
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click="emit('close')">
      <div class="modal-container wifi-modal" @click.stop>
        <!-- Header -->
        <div class="modal-header">
          <div class="header-content">
            <div class="wifi-icon">📶</div>
            <div>
              <h2>7-Eleven WiFi</h2>
              <p class="subtitle">Convert points to WiFi data</p>
            </div>
          </div>
          <button class="modal-close" @click="emit('close')">
            <Icons name="times" :size="24" />
          </button>
        </div>

        <!-- Content -->
        <div class="modal-content">
          <!-- Current Balance -->
          <div class="balance-card">
            <div class="balance-item">
              <span class="balance-label">Available Points</span>
              <span class="balance-value points">{{ availablePoints.toLocaleString() }}</span>
            </div>
            <div class="balance-divider"></div>
            <div class="balance-item">
              <span class="balance-label">Current WiFi MB</span>
              <span class="balance-value mb">{{ currentMB.toLocaleString() }} MB</span>
            </div>
          </div>

          <!-- Conversion Rate Info -->
          <div class="info-box">
            <Icons name="info" :size="20" />
            <span>10 points = 100 MB of 7-Eleven WiFi</span>
          </div>

          <!-- MB Packages -->
          <div class="form-group">
            <label class="form-label">Select Data Package</label>
            <div class="packages-grid">
              <button
                v-for="pkg in mbPackages"
                :key="pkg.mb"
                class="package-card"
                :class="{ active: selectedMB === pkg.mb, popular: pkg.popular }"
                @click="selectPackage(pkg.mb)"
              >
                <span v-if="pkg.popular" class="badge-popular">Popular</span>
                <div class="package-mb">{{ pkg.label }}</div>
                <div class="package-points">{{ pkg.points }} points</div>
              </button>
            </div>
          </div>

          <!-- Conversion Summary -->
          <div v-if="selectedMB > 0" class="summary-card">
            <div class="summary-row">
              <span class="summary-label">Data Package</span>
              <span class="summary-value">{{ mbPackages.find(p => p.mb === selectedMB)?.label }}</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">Points Required</span>
              <span class="summary-value">{{ requiredPoints }} points</span>
            </div>
            <div class="summary-divider"></div>
            <div class="summary-row summary-total">
              <span class="summary-label">Remaining Points</span>
              <span class="summary-value">{{ (availablePoints - requiredPoints).toLocaleString() }}</span>
            </div>
            <div class="summary-row summary-total">
              <span class="summary-label">Total WiFi MB</span>
              <span class="summary-value">{{ (currentMB + selectedMB).toLocaleString() }} MB</span>
            </div>
          </div>

          <!-- How to Use -->
          <div class="info-section">
            <h4>How to Use</h4>
            <ol>
              <li>Connect to "7-Eleven WiFi" network at any 7-Eleven store</li>
              <li>Open your browser and login with your CLiQQ account</li>
              <li>Your WiFi MB will be automatically applied</li>
              <li>Valid for 30 days from conversion</li>
            </ol>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button class="btn-secondary" @click="emit('close')">Cancel</button>
          <button 
            class="btn-primary" 
            :disabled="!canConvert"
            @click="handleConvert"
          >
            Convert Now
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
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px 24px 16px;
  border-bottom: 1px solid #f0f0f0;

  .header-content {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .wifi-icon {
    font-size: 40px;
    line-height: 1;
  }

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 4px 0;
  }

  .subtitle {
    font-size: 14px;
    color: #666;
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
  flex-shrink: 0;

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

.balance-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #ff6900 0%, #e55f00 100%);
  border-radius: 16px;
  margin-bottom: 16px;
}

.balance-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.balance-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
}

.balance-value {
  font-size: 24px;
  font-weight: 700;
  color: white;

  &.points::after {
    content: ' pts';
    font-size: 14px;
    font-weight: 500;
  }
}

.balance-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
}

.info-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #e3f2fd;
  border-radius: 12px;
  color: #1976d2;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
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

.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.package-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 16px;
  background: #f8f8f8;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f0f0f0;
  }

  &.active {
    background: #fff5f0;
    border-color: #ff6900;
  }

  &.popular {
    border-color: #ffd700;
  }
}

.badge-popular {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  background: #ffd700;
  color: #1a1a1a;
  font-size: 11px;
  font-weight: 700;
  border-radius: 6px;
  text-transform: uppercase;
}

.package-mb {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
}

.package-points {
  font-size: 13px;
  color: #666;
}

.active .package-mb,
.active .package-points {
  color: #ff6900;
}

.summary-card {
  background: #f8f8f8;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
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
    font-size: 15px;
    font-weight: 700;
    color: #1a1a1a;
  }
}

.info-section {
  h4 {
    font-size: 15px;
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
      line-height: 1.6;
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.modal-footer {
  padding: 16px 24px 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  gap: 12px;
}

.btn-secondary,
.btn-primary {
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary {
  background: #f5f5f5;
  color: #1a1a1a;

  &:hover {
    background: #e5e5e5;
  }
}

.btn-primary {
  background: #ff6900;
  color: white;

  &:hover:not(:disabled) {
    background: #e55f00;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 105, 0, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
