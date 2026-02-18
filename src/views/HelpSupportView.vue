<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '@/components/TopBar.vue'
import Icons from '@/components/Icons.vue'

const router = useRouter()
const goBack = () => router.back()

const expandedFaq = ref<number | null>(null)

const toggleFaq = (index: number) => {
  expandedFaq.value = expandedFaq.value === index ? null : index
}

const faqs = [
  {
    question: 'How do I add money to my CLiQQ wallet?',
    answer: 'You can add money to your CLiQQ wallet by visiting any 7-Eleven store and requesting a cash-in at the counter. You can also use online banking, GCash, or PayMaya for instant top-ups.'
  },
  {
    question: 'What bills can I pay using CLiQQ?',
    answer: 'CLiQQ allows you to pay for utilities (electricity, water), telecommunications, cable & streaming services, government services (SSS, PhilHealth, Pag-IBIG), healthcare, and education bills. Check the Pay Bills section for the complete list.'
  },
  {
    question: 'How do I earn CLiQQ Rewards points?',
    answer: 'Earn points by making purchases at 7-Eleven stores, paying bills through CLiQQ, or participating in promotional campaigns. Every ₱100 spent earns you reward points that can be redeemed for freebies and discounts.'
  },
  {
    question: 'How long does it take for my payment to reflect?',
    answer: 'Most payments are processed instantly. For some billers, it may take 1-3 business days for the payment to reflect. You will receive a confirmation notification once the payment is successful.'
  },
  {
    question: 'What do I do if my payment failed?',
    answer: 'If your payment failed, the amount will be automatically refunded to your wallet within 24 hours. Check your transaction history for details. If the issue persists, contact our support team for assistance.'
  },
  {
    question: 'How do I change my registered mobile number?',
    answer: 'Go to Profile > Personal Information and tap on your mobile number to edit it. You will receive a verification code to confirm the change. For security, this may require additional identity verification.'
  },
  {
    question: 'Can I cancel a bill payment?',
    answer: 'Once a payment is confirmed, it cannot be cancelled as it is processed immediately. Please double-check all payment details before confirming the transaction.'
  },
  {
    question: 'How do I redeem my rewards points?',
    answer: 'Go to the Rewards tab, browse available rewards, and tap "Redeem" on your chosen item. You can claim your reward at any 7-Eleven store by showing your barcode or transaction code.'
  }
]
</script>

<template>
  <div class="help-view">
    <TopBar title="Help & Support" :show-back="true" @back="goBack" />
    
    <div class="help-view__content">
      <!-- Contact Options -->
      <section class="section">
        <h2 class="section-title">Contact Us</h2>
        <div class="contact-grid">
          <button class="contact-card">
            <div class="contact-icon">📧</div>
            <h4>Email Support</h4>
            <p>support@cliqq.net</p>
          </button>

          <button class="contact-card">
            <div class="contact-icon">📞</div>
            <h4>Call Us</h4>
            <p>1-800-711-7777</p>
          </button>

          <button class="contact-card">
            <div class="contact-icon">💬</div>
            <h4>Live Chat</h4>
            <p>Available 24/7</p>
          </button>

          <button class="contact-card">
            <div class="contact-icon">🏪</div>
            <h4>Visit Store</h4>
            <p>Find a 7-Eleven</p>
          </button>
        </div>
      </section>

      <!-- Frequently Asked Questions -->
      <section class="section">
        <h2 class="section-title">Frequently Asked Questions</h2>
        <div class="faq-list">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="faq-item"
            :class="{ expanded: expandedFaq === index }"
          >
            <button class="faq-question" @click="toggleFaq(index)">
              <span>{{ faq.question }}</span>
              <Icons 
                name="arrow-right" 
                :size="20" 
                class="faq-arrow"
              />
            </button>
            <Transition name="faq-answer">
              <div v-if="expandedFaq === index" class="faq-answer">
                {{ faq.answer }}
              </div>
            </Transition>
          </div>
        </div>
      </section>

      <!-- Help Resources -->
      <section class="section">
        <h2 class="section-title">Help Resources</h2>
        <div class="resource-list">
          <button class="resource-item">
            <div class="resource-icon">
              <Icons name="file-text" :size="20" />
            </div>
            <div class="resource-content">
              <h4>User Guide</h4>
              <p>Complete app tutorial</p>
            </div>
            <Icons name="arrow-right" :size="18" class="resource-arrow" />
          </button>

          <button class="resource-item">
            <div class="resource-icon">
              <Icons name="shield-check" :size="20" />
            </div>
            <div class="resource-content">
              <h4>Privacy Policy</h4>
              <p>How we protect your data</p>
            </div>
            <Icons name="arrow-right" :size="18" class="resource-arrow" />
          </button>

          <button class="resource-item">
            <div class="resource-icon">
              <Icons name="file-text" :size="20" />
            </div>
            <div class="resource-content">
              <h4>Terms of Service</h4>
              <p>App usage policies</p>
            </div>
            <Icons name="arrow-right" :size="18" class="resource-arrow" />
          </button>

          <button class="resource-item">
            <div class="resource-icon">
              <Icons name="alert-circle" :size="20" />
            </div>
            <div class="resource-content">
              <h4>Report a Problem</h4>
              <p>Submit feedback or issues</p>
            </div>
            <Icons name="arrow-right" :size="18" class="resource-arrow" />
          </button>
        </div>
      </section>

      <!-- App Info -->
      <section class="section">
        <div class="app-info">
          <h3>CLiQQ Rewards</h3>
          <p>Version 1.0.0</p>
          <p class="copyright">© 2024 7-Eleven Philippines. All rights reserved.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.help-view {
  min-height: 100vh;
  background: var(--color-background);
  padding-top: var(--top-bar-height);

  &__content {
    padding: var(--spacing-2xl) var(--spacing-xl);
    padding-bottom: calc(var(--bottom-nav-height) + var(--spacing-2xl));
  }
}

