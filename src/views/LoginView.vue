<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Icons from '@/components/Icons.vue'

const router = useRouter()

const isLogin = ref(true)
const showConsent = ref(false)
const showOTP = ref(false)
const isLoading = ref(false)

// Form fields
const email = ref('')
const password = ref('')
const fullName = ref('')
const mobileNumber = ref('')
const confirmPassword = ref('')
const termsAccepted = ref(false)

// OTP fields
const otpCode = ref(['', '', '', '', '', ''])
const mockOTP = '123456'
const otpError = ref('')

const toggleMode = () => {
  isLogin.value = !isLogin.value
  // Reset form
  email.value = ''
  password.value = ''
  fullName.value = ''
  mobileNumber.value = ''
  confirmPassword.value = ''
}

const handleSubmit = () => {
  // Basic validation
  if (isLogin.value) {
    if (!email.value || !password.value) {
      alert('Please fill in all fields')
      return
    }
  } else {
    if (!fullName.value || !email.value || !mobileNumber.value || !password.value || !confirmPassword.value) {
      alert('Please fill in all fields')
      return
    }
    if (password.value !== confirmPassword.value) {
      alert('Passwords do not match')
      return
    }
  }

  // For registration, show consent form
  // For login, go directly (assume already consented during registration)
  if (!isLogin.value) {
    showConsent.value = true
  } else {
    // Simulate login
    isLoading.value = true
    setTimeout(() => {
      router.push('/home')
    }, 1000)
  }
}

const handleConsentAccept = () => {
  if (!termsAccepted.value) {
    alert('Please accept the Terms and Conditions to continue')
    return
  }

  // Show OTP screen
  showConsent.value = false
  showOTP.value = true
}

const handleConsentBack = () => {
  showConsent.value = false
  termsAccepted.value = false
}

const handleOTPInput = (index: number, event: Event) => {
  const input = event.target as HTMLInputElement
  const value = input.value.replace(/\D/g, '') // Only digits
  
  if (value) {
    otpCode.value[index] = value[0]
    // Auto-focus next input
    if (index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }
  
  otpError.value = ''
}

const handleOTPKeydown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && !otpCode.value[index] && index > 0) {
    const prevInput = document.getElementById(`otp-${index - 1}`)
    prevInput?.focus()
  }
}

const handleOTPPaste = (event: ClipboardEvent) => {
  event.preventDefault()
  const pastedData = event.clipboardData?.getData('text').replace(/\D/g, '').slice(0, 6) || ''
  
  for (let i = 0; i < pastedData.length; i++) {
    otpCode.value[i] = pastedData[i]
  }
  
  const lastFilledIndex = Math.min(pastedData.length - 1, 5)
  const lastInput = document.getElementById(`otp-${lastFilledIndex}`)
  lastInput?.focus()
}

const handleOTPSubmit = () => {
  const enteredOTP = otpCode.value.join('')
  
  if (enteredOTP.length !== 6) {
    otpError.value = 'Please enter the complete 6-digit OTP'
    return
  }
  
  if (enteredOTP === mockOTP) {
    // OTP verified, complete registration
    isLoading.value = true
    setTimeout(() => {
      router.push('/home')
    }, 1000)
  } else {
    otpError.value = 'Invalid OTP. Please try again.'
    otpCode.value = ['', '', '', '', '', '']
    const firstInput = document.getElementById('otp-0')
    firstInput?.focus()
  }
}

const handleOTPBack = () => {
  showOTP.value = false
  showConsent.value = true
  otpCode.value = ['', '', '', '', '', '']
  otpError.value = ''
}

const resendOTP = () => {
  // Mock resend
  alert('OTP resent! Use: 123456')
  otpCode.value = ['', '', '', '', '', '']
  otpError.value = ''
}
</script>

