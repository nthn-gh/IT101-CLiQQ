# 7-Eleven CLiQQ Rewards Mobile App

A modern, card-based rewards and mobile wallet app inspired by GoTyme Bank's clean design principles.

![CLiQQ Rewards](https://via.placeholder.com/800x400/FF6B00/FFFFFF?text=CLiQQ+Rewards+App)

## ✨ Features

### 🏠 Home Dashboard
- **Prominent Balance Display** with gradient card design
- **Expandable Member Barcode** - Tap to enlarge for cashier scanning
- **Quick Actions** - Buy Load, Pay Bills, Wallet, Scan QR
- **Rewards Summary** - View points and rewards value
- **Recent Activity** - Latest transactions at a glance
- **Special Offers** - Exclusive deals for members

### 💳 Member Barcode (Featured)
- Compact preview on home screen
- **Full-screen expandable view** for easy scanning
- High-contrast black-on-white design
- Clear instructions for cashier
- Swipe down or tap to dismiss

### 🎯 Modern UI/UX
- Clean, card-based layout
- Large tap targets (48px+)
- Smooth animations and transitions
- Mobile-optimized design
- GoTyme Bank-inspired aesthetic

### 🧭 5-Tab Navigation
- Home - Dashboard overview
- Pay - Bills and payments
- Wallet - Balance and transactions
- Rewards - Points and catalog
- Profile - User settings

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
cliqq-vue/
├── src/
│   ├── components/
│   │   ├── BarcodeCard.vue      # Expandable barcode component
│   │   ├── BottomNav.vue         # Bottom navigation bar
│   │   ├── Icons.vue             # SVG icon library
│   │   ├── InfoCard.vue          # Reusable card component
│   │   ├── QuickAction.vue       # Quick action buttons
│   │   └── TopBar.vue            # Top app bar
│   ├── views/
│   │   ├── HomeView.vue          # Main dashboard
│   │   ├── PayBillsView.vue      # Bills payment
│   │   ├── WalletView.vue        # Wallet & transactions
│   │   ├── RewardsView.vue       # Rewards catalog
│   │   └── ProfileView.vue       # User profile
│   ├── router/
│   │   └── index.ts              # Vue Router config
│   ├── styles/
│   │   └── global.scss           # Global styles
│   ├── App.vue                   # Root component
│   └── main.ts                   # App entry point
├── REDESIGN_GUIDE.md             # Detailed design documentation
└── package.json
```

## 🎨 Design System

### Color Palette
- **Primary Orange:** `#FF6B00` - CTAs only
- **Primary Green:** `#00A651` - Success states
- **Background:** `#F5F7FA` - Page background
- **Surface:** `#FFFFFF` - Card backgrounds

### Spacing Scale
- xs: 4px | sm: 8px | md: 12px | lg: 16px
- xl: 20px | 2xl: 24px | 3xl: 32px | 4xl: 40px

### Border Radius
- sm: 8px | md: 12px | lg: 16px | xl: 20px | full: 9999px

## 📱 Key Components

### BarcodeCard
```vue
<BarcodeCard 
  barcode-number="76543210123456"
  member-name="Juan dela Cruz"
/>
```

### InfoCard
```vue
<InfoCard
  title="Card Title"
  subtitle="Card subtitle"
  clickable
  @click="handleClick"
>
  <div>Card content</div>
</InfoCard>
```

### QuickAction
```vue
<QuickAction 
  icon="phone" 
  label="Buy Load"
  variant="primary"
  @click="handleAction"
/>
```

## 🎯 Design Goals Achieved

✅ Clean, modern, card-based UI  
✅ Strong visual hierarchy  
✅ Minimal color usage (brand colors for CTAs only)  
✅ Large tap targets (48px+)  
✅ Prominent barcode display  
✅ One-tap access to core actions  
✅ Fast, intuitive navigation  
✅ Mobile-optimized experience  

## 📖 Documentation

See [REDESIGN_GUIDE.md](./REDESIGN_GUIDE.md) for comprehensive design documentation including:
- Complete component API
- Design principles
- Color palette
- Spacing system
- Best practices
- Future enhancements

## 🛠 Tech Stack

- **Framework:** Vue 3 (Composition API)
- **Language:** TypeScript
- **Styling:** SCSS with CSS Custom Properties
- **Build Tool:** Vite
- **Router:** Vue Router 4
- **Icons:** Custom SVG components

## 🌟 Highlights

### Expandable Barcode Feature
The star feature of this redesign - tap the barcode card on the home screen to expand it full-screen for easy cashier scanning. High-contrast design ensures reliable scanning every time.

### GoTyme-Inspired Design
Following GoTyme Bank's design philosophy:
- Big numbers first (balance prominently displayed)
- Generous white space
- Card-based information architecture
- Minimal use of brand colors
- Clear visual hierarchy

### Premium Feel
- Smooth animations (0.2s-0.3s)
- Subtle shadows for depth
- Gradient backgrounds
- Glassmorphism effects
- Professional typography

## 📱 Responsive Design

Optimized for:
- iPhone SE (320px)
- Standard phones (360px-428px)
- Max container width: 600px
- Touch-friendly interactions

## 🤝 Contributing

This is a demonstration project showcasing modern mobile app UI/UX design principles.

## 📄 License

This project is for demonstration purposes.

## 🎨 Design Credits

**Inspired by:** GoTyme Bank  
**Brand:** 7-Eleven Philippines  
**Design Date:** February 2026

---

Made with ❤️ and Vue 3