/* Section */
.section {
  margin-bottom: var(--spacing-3xl);

  &-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-lg);
  }
}

/* Contact Grid */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.contact-card {
  padding: var(--spacing-xl);
  background: var(--color-surface);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
    border-color: var(--color-primary);
  }

  &:active {
    transform: scale(0.98);
  }

  .contact-icon {
    font-size: 32px;
    margin-bottom: var(--spacing-md);
  }

  h4 {
    font-size: 15px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-xs);
  }

  p {
    font-size: 13px;
    color: var(--color-text-secondary);
    margin: 0;
  }
}

/* FAQ List */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.faq-item {
  background: var(--color-surface);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: all 0.2s;

  &.expanded {
    border-color: var(--color-primary);
  }
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary);
  transition: all 0.2s;

  &:hover {
    background: var(--color-surface-secondary);
  }

  span {
    flex: 1;
    padding-right: var(--spacing-md);
  }
}

.faq-arrow {
  color: var(--color-text-tertiary);
  transition: transform 0.3s;
  flex-shrink: 0;

  .faq-item.expanded & {
    transform: rotate(90deg);
    color: var(--color-primary);
  }
}

.faq-answer {
  padding: 0 var(--spacing-lg) var(--spacing-lg);
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

/* FAQ Answer Transition */
.faq-answer-enter-active,
.faq-answer-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.faq-answer-enter-from,
.faq-answer-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.faq-answer-enter-to,
.faq-answer-leave-from {
  opacity: 1;
  max-height: 500px;
}

/* Resource List */
.resource-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.resource-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    box-shadow: var(--shadow-sm);
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
}

.resource-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface-secondary);
  border-radius: var(--radius-md);
  flex-shrink: 0;
  color: var(--color-text-secondary);
}

.resource-content {
  flex: 1;
  min-width: 0;

  h4 {
    font-size: 15px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 4px;
  }

  p {
    font-size: 13px;
    color: var(--color-text-secondary);
    margin: 0;
  }
}

.resource-arrow {
  color: var(--color-text-tertiary);
  flex-shrink: 0;
}

/* App Info */
.app-info {
  text-align: center;
  padding: var(--spacing-2xl);

  .app-logo {
    width: 60px;
    height: 60px;
    margin: 0 auto var(--spacing-lg);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    padding: var(--spacing-md);
  }

  h3 {
    font-size: 18px;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-xs);
  }

  p {
    font-size: 13px;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xs);

    &.copyright {
      margin-top: var(--spacing-lg);
      font-size: 12px;
      color: var(--color-text-tertiary);
    }
  }
}
</style>
