# PageTurner 📚 — eCommerce Bookstore

> **IBM Applied AI Specialist Capstone Project**
> Built with IBM Bob (Agentic IDE) · React · Tailwind CSS · Vite

---

## 🚀 Live Features

| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | Email/password authentication with validation |
| Home | `/home` | Hero, featured books, categories, newsletter |
| Catalogue | `/catalogue` | Filter by category, brand, price; search; order history + Buy Again |
| Product Detail | `/product/:id` | Ratings, delivery date, gift points, related books |
| Shopping Cart | `/cart` | Qty controls, savings summary, AI recommendations |
| Checkout | `/checkout` | 3-step: address → payment + gift points → review |
| Payment | `/payment` | Card / PayPal / Wallet with form validation |
| Confirmation | `/confirmation` | Order success, points earned, cancel within 48hrs |

---

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v6
- **Icons:** Lucide React
- **State:** React Context API (CartContext)
- **Agentic IDE:** IBM Bob

---

## ⚙️ Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**Demo login:** any valid email + password (6+ characters)

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky nav with cart badge & search
│   ├── Footer.jsx          # Links, categories, contact
│   └── BookCard.jsx        # Reusable book card component
├── context/
│   └── CartContext.jsx     # Global cart & user state
├── data/
│   └── mockData.js         # Books, categories, brands, orders
└── pages/
    ├── LoginPage.jsx
    ├── HomePage.jsx
    ├── CataloguePage.jsx
    ├── ProductDetailPage.jsx
    ├── CartPage.jsx
    ├── CheckoutPage.jsx
    ├── PaymentPage.jsx
    └── ConfirmationPage.jsx
```

---

## 🤖 How IBM Bob Was Used

1. **Project scaffold** — Vite + React + Tailwind config, folder structure, React Router setup
2. **Page generation** — Each page described in plain English; Bob generated component structure, layout, and logic
3. **Reusable components** — BookCard, Navbar, Footer generated and refined iteratively
4. **State management** — CartContext with add/remove/update/clear cart functions
5. **Form validation** — Login and payment forms with real-time error feedback
6. **Refinement** — UI polish, loading states, responsive layout adjustments

---

## 📋 Capstone Requirements Met

- ✅ Agentic IDE (IBM Bob) used throughout development
- ✅ Responsive frontend (desktop + mobile)
- ✅ All 8 customer journeys implemented
- ✅ Git workflow with feature branch + Pull Request
- ✅ React + Tailwind CSS as recommended stack