<template>
  <div class="login-view">
    <!-- Consent Screen -->
    <Transition name="slide">
      <div v-if="showConsent" class="consent-screen">
        <div class="consent-content">
          <div class="consent-header">
            <button class="back-btn" @click="handleConsentBack">
              <Icons name="chevron-left" :size="24" />
            </button>
            <h2>Terms & Conditions</h2>
          </div>

          <div class="consent-body">
            <div class="terms-box">
              <div class="terms-content">
                <h3>7-Eleven CLiQQ Rewards Terms of Service</h3>
                
                <section>
                  <h4>1. Acceptance of Terms</h4>
                  <p>By creating an account and using the 7-Eleven CLiQQ Rewards app, you agree to be bound by these Terms and Conditions. Please read them carefully before proceeding.</p>
                </section>

                <section>
                  <h4>2. Privacy & Data Collection</h4>
                  <p>We collect and process your personal information including name, email, mobile number, and transaction history to provide you with our services. Your data will be protected in accordance with the Data Privacy Act of 2012.</p>
                  <ul>
                    <li>Transaction history for rewards calculation</li>
                    <li>Location data for store locator features</li>
                    <li>Payment information for secure transactions</li>
                  </ul>
                </section>

                <section>
                  <h4>3. Rewards Program</h4>
                  <p>The CLiQQ Rewards program allows you to earn points on eligible purchases at 7-Eleven stores nationwide. Points can be redeemed for rewards as specified in the app.</p>
                  <ul>
                    <li>Points expire after 12 months of inactivity</li>
                    <li>Rewards are subject to availability</li>
                    <li>One redemption per barcode</li>
                  </ul>
                </section>

                <section>
                  <h4>4. Account Security</h4>
                  <p>You are responsible for maintaining the confidentiality of your account credentials. Notify us immediately of any unauthorized access to your account.</p>
                </section>

                <section>
                  <h4>5. Prohibited Activities</h4>
                  <p>You agree not to:</p>
                  <ul>
                    <li>Use the app for any illegal purposes</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Share or sell your account to others</li>
                    <li>Manipulate the rewards system</li>
                  </ul>
                </section>

                <section>
                  <h4>6. Modifications</h4>
                  <p>7-Eleven reserves the right to modify these terms at any time. Continued use of the app constitutes acceptance of modified terms.</p>
                </section>

                <section>
                  <h4>7. Contact Information</h4>
                  <p>For questions or concerns about these terms, contact us at support@cliqq.net or call our hotline at 1-800-711-7711.</p>
                </section>

                <p class="last-updated">Last updated: February 18, 2026</p>
              </div>
            </div>

            <div class="consent-actions">
              <label class="checkbox-container">
                <input type="checkbox" v-model="termsAccepted">
                <span class="checkmark"></span>
                <span class="checkbox-label">I have read and agree to the Terms and Conditions</span>
              </label>

              <button 
                class="accept-btn" 
                :class="{ primary: termsAccepted }"
                :disabled="!termsAccepted || isLoading"
                @click="handleConsentAccept"
              >
                <span v-if="!isLoading">Accept & Continue</span>
                <span v-else>Processing...</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- OTP Verification Screen -->
    <Transition name="slide">
      <div v-if="showOTP" class="otp-screen">
        <div class="otp-content">
          <div class="otp-header">
            <button class="back-btn" @click="handleOTPBack">
              <Icons name="chevron-left" :size="24" />
            </button>
            <h2>Verify Mobile Number</h2>
          </div>

          <div class="otp-body">
            <div class="otp-icon">📱</div>
            <p class="otp-description">
              We've sent a 6-digit verification code to<br>
              <strong>{{ mobileNumber }}</strong>
            </p>
            <p class="otp-mock-hint">Mock OTP: <strong>123456</strong></p>

            <div class="otp-inputs">
              <input
                v-for="(digit, index) in otpCode"
                :key="index"
                :id="`otp-${index}`"
                type="text"
                inputmode="numeric"
                maxlength="1"
                :value="digit"
                @input="handleOTPInput(index, $event)"
                @keydown="handleOTPKeydown(index, $event)"
                @paste="index === 0 ? handleOTPPaste($event) : null"
                class="otp-input"
                :class="{ error: otpError }"
              />
            </div>

            <p v-if="otpError" class="otp-error">{{ otpError }}</p>

            <button 
              class="otp-submit-btn"
              :disabled="otpCode.join('').length !== 6 || isLoading"
              @click="handleOTPSubmit"
            >
              <span v-if="!isLoading">Verify & Continue</span>
              <span v-else>Verifying...</span>
            </button>

            <div class="otp-resend">
              <p>Didn't receive the code?</p>
              <button @click="resendOTP" class="resend-btn">Resend OTP</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Login/Register Screen -->
    <div v-show="!showConsent && !showOTP" class="auth-container">
      <!-- Header -->
      <div class="auth-header">
        <div class="logo-container">
          <div class="logo">7-Eleven</div>
          <p class="tagline">CLiQQ Rewards</p>
        </div>
      </div>

      <!-- Form Card -->
      <div class="auth-card">
        <div class="auth-tabs">
          <button 
            class="auth-tab" 
            :class="{ active: isLogin }"
            @click="isLogin = true"
          >
            Log In
          </button>
          <button 
            class="auth-tab" 
            :class="{ active: !isLogin }"
            @click="isLogin = false"
          >
            Register
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="auth-form">
          <!-- Registration Fields -->
          <div v-if="!isLogin" class="form-group">
            <label for="fullName">Full Name</label>
            <input 
              type="text" 
              id="fullName"
              v-model="fullName"
              placeholder="Juan dela Cruz"
              required
            />
          </div>

          <div v-if="!isLogin" class="form-group">
            <label for="mobileNumber">Mobile Number</label>
            <input 
              type="tel" 
              id="mobileNumber"
              v-model="mobileNumber"
              placeholder="09171234567"
              pattern="09[0-9]{9}"
              maxlength="11"
              required
            />
            <small class="input-hint">Must start with 09 and be 11 digits</small>
          </div>

          <!-- Common Fields -->
          <div class="form-group">
            <label for="email">Email Address</label>
            <input 
              type="email" 
              id="email"
              v-model="email"
              placeholder="juan@example.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password"
              v-model="password"
              placeholder="Enter your password"
              minlength="6"
              required
            />
          </div>

          <div v-if="!isLogin" class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword"
              v-model="confirmPassword"
              placeholder="Re-enter your password"
              minlength="6"
              required
            />
          </div>

          <!-- Forgot Password (Login only) -->
          <div v-if="isLogin" class="forgot-password">
            <a href="#" @click.prevent>Forgot password?</a>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="submit-btn"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">{{ isLogin ? 'Log In' : 'Create Account' }}</span>
            <span v-else>Processing...</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="divider">
          <span>or continue with</span>
        </div>

        <!-- Social Login -->
        <div class="social-login">
          <button class="social-btn google">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Google</span>
          </button>
          
          <button class="social-btn facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Facebook</span>
          </button>
        </div>

        <!-- Terms Notice (Register only) -->
        <p v-if="!isLogin" class="terms-notice">
          By creating an account, you agree to our Terms and Conditions and Privacy Policy
        </p>
      </div>

      <!-- Footer -->
      <div class="auth-footer">
        <p>© 2026 7-Eleven. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #FF6B00 0%, #FF8533 100%);
  position: relative;
  overflow: hidden;
}

