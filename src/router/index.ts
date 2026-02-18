import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top when navigating
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: () => import('@/views/WalletView.vue')
    },
    {
      path: '/pay-bills',
      name: 'pay-bills',
      component: () => import('@/views/PayBillsView.vue')
    },
    {
      path: '/rewards',
      name: 'rewards',
      component: () => import('@/views/RewardsView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue')
    },
    {
      path: '/billers/telco',
      name: 'telco-billers',
      component: () => import('@/views/TelcoBillersView.vue')
    },
    {
      path: '/billers/utilities',
      name: 'utilities-billers',
      component: () => import('@/views/UtilitiesBillersView.vue')
    },
    {
      path: '/billers/cable',
      name: 'cable-billers',
      component: () => import('@/views/CableBillersView.vue')
    },
    {
      path: '/billers/government',
      name: 'government-billers',
      component: () => import('@/views/GovernmentBillersView.vue')
    },
    {
      path: '/billers/healthcare',
      name: 'healthcare-billers',
      component: () => import('@/views/HealthcareBillersView.vue')
    },
    {
      path: '/billers/education',
      name: 'education-billers',
      component: () => import('@/views/EducationBillersView.vue')
    },
    {
      path: '/settings/personal-info',
      name: 'personal-info',
      component: () => import('@/views/PersonalInfoView.vue')
    },
    {
      path: '/settings/security',
      name: 'security-privacy',
      component: () => import('@/views/SecurityPrivacyView.vue')
    },
    {
      path: '/settings/notifications',
      name: 'notifications',
      component: () => import('@/views/NotificationsView.vue')
    },
    {
      path: '/settings/help',
      name: 'help-support',
      component: () => import('@/views/HelpSupportView.vue')
    }
  ]
})

export default router
