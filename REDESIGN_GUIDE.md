# 7-Eleven CLiQQ Rewards App - UI Redesign

## Overview
This is a complete UI redesign of the CLiQQ Rewards mobile app inspired by GoTyme Bank's modern, clean, and user-friendly design principles.

## Design Philosophy

### Visual Style
- **Light, neutral background** with subtle gradients
- **Card-based layout** with soft shadows and rounded corners
- **Generous spacing** for clean, uncluttered appearance
- **Minimal color usage** - brand colors (orange/green) only for primary actions
- **Modern outline icons** with subtle accent colors
- **Premium feel** with smooth transitions and interactions

### Key Principles
1. **Strong visual hierarchy** - Most important information first
2. **One primary action per screen** - Clear user flow
3. **Human-readable labels** - No technical jargon
4. **Large tap targets** (48px+) - Easy interaction
5. **Beginner-friendly** - Intuitive navigation

## New Components

### 1. BarcodeCard Component
**Location:** `src/components/BarcodeCard.vue`

**Features:**
- Compact barcode preview on home screen
- Tap to expand to full-screen modal
- High-contrast barcode for easy scanning
- Clear instructions for cashier use
- Swipe down to dismiss

**Usage:**
```vue
<BarcodeCard 
  barcode-number="76543210123456"
  member-name="Juan dela Cruz"
/>
```

### 2. InfoCard Component
**Location:** `src/components/InfoCard.vue`

**Features:**
- Reusable card container with consistent styling
- Optional title and subtitle
- Clickable variant for navigation
- Optional padding control

**Usage:**
```vue
<InfoCard
  title="Your Rewards"
  subtitle="Earn more points"
  clickable
  @click="handleClick"
>
  <div>Card content here</div>
</InfoCard>
```

### 3. QuickAction Component
**Location:** `src/components/QuickAction.vue`

**Features:**
- Circular icon with label
- Primary/secondary variants
- Consistent sizing and spacing
- Hover/tap animations

**Usage:**
```vue
<QuickAction 
  icon="phone" 
  label="Buy Load"
  variant="primary"
  @click="handleAction"
/>
```

## Home Screen Layout

### Structure
1. **Top Bar**
   - App logo (7-Eleven CLiQQ)
   - Notification icon with badge
   - Clean, minimal design

2. **Welcome Header**
   - Greeting message
   - User name
   - Personal touch

3. **Balance Display** (Prominent)
   - Large, eye-catching gradient card
   - Total balance in large text
   - Rewards points summary
   - Premium gradient background with subtle pattern

4. **Member Barcode Card**
   - Prominently positioned for quick access
   - Tap to expand for cashier scanning
   - Black bars on white background for optimal scanning
   - Clear labeling

5. **Quick Actions**
   - 4-button grid layout
   - Buy Load
   - Pay Bills
   - Wallet
   - Scan QR
   - Large tap targets (80px+)

6. **Rewards Summary Card**
   - Points balance
   - Rewards value
   - Visual stats presentation
   - One-tap navigation to rewards

7. **Recent Activity Card**
   - Latest 3 transactions
   - Color-coded icons
   - Clear transaction details
   - "See all" link

8. **Promotions Card**
   - Special offers
   - Exclusive deals
   - Icon-based presentation
   - Limited, focused content

### Color Coding
- **Sent transactions:** Red background (`#FEE2E2`)
- **Received transactions:** Green background (`#D1FAE5`)
- **Utility payments:** Blue background (`#E0E7FF`)

## Bottom Navigation

### 5-Tab Layout
1. **Home** - Dashboard and overview
2. **Pay** - Bills and payments
3. **Wallet** - Balance and transactions
4. **Rewards** - Points and offers
5. **Profile** - User settings

**Design Features:**
- Always visible and persistent
- Active state with color highlight
- Icon + label for clarity
- Smooth transitions
- 72px height for comfortable tapping

## Icons Added

New icons for modern UI:
- `x` - Close/dismiss
- `credit-card` - Payment methods
- `zap` - Fast/bonus actions
- `tag` - Offers/discounts
- `trending-up` - Growth indicators
- `dollar` - Financial services
- `repeat` - Repeat transactions
- `percent` - Percentage discounts

## Color Palette

### Brand Colors (Use Sparingly)
- **Primary Orange:** `#FF6B00` - Call-to-action buttons only
- **Primary Light:** `#FFE8D6` - Subtle highlights
- **Secondary Green:** `#00A651` - Success states

### Neutral Palette (Primary Use)
- **Background:** `#F5F7FA` - Page background
- **Surface:** `#FFFFFF` - Card backgrounds
- **Surface Secondary:** `#F9FAFB` - Nested surfaces
- **Divider:** `#E5E7EB` - Borders and separators

### Text Hierarchy
- **Primary:** `#111827` - Headings and important text
- **Secondary:** `#6B7280` - Body text
- **Tertiary:** `#9CA3AF` - Hints and meta info

