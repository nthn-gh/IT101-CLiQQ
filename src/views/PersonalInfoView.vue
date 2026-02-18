<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '@/components/TopBar.vue'
import Icons from '@/components/Icons.vue'

const router = useRouter()
const goBack = () => router.back()

const firstName = ref('Juan')
const lastName = ref('dela Cruz')
const email = ref('juan.delacruz@email.com')
const phone = ref('+63 917 123 4567')
const birthdate = ref('1990-05-15')
const address = ref('123 Main Street, Quezon City, Metro Manila')

const isEditing = ref(false)

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

const saveChanges = () => {
  // Save logic here
  isEditing.value = false
  alert('Changes saved successfully!')
}
</script>

<template>
  <div class="personal-info-view">
    <TopBar title="Personal Information" :show-back="true" @back="goBack" />
    
    <div class="personal-info-view__content">
      <!-- Profile Photo -->
      <section class="section">
        <div class="photo-section">
          <div class="user-avatar">
            <span>JD</span>
          </div>
          <button class="change-photo-btn">
            <Icons name="plus" :size="16" />
            Change Photo
          </button>
        </div>
      </section>

      <!-- Personal Details -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">Personal Details</h2>
          <button v-if="!isEditing" class="edit-btn" @click="toggleEdit">
            Edit
          </button>
        </div>

        <div class="form-container">
          <div class="form-field">
            <label>First Name</label>
            <input 
              v-model="firstName" 
              type="text" 
              :disabled="!isEditing"
              :class="{ 'is-disabled': !isEditing }"
            />
          </div>

          <div class="form-field">
            <label>Last Name</label>
            <input 
              v-model="lastName" 
              type="text" 
              :disabled="!isEditing"
              :class="{ 'is-disabled': !isEditing }"
            />
          </div>

          <div class="form-field">
            <label>Email Address</label>
            <input 
              v-model="email" 
              type="email" 
              :disabled="!isEditing"
              :class="{ 'is-disabled': !isEditing }"
            />
          </div>

          <div class="form-field">
            <label>Phone Number</label>
            <input 
              v-model="phone" 
              type="tel" 
              :disabled="!isEditing"
              :class="{ 'is-disabled': !isEditing }"
            />
          </div>

          <div class="form-field">
            <label>Date of Birth</label>
            <input 
              v-model="birthdate" 
              type="date" 
              :disabled="!isEditing"
              :class="{ 'is-disabled': !isEditing }"
            />
          </div>

          <div class="form-field">
            <label>Address</label>
            <textarea 
              v-model="address" 
              :disabled="!isEditing"
              :class="{ 'is-disabled': !isEditing }"
              rows="3"
            ></textarea>
          </div>
        </div>

        <div v-if="isEditing" class="action-buttons">
          <button class="btn-secondary" @click="toggleEdit">Cancel</button>
          <button class="btn-primary" @click="saveChanges">Save Changes</button>
        </div>
      </section>

      <!-- Account Info -->
      <section class="section">
        <h2 class="section-title">Account Information</h2>
        <div class="info-list">
          <div class="info-item">
            <div class="info-label">Member Since</div>
            <div class="info-value">January 15, 2024</div>
          </div>
          <div class="info-item">
            <div class="info-label">Member ID</div>
            <div class="info-value">CLI-2024-001234</div>
          </div>
          <div class="info-item">
            <div class="info-label">Membership Tier</div>
            <div class="info-value">
              <span class="tier-badge">Gold Member</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.personal-info-view {
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

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
  }

  &-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--color-text-primary);
  }
}

/* Photo Section */
.photo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-2xl);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
}

.user-avatar {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-primary) 0%, #E55F00 100%);
  border-radius: 50%;
  font-size: 40px;
  font-weight: 700;
  color: white;
  box-shadow: var(--shadow-md);
}

.change-photo-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 12px 24px;
  background: var(--color-surface);
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--color-primary-light);
  }

  &:active {
    transform: scale(0.98);
  }
}

.edit-btn {
  padding: 8px 16px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 14px;
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

/* Form */
.form-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  label {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-primary);
  }

  input,
  textarea {
    padding: 14px 16px;
    background: var(--color-surface);
    border: 2px solid var(--color-divider);
    border-radius: var(--radius-md);
    font-size: 15px;
    color: var(--color-text-primary);
    transition: all 0.2s;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: var(--shadow-sm);
    }

    &.is-disabled {
      background: var(--color-surface-secondary);
      color: var(--color-text-secondary);
      cursor: not-allowed;
    }

    &::placeholder {
      color: var(--color-text-tertiary);
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
}

.btn-secondary,
.btn-primary {
  flex: 1;
  padding: 16px 24px;
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.98);
  }
}

.btn-secondary {
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 2px solid var(--color-divider);

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
}

.btn-primary {
  background: var(--color-primary);
  color: white;
  border: none;
  box-shadow: var(--shadow-sm);

  &:hover {
    background: #E55F00;
    box-shadow: var(--shadow-md);
  }
}

/* Info List */
.info-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
}

.info-label {
  font-size: 14px;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.info-value {
  font-size: 15px;
  color: var(--color-text-primary);
  font-weight: 600;
}

.tier-badge {
  padding: 6px 12px;
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 600;
}
</style>
