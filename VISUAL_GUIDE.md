# 🎨 Visual Design Guide - CLiQQ Rewards Redesign

## 🏠 Home Screen Visual Breakdown

```
┌─────────────────────────────────────────┐
│  🔔 7-ELEVEN CLiQQ             👤       │  ← Top Bar (60px)
├─────────────────────────────────────────┤
│                                         │
│  Good morning                           │  ← Welcome Header
│  Juan dela Cruz                         │
│                                         │
├─────────────────────────────────────────┤
│  ╔═══════════════════════════════════╗  │
│  ║  Total Balance               [🌟] ║  │  ← Balance Card
│  ║  ₱2,546.50                        ║  │  (Gradient orange)
│  ║  ⭐ 1,250 points • ₱125 value     ║  │
│  ╚═══════════════════════════════════╝  │
│                                         │
├─────────────────────────────────────────┤
│  ┌───────────────────────────────────┐  │
│  │ 🔲 Member Barcode                 │  │  ← Barcode Card
│  │ ▮▮ ▮ ▮▮▮ ▮▮ ▮ ▮▮▮ ▮▮ ▮ ▮▮▮ ▮▮   │  │  (Tap to expand)
│  │ 76543210123456                    │  │
│  │ Tap to expand ⤢                  │  │
│  └───────────────────────────────────┘  │
│                                         │
├─────────────────────────────────────────┤
│  Quick Actions                          │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐      │
│  │ 📱  │ │ 🧾  │ │ 💳  │ │ 🔍  │      │  ← Quick Actions
│  │Load │ │Bills│ │Wallet│ │Scan │      │  (4 buttons)
│  └─────┘ └─────┘ └─────┘ └─────┘      │
│                                         │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐   │
│  │ Your Rewards                     │   │
│  │ Earn more points with purchases  │   │  ← Rewards Card
│  │                                  │   │
│  │  1,250         ║        ₱125     │   │
│  │  Points        ║   Rewards Value  │   │
│  │                                  │   │
│  │  🎁 View available rewards →    │   │
│  └─────────────────────────────────┘   │
│                                         │
├─────────────────────────────────────────┤
│  Recent Activity              See all → │
│  ┌─────────────────────────────────┐   │
│  │ 🔴 Sent to Maria Santos         │   │
│  │    Today, 2:30 PM      -₱500.00 │   │  ← Transactions
│  ├─────────────────────────────────┤   │  (Recent 3)
│  │ 🟢 Cash In via 7-Eleven         │   │
│  │    Yesterday           +₱1,000  │   │
│  ├─────────────────────────────────┤   │
│  │ 🔵 Meralco Payment              │   │
│  │    Feb 10, 2026       -₱2,450   │   │
│  └─────────────────────────────────┘   │
│                                         │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐   │
│  │ Special Offers                   │   │
│  │ Exclusive deals for members      │   │  ← Promotions
│  │                                  │   │
│  │ ⚡ 20% Off Load                  │   │
│  │    Valid until Feb 28            │   │
│  │                                  │   │
│  │ 💥 2x Points                     │   │
│  │    On bills payment              │   │
│  └─────────────────────────────────┘   │
│                                         │
│                                         │
├═════════════════════════════════════════┤
│  🏠    🧾    💳    🎁    👤            │  ← Bottom Nav
│ Home  Pay  Wallet Rewards Profile      │  (72px)
└─────────────────────────────────────────┘
```

## 🎫 Barcode Expanded State