.auth-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-xl);
  padding-top: var(--spacing-3xl);
}

.auth-header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
  
  .logo-container {
    .logo {
      font-size: 42px;
      font-weight: 800;
      color: white;
      text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      margin-bottom: var(--spacing-sm);
      letter-spacing: -1px;
    }
    
    .tagline {
      font-size: 18px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.95);
      letter-spacing: 0.5px;
    }
  }
}

.auth-card {
  width: 100%;
  max-width: 440px;
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.auth-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--color-surface);
  border-bottom: 2px solid var(--color-divider);
  
  .auth-tab {
    padding: var(--spacing-lg);
    background: transparent;
    border: none;
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    
    &.active {
      color: var(--color-primary);
      
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--color-primary);
      }
    }
    
    &:hover:not(.active) {
      color: var(--color-text-primary);
    }
  }
}

.auth-form {
  padding: var(--spacing-xl);
}

.form-group {
  margin-bottom: var(--spacing-lg);
  
  label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);
  }
  
  input {
    width: 100%;
    padding: 14px 16px;
    border: 2px solid var(--color-divider);
    border-radius: var(--radius-md);
    font-size: 15px;
    transition: all 0.2s;
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
    }
    
    &::placeholder {
      color: var(--color-text-tertiary);
    }
  }

  .input-hint {
    display: block;
    font-size: 12px;
    color: var(--color-text-tertiary);
    margin-top: var(--spacing-xs);
  }
}

.forgot-password {
  text-align: right;
  margin-bottom: var(--spacing-lg);
  
  a {
    font-size: 14px;
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.submit-btn {
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
  
  &:hover:not(:disabled) {
    background: #E55F00;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 107, 0, 0.3);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.divider {
  padding: 0 var(--spacing-xl);
  margin: var(--spacing-xl) 0;
  text-align: center;
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 35%;
    height: 1px;
    background: var(--color-divider);
  }
  
  &::before {
    left: var(--spacing-xl);
  }
  
  &::after {
    right: var(--spacing-xl);
  }
  
  span {
    font-size: 13px;
    color: var(--color-text-tertiary);
    background: white;
    padding: 0 var(--spacing-sm);
  }
}

.social-login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
  padding: 0 var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: 12px;
  background: white;
  border: 2px solid var(--color-divider);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: var(--color-text-tertiary);
    box-shadow: var(--shadow-sm);
  }
  
  &.google {
    color: #4285F4;
  }
  
  &.facebook {
    color: #1877F2;
  }
}

