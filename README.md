# **SnapShop — Premium E-Commerce Experience**

[![Angular](https://img.shields.io/badge/Angular-20.0%2B-DD0031?style=for-the-badge&logo=angular)](https://angular.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**SnapShop** is a sophisticated, high-performance e-commerce platform designed for "Thoughtful Living." Built with a cutting-edge technical stack including **Angular 20 (Next)** and **Tailwind CSS 4.0**, it delivers a "Vibrant Luxury" aesthetic through glassmorphism, fluid animations, and a meticulous design system.

---

## 🔗 Live Demo
Explore the production environment:  
[**https://angular-e-commerce-iota.vercel.app/**](https://angular-e-commerce-iota.vercel.app/auth/login)

---

## ✨ Features

### 🔐 Advanced Authentication
*   **JWT Integration:** Secure session management with automated token injection.
*   **Guest Bypass:** Instant preview access via a dedicated guest login flow.
*   **Account Security:** Complete Forgot Password and Reset Code verification workflow.
*   **Protected Shells:** Specialized layouts for Guest (Auth) vs. Authenticated (Main) users.

### 🛍️ Immersive Shopping Experience
*   **Dynamic Product Catalog:** Real-time filtering, sorting, and high-performance pagination.
*   **Signal-Based State:** Ultra-reactive shopping cart and wishlist managed via **Angular Signals**.
*   **Brand & Category Browsing:** Dedicated discovery modules for curated navigation.
*   **Smart Cart:** Persistent basket synchronization with optimistic UI updates.

### 🎨 Design & UX (Vibrant Luxury)
*   **Tailwind 4.0 Core:** Utilizing the latest CSS engine for high-performance styling.
*   **Glassmorphism:** Elegant frosted-glass navigation and UI components.
*   **Micro-Animations:** Fluid transitions using `cubic-bezier` timing and CSS Keyframes.
*   **Fully Responsive:** Pixel-perfect experience across mobile, tablet, and ultra-wide desktops.

### ⚡ Technical Excellence
*   **Global Interceptors:** Centralized handling for Auth, Errors, and Loading states.
*   **LIFT Architecture:** Highly organized structure for scalability.
*   **Clean API Layer:** Repository pattern for seamless backend communication.

---

## 🛠️ Tech Stack

*   **Framework:** Angular 20+ (Standalone Architecture)
*   **Styling:** Tailwind CSS 4.0 & Flowbite
*   **State Management:** Angular Signals (Reactive State)
*   **Reactive Logic:** RxJS 7.8
*   **Animations:** CSS3 + Swiper.js (Touch-optimized sliders)
*   **Icons:** FontAwesome 7.2 Pro-ready
*   **Type Safety:** TypeScript 5.9+

---

## 🏗️ Architecture & Structure

The project follows a **Modular Clean Architecture** pattern, ensuring separation of concerns and high maintainability.

```text
src/app/
├── core/               # Singleton Services, Guards, Interceptors, Layouts
│   ├── guards/         # Auth & Guest route protection
│   ├── interceptors/   # Global HTTP middleware (Auth, Error, Loading)
│   ├── layout/         # Shell components (MainLayout, AuthLayout)
│   └── services/       # Global utilities & cross-cutting logic
├── features/           # Domain-driven feature modules
│   ├── auth/           # Login, Register, Account management
│   ├── products/       # Product list, details, and search
│   ├── cart/           # Signal-based store and checkout logic
│   └── brands/         # Brand-specific catalogs
├── shared/             # Reusable UI components, Pipes, and Directives
│   ├── components/     # Cards, Modals, Toasts, Loaders
│   └── pipes/          # Search filters and formatting
└── app.routes.ts       # 100% Lazy-loaded route configuration
```

---

## 🚀 Getting Started

### Prerequisites
*   Node.js v18.0 or higher
*   Angular CLI

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shahdsolliman/Angular-E-commerce.git
   cd Angular-E-commerce
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200/`.

---

## 🌐 API Integration

The frontend communicates with a standardized RESTful API.
*   **Base URL:** `https://ecommerce.routemisr.com/api/v1`
*   **Headers:** Automatically handled by `auth.interceptor.ts` using the `x-user-token`.
*   **Error Handling:** Centralized `error.interceptor.ts` provides toast notifications for failed requests.

---

## 📉 Performance & Optimization

*   **Lazy Loading:** Every feature module is code-split and loaded on demand to minimize the initial bundle size.
*   **Signals API:** Minimizes change detection cycles by precisely tracking state changes in the Cart and Wishlist.
*   **Optimistic UI:** Cart interactions reflect immediately while background synchronization occurs.
*   **Image Optimization:** Strategic use of aspect-ratio management and lazy-loading for product assets.

---

## 📸 Screenshots

> [!TIP]
> Add high-quality screenshots here to showcase the **SnapShop** aesthetic.
> *   **Home Page:** Hero section with glassmorphism header.
> *   **Product Grid:** Displaying the "Card-Premium" hover effects.
> *   **Mobile View:** Demonstrating the responsive bottom navigation or sidebar.

---

## 🔮 Future Roadmap

*   [ ] **Payment Gateway:** Integration with Stripe/Paypal for real-world transactions.
*   [ ] **Order Tracking:** Real-time status updates via WebSockets.
*   [ ] **PWA Support:** Offline browsing and push notifications.
*   [ ] **Admin Dashboard:** Comprehensive inventory and user management portal.

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Designed with ❤️ by [Shahd Solliman](https://github.com/shahdsolliman)**