```
┌─────────────────────────────────────────┐
│            [Backdrop Overlay]            │
│                                         │
│    ╔═════════════════════════════════╗  │
│    ║  Scan at 7-Eleven          [×]  ║  │
│    ║                                 ║  │
│    ║  Juan dela Cruz                 ║  │
│    ║  CLiQQ Rewards Member           ║  │
│    ║                                 ║  │
│    ║  ┌───────────────────────────┐  ║  │
│    ║  │                           │  ║  │
│    ║  │  ▮▮ ▮ ▮▮▮ ▮▮ ▮ ▮▮▮ ▮▮    │  ║  │  ← Large Barcode
│    ║  │  ▮▮▮ ▮▮ ▮ ▮▮▮ ▮▮ ▮ ▮▮▮   │  ║  │  (High contrast)
│    ║  │  ▮ ▮▮▮ ▮▮ ▮ ▮▮▮ ▮▮ ▮ ▮▮  │  ║  │
│    ║  │  ▮▮ ▮ ▮▮▮ ▮▮ ▮ ▮▮▮ ▮▮ ▮  │  ║  │
│    ║  │                           │  ║  │
│    ║  │    76543210123456         │  ║  │
│    ║  └───────────────────────────┘  ║  │
│    ║                                 ║  │
│    ║  ① Show barcode to cashier     ║  │
│    ║  ② Earn points on every purchase║ │
│    ║                                 ║  │
│    ║  [ Swipe down to close ]       ║  │
│    ╚═════════════════════════════════╝  │
│                                         │
└─────────────────────────────────────────┘
```

## 🎨 Color Usage Guide

### Primary Actions (Orange)
```css
Background: #FF6B00 (7-Eleven Orange)
Uses: Primary buttons, CTAs, active states
```
  
**Example:**
- "Redeem" buttons
- Primary action cards
- Bottom nav active state

### Success/Money In (Green)
```css
Background: #D1FAE5
Icon: #059669
```

**Example:**
- Cash in transactions
- Positive balance changes
- Success messages

### Money Out (Red)
```css
Background: #FEE2E2
Icon: #DC2626
```

**Example:**
- Send money transactions
- Bill payments
- Debit amounts

### Neutral/Info (Blue)
```css
Background: #E0E7FF
Icon: #4F46E5
```

**Example:**
- Bill payments
- Information cards
- Secondary actions

### Surface (White/Gray)
```css
Background: #FFFFFF (cards)
Background: #F5F7FA (page)
Border: #E5E7EB
```

**Example:**
- All card backgrounds
- Page background
- Dividers

## 📐 Spacing Examples

```
┌─────────────────────┐
│ ← 16px (lg) →       │  Card padding
│                     │
│  [Icon] ← 12px →    │  Icon to text spacing
│  [Text]             │
│                     │
│  ↑                  │
│  24px (2xl)         │  Between sections
│  ↓                  │
│                     │
│  [Next Section]     │
│                     │
└─────────────────────┘
```

## 🖱️ Interactive States

### Button Press
```
Normal:   [  Buy Load  ]
Hover:    [  Buy Load  ] ← Lift 2px, stronger shadow
Active:   [  Buy Load  ] ← Scale to 0.98
```

### Card Tap
```
Normal:   ┌─────────┐
          │ Card    │
          └─────────┘

Hover:    ┌─────────┐ ← Lift 2px
          │ Card    │
          └─────────┘

Active:   ┌─────────┐ ← Scale 0.98
          │ Card    │
          └─────────┘
```

## 🎯 Tap Target Sizes

```
Minimum:  48px × 48px  ✅
Ideal:    56px × 56px  ⭐
Large:    80px × 80px  🌟

Quick Actions:  ~110px × 110px ✨
Bottom Nav:     ~72px × 72px   ✅
```

## 📱 Screen Flow

```
        ┌─────────┐
        │  Home   │ ← You are here
        └────┬────┘
             │
    ┌────────┼────────┬────────┐
    │        │        │        │
┌───▽───┐ ┌──▽──┐ ┌──▽──┐ ┌───▽───┐
│  Pay  │ │Wallet│ │Rewards│ │Profile│
└───────┘ └──────┘ └──────┘ └───────┘
                   │
              ┌────▽────┐
              │ Barcode │ ← Expandable
              │  Modal  │
              └─────────┘
```

## 🎨 Design Tokens Quick Reference

### Colors
```scss
--color-primary: #FF6B00         // Orange (use sparingly!)
--color-secondary: #00A651        // Green
--color-background: #F5F7FA       // Page BG
--color-surface: #FFFFFF          // Cards
--color-text-primary: #111827     // Headings
--color-text-secondary: #6B7280   // Body text
```