.terms-notice {
  padding: 0 var(--spacing-xl) var(--spacing-xl);
  font-size: 12px;
  color: var(--color-text-tertiary);
  text-align: center;
  line-height: 1.6;
}

.auth-footer {
  margin-top: auto;
  padding: var(--spacing-xl);
  text-align: center;
  
  p {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);
  }
}

/* Consent Screen */
.consent-screen {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 10;
  overflow-y: auto;
}

.consent-content {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.consent-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: white;
  border-bottom: 2px solid var(--color-divider);
  position: sticky;
  top: 0;
  z-index: 10;
  
  .back-btn {
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
  
  h2 {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-text-primary);
  }
}

.consent-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg);
}

.terms-box {
  flex: 1;
  background: var(--color-surface);
  border: 2px solid var(--color-divider);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  max-height: 60vh;
  overflow-y: auto;
}

.terms-content {
  h3 {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-xl);
  }
  
  section {
    margin-bottom: var(--spacing-xl);
  }
  
  h4 {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);
  }
  
  p {
    font-size: 14px;
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin-bottom: var(--spacing-sm);
  }
  
  ul {
    list-style: none;
    margin-left: var(--spacing-lg);
    margin-top: var(--spacing-sm);
    
    li {
      font-size: 14px;
      color: var(--color-text-secondary);
      line-height: 1.6;
      padding-left: var(--spacing-lg);
      position: relative;
      margin-bottom: var(--spacing-xs);
      
      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--color-primary);
        font-weight: 700;
      }
    }
  }
  
  .last-updated {
    margin-top: var(--spacing-xl);
    font-size: 13px;
    color: var(--color-text-tertiary);
    font-style: italic;
  }
}

.consent-actions {
  background: white;
  position: sticky;
  bottom: 0;
  padding-top: var(--spacing-lg);
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  cursor: pointer;
  margin-bottom: var(--spacing-lg);
  
  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    
    &:checked ~ .checkmark {
      background: var(--color-primary);
      border-color: var(--color-primary);
      
      &::after {
        display: block;
      }
    }
  }
  
  .checkmark {
    width: 24px;
    height: 24px;
    border: 2px solid var(--color-divider);
    border-radius: 6px;
    flex-shrink: 0;
    position: relative;
    transition: all 0.2s;
    
    &::after {
      content: '';
      position: absolute;
      display: none;
      left: 7px;
      top: 3px;
      width: 6px;
      height: 11px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
  
  .checkbox-label {
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-primary);
    line-height: 1.5;
  }
}

.accept-btn {
  width: 100%;
  padding: 16px;
  background: var(--color-surface);
  color: var(--color-text-secondary);
  border: 2px solid var(--color-divider);
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 600;
  cursor: not-allowed;
  transition: all 0.2s;
  
  &.primary {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
    cursor: pointer;
    
    &:hover:not(:disabled) {
      background: #E55F00;
      box-shadow: 0 4px 12px rgba(255, 107, 0, 0.3);
    }
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

/* OTP Screen */
.otp-screen {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.otp-content {
  width: 100%;
  max-width: 480px;
  padding: var(--spacing-3xl);
}

.otp-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-3xl);
  
  .back-btn {
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
  
  h2 {
    font-size: 24px;
    font-weight: 700;
    color: var(--color-text-primary);
  }
}

.otp-body {
  text-align: center;
}

.otp-icon {
  font-size: 64px;
  margin-bottom: var(--spacing-xl);
}

.otp-description {
  font-size: 15px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  
  strong {
    color: var(--color-text-primary);
    font-weight: 600;
  }
}

.otp-mock-hint {
  font-size: 14px;
  color: var(--color-primary);
  background: rgba(255, 105, 0, 0.1);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  display: inline-block;
  margin-bottom: var(--spacing-3xl);
  
  strong {
    font-weight: 700;
  }
}

.otp-inputs {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  margin-bottom: var(--spacing-xl);
}

.otp-input {
  width: 48px;
  height: 56px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  border: 2px solid var(--color-divider);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    background: white;
  }
  
  &.error {
    border-color: #DC2626;
    animation: shake 0.4s;
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}

.otp-error {
  color: #DC2626;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: var(--spacing-lg);
}

.otp-submit-btn {
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
  margin-bottom: var(--spacing-xl);
  
  &:hover:not(:disabled) {
    background: #E55F00;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 105, 0, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.otp-resend {
  p {
    font-size: 14px;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-sm);
  }
  
  .resend-btn {
    background: none;
    border: none;
    color: var(--color-primary);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
    padding: 0;
    
    &:hover {
      color: #E55F00;
    }
  }
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
