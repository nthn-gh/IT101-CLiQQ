<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Icons from './Icons.vue'
import jsQR from 'jsqr'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
  scanned: [data: string]
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const stream = ref<MediaStream | null>(null)
const scanning = ref(false)
const error = ref('')
const hasPermission = ref(false)

let animationFrameId: number | null = null

const closeModal = () => {
  stopScanning()
  emit('close')
}

const startScanning = async () => {
  error.value = ''
  
  try {
    // Request camera permission
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' } // Use back camera on mobile
    })
    
    stream.value = mediaStream
    hasPermission.value = true
    
    if (videoRef.value) {
      videoRef.value.srcObject = mediaStream
      videoRef.value.setAttribute('playsinline', 'true') // Required for iOS
      await videoRef.value.play()
      scanning.value = true
      requestAnimationFrame(tick)
    }
  } catch (err: any) {
    console.error('Camera access error:', err)
    if (err.name === 'NotAllowedError') {
      error.value = 'Camera access denied. Please allow camera permissions in your browser settings.'
    } else if (err.name === 'NotFoundError') {
      error.value = 'No camera found on this device.'
    } else if (err.name === 'NotReadableError') {
      error.value = 'Camera is already in use by another application.'
    } else {
      error.value = 'Unable to access camera. Please check permissions and try again.'
    }
    hasPermission.value = false
  }
}

const stopScanning = () => {
  scanning.value = false
  
  // Stop animation frame
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  
  // Stop video stream
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
    stream.value = null
  }
  
  // Clear video
  if (videoRef.value) {
    videoRef.value.srcObject = null
  }
}

const tick = () => {
  if (!scanning.value || !videoRef.value || !canvasRef.value) {
    return
  }
  
  const video = videoRef.value
  const canvas = canvasRef.value
  const canvasContext = canvas.getContext('2d')
  
  if (!canvasContext || video.readyState !== video.HAVE_ENOUGH_DATA) {
    animationFrameId = requestAnimationFrame(tick)
    return
  }
  
  // Set canvas dimensions to match video
  canvas.height = video.videoHeight
  canvas.width = video.videoWidth
  
  // Draw video frame to canvas
  canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height)
  
  // Get image data and scan for QR code
  const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height)
  const code = jsQR(imageData.data, imageData.width, imageData.height, {
    inversionAttempts: 'dontInvert'
  })
  
  if (code && code.data) {
    // QR code detected
    scanning.value = false
    stopScanning()
    emit('scanned', code.data)
  } else {
    // Continue scanning
    animationFrameId = requestAnimationFrame(tick)
  }
}

// Watch for modal open/close
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    startScanning()
  } else {
    stopScanning()
  }
})

// Cleanup on unmount
onBeforeUnmount(() => {
  stopScanning()
})
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="scanner-overlay" @click="closeModal">
      <div class="scanner-container" @click.stop>
        <div class="scanner-header">
          <h2>Scan QR Code</h2>
          <button class="close-btn" @click="closeModal">
            <Icons name="x" :size="24" />
          </button>
        </div>

        <div class="scanner-body">
          <div v-if="error" class="error-message">
            <Icons name="info" :size="24" />
            <p>{{ error }}</p>
            <button class="retry-btn" @click="startScanning">Try Again</button>
          </div>

          <div v-else class="camera-container">
            <video ref="videoRef" class="camera-video" autoplay playsinline></video>
            <canvas ref="canvasRef" class="camera-canvas"></canvas>
            
            <div class="scan-frame">
              <div class="corner top-left"></div>
              <div class="corner top-right"></div>
              <div class="corner bottom-left"></div>
              <div class="corner bottom-right"></div>
            </div>

            <div class="scan-instructions">
              <p>Position QR code within the frame</p>
            </div>
          </div>
        </div>

        <div class="scanner-footer">
          <p class="help-text">
            Make sure the QR code is well-lit and centered in the frame
          </p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.scanner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: var(--spacing-lg);
}

.scanner-container {
  background: #1a1a1a;
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.3s ease-out;
  display: flex;
  flex-direction: column;
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

.scanner-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  h2 {
    font-size: 20px;
    font-weight: 700;
    color: white;
  }

  .close-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
    color: white;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
}

.scanner-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  position: relative;
}

.error-message {
  text-align: center;
  color: white;
  padding: var(--spacing-xl);

  svg {
    color: #EF4444;
    margin-bottom: var(--spacing-md);
  }

  p {
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: var(--spacing-lg);
    color: rgba(255, 255, 255, 0.8);
  }

  .retry-btn {
    padding: 12px 24px;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #E55F00;
    }
  }
}

.camera-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.camera-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.camera-canvas {
  display: none;
}

.scan-frame {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  pointer-events: none;

  .corner {
    position: absolute;
    width: 30px;
    height: 30px;
    border: 3px solid var(--color-primary);

    &.top-left {
      top: 0;
      left: 0;
      border-right: none;
      border-bottom: none;
    }

    &.top-right {
      top: 0;
      right: 0;
      border-left: none;
      border-bottom: none;
    }

    &.bottom-left {
      bottom: 0;
      left: 0;
      border-right: none;
      border-top: none;
    }

    &.bottom-right {
      bottom: 0;
      right: 0;
      border-left: none;
      border-top: none;
    }
  }
}

.scan-instructions {
  position: absolute;
  bottom: var(--spacing-lg);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-full);
  white-space: nowrap;

  p {
    font-size: 13px;
    font-weight: 500;
    color: white;
  }
}

.scanner-footer {
  padding: var(--spacing-lg);
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  .help-text {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
    line-height: 1.6;
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