### Semantic Colors
- **Success:** `#10B981` - Positive actions
- **Error:** `#EF4444` - Errors and warnings
- **Warning:** `#F59E0B` - Caution states

## Spacing System

Consistent spacing scale:
- **xs:** 4px - Compact spacing
- **sm:** 8px - Tight spacing
- **md:** 12px - Default spacing
- **lg:** 16px - Comfortable spacing
- **xl:** 20px - Generous spacing
- **2xl:** 24px - Section spacing
- **3xl:** 32px - Large sections
- **4xl:** 40px - Major separations

## Border Radius

Rounded corners for modern feel:
- **sm:** 8px - Small elements
- **md:** 12px - Standard cards
- **lg:** 16px - Large cards
- **xl:** 20px - Modal/overlay
- **full:** 9999px - Circular elements

## Shadows

Subtle depth hierarchy:
- **xs:** Minimal elevation
- **sm:** Cards
- **md:** Elevated cards
- **lg:** Modals and overlays

## Responsive Design

### Breakpoints
- Mobile-first approach
- Optimized for 320px - 428px width
- Max container width: 600px
- Grid adjustments for small screens (<360px)

### Touch Targets
- Minimum 48px × 48px for all interactive elements
- Generous padding around tap areas
- Clear visual feedback on interaction

## Animations & Transitions

### Principles
- Smooth, natural motion (0.2s - 0.3s)
- Transform-based animations for performance
- Scale feedback on button press (0.95 - 0.98)
- Subtle hover effects (-2px translateY)
- Modal entrance/exit animations

### Key Transitions
- Fade for page navigation
- Scale + fade for modals
- Hover lift for cards
- Active press for buttons

## Accessibility Features

1. **High Contrast**
   - WCAG AA compliant text
   - Clear icon differentiation
   - Readable font sizes (13px+)

2. **Touch-Friendly**
   - Large tap targets
   - Generous spacing
   - Clear active states

3. **Clear Hierarchy**
   - Semantic HTML structure
   - Logical navigation flow
   - Descriptive labels

## Usage Guidelines

### Do's ✅
- Use cards for grouping related content
- Maintain generous spacing between elements
- Use brand colors sparingly for CTAs
- Keep text concise and scannable
- Implement smooth transitions
- Test on mobile devices

### Don'ts ❌
- Overuse bright colors
- Crowd too much information
- Use technical jargon
- Create too many CTAs per screen
- Ignore spacing system
- Use small tap targets

## File Structure

```
src/
├── components/
│   ├── BarcodeCard.vue      # Expandable barcode scanner
│   ├── BottomNav.vue         # 5-tab navigation
│   ├── Icons.vue             # SVG icon library
│   ├── InfoCard.vue          # Reusable card component
│   ├── QuickAction.vue       # Action button component
│   └── TopBar.vue            # App header
├── views/
│   ├── HomeView.vue          # Main dashboard (redesigned)
│   ├── PayBillsView.vue      # Bills payment
│   ├── WalletView.vue        # Wallet & transactions
│   ├── RewardsView.vue       # Rewards catalog
│   └── ProfileView.vue       # User profile
└── styles/
    └── global.scss           # Global styles & variables
```

## Performance Considerations

1. **Optimized SVG Icons** - Inline SVG for fast rendering
2. **CSS Transitions** - Hardware-accelerated transforms
3. **Component Lazy Loading** - Code splitting for faster initial load
4. **Optimized Images** - Use data URIs for patterns
5. **Minimal Dependencies** - Pure Vue 3 composables

## Future Enhancements

### Potential Additions
- [ ] Dark mode support
- [ ] Pull-to-refresh
- [ ] Skeleton loading states
- [ ] QR code generator integration
- [ ] Real-time balance updates
- [ ] Biometric authentication UI
- [ ] Animated onboarding screens
- [ ] Receipt viewer component
- [ ] Location-based store finder

## Testing Checklist

- [ ] Test on iPhone SE (320px width)
- [ ] Test on iPhone 13/14 (390px width)
- [ ] Test on larger devices (428px+ width)
- [ ] Verify all tap targets are 48px+
- [ ] Check color contrast ratios
- [ ] Test barcode expansion/collapse
- [ ] Verify smooth transitions
- [ ] Test navigation flow
- [ ] Check loading states
- [ ] Verify error handling

## Support & Documentation

For questions or issues with the redesign:
1. Review this guide
2. Check component prop documentation
3. Inspect global styles in `global.scss`
4. Review Vue/TypeScript types

## Credits

**Design Inspiration:** GoTyme Bank  
**Brand:** 7-Eleven Philippines  
**Framework:** Vue 3 + TypeScript + Vite  
**Styling:** SCSS with CSS custom properties  

---

**Version:** 1.0  
**Last Updated:** February 18, 2026