### Spacing
```scss
--spacing-sm: 8px     --spacing-lg: 16px    --spacing-2xl: 24px
--spacing-md: 12px    --spacing-xl: 20px    --spacing-3xl: 32px
```

### Radius
```scss
--radius-sm: 8px      --radius-lg: 16px     --radius-full: 9999px
--radius-md: 12px     --radius-xl: 20px
```

### Shadows
```scss
--shadow-xs: 0 1px 2px rgba(0,0,0,0.04)   // Minimal
--shadow-sm: 0 2px 8px rgba(0,0,0,0.06)   // Cards
--shadow-md: 0 4px 12px rgba(0,0,0,0.08)  // Elevated
--shadow-lg: 0 8px 24px rgba(0,0,0,0.10)  // Modals
```

## 🔤 Typography Scale

```
Hero:     48px / 700  ← Balance amount
H1:       28px / 700  ← User name
H2:       20px / 700  ← Section titles
H3:       18px / 700  ← Card titles
H4:       15px / 600  ← Transaction names
Body:     14px / 500  ← Default text
Small:    13px / 500  ← Meta info
Tiny:     11px / 500  ← Labels
```

## 🎬 Animation Timing

```
Fast:     0.1s  ← Instant feedback
Normal:   0.2s  ← Default transitions
Smooth:   0.3s  ← Modal enter/exit
Slow:     0.5s  ← Special effects
```

## 📊 Information Hierarchy

```
Level 1: Balance Amount        (48px, Bold, Gradient)
Level 2: Section Titles        (18-20px, Bold)
Level 3: Card Titles           (15-16px, Semibold)
Level 4: Body Text             (14px, Regular)
Level 5: Meta/Secondary        (13px, Regular, Gray)
Level 6: Labels/Hints          (11px, Regular, Light Gray)
```

## 🧭 Navigation Structure

```
Bottom Nav (Always Visible)
├── Home         [🏠]  Active by default
├── Pay          [🧾]  Bills & payments
├── Wallet       [💳]  Balance & history
├── Rewards      [🎁]  Points & catalog
└── Profile      [👤]  Settings & info

Barcode Access:
Home → Tap Barcode Card → Full Screen Modal
```

## ✨ Key Visual Elements

### 1. Gradient Balance Card
- Start: `#FF6B00` (Orange)
- End: `#E55F00` (Darker Orange)
- Pattern overlay (subtle white)
- Large text (48px)
- Badge with glassmorphism

### 2. Card Shadows
- Resting: `var(--shadow-sm)`
- Hover: `var(--shadow-md)` + lift 2px
- Active: Scale 0.98

### 3. Icon Backgrounds
- Size: 48px × 48px
- Radius: 12px
- Colored backgrounds with matching icons

### 4. Bottom Nav Active State  
- Icon background: `#FFE8D6` (Light orange)
- Icon color: `#FF6B00` (Orange)
- Label weight: 600

## 🎯 Best Practices

### ✅ Do's
- Use cards for grouping content
- Maintain 16px+ padding
- Use orange for CTAs only
- Keep text scannable
- Implement smooth transitions
- Large tap targets (48px+)

### ❌ Don'ts
- Overuse bright colors
- Crowd information
- Use technical terms
- Create small tap targets
- Ignore spacing system
- Use inconsistent styles

---

**Quick Start:**
```bash
npm install
npm run dev
```

**Documentation:**
- [README.md](./README.md) - Quick start
- [REDESIGN_GUIDE.md](./REDESIGN_GUIDE.md) - Complete docs
- [REDESIGN_SUMMARY.md](./REDESIGN_SUMMARY.md) - Changes log

**Component Files:**
- `BarcodeCard.vue` - Expandable barcode
- `InfoCard.vue` - Reusable cards
- `QuickAction.vue` - Action buttons
- `Icons.vue` - Icon library
- `BottomNav.vue` - Navigation
- `TopBar.vue` - Header

---

🎨 **Design System Ready!**
