# CoServe — Local Service Cooperative Platform (SIH 2026)

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![SIH](https://img.shields.io/badge/Smart%20India%20Hackathon-2026-059669?style=flat)](https://sih.gov.in)

> **CoServe** is a decentralized, fair local service marketplace powered by a **cooperative economic model**. It replaces extractive 30% aggregator commissions with **85% direct worker take-home**, a **10% collective worker welfare fund**, and an **explainable 5-pillar matching engine**.

---

## 🌟 Core Pillars & Differenciators

### 1. Explainable Smart Matching Engine (0–100%)
Instead of a black-box algorithm, CoServe calculates transparent match scores for every recommendation:

$$\text{Match Score} = (\text{Skill Match} \times 0.40) + (\text{Availability} \times 0.20) + (\text{Distance} \times 0.20) + (\text{Rating} \times 0.10) + (\text{Trust Score} \times 0.10)$$

* **Skill Match (40%)**: Exact sub-skill certification fit.
* **Availability (20%)**: Live instant match mode & scheduled slot alignment.
* **Distance (20%)**: Proximity to customer's neighborhood.
* **Rating (10%)**: Verified customer review score.
* **Trust Score (10%)**: Closed-loop peer reputation & cooperative verification index.

### 2. Transparent Cooperative Split
Every booking is broken down with 100% transparency on the receipt, provider ledger, and governance vault:
* **85% to Worker**: Direct bank/UPI settlement with no hidden cuts.
* **10% to Collective Welfare Fund**: Pools money into emergency medical coverage, tool upgrade grants, and skill training subsidies.
* **5% to Platform Operations**: Open server hosting, SMS, and dispute ops.

### 3. Closed-Loop Trust Feedback
When a customer leaves a 5-star rating upon job completion, the provider's **Trust Score Index (0–100)** dynamically updates in real-time, boosting their rank in subsequent smart match queries.

---

## 📱 Role-Based Portals

1. **Customer Portal (`Priya Sharma`)**:
   - Multi-step smart service request wizard across 8 trades.
   - Ranked provider results with interactive **"Why Matched?"** breakdown drawers.
   - 5-step status pipeline (`REQUESTED → ACCEPTED → IN_PROGRESS → COMPLETED → RATED`).
   - Rating modal with compliment endorsements and cooperative split receipt.

2. **Provider Portal (`Rajesh Kumar - Master Electrician`)**:
   - Low-literacy friendly layout with visual icons and minimal typing.
   - Incoming job alerts with 1-click **Accept / Decline**.
   - Active job manager (**Start Work → Complete Work**).
   - Instant online matching toggle & weekly availability calendar.
   - Earnings ledger tracking personal income and community fund contributions.

3. **Admin & Cooperative Governance Board (`CoServe Council`)**:
   - Platform GMV and worker equity metrics.
   - KYC Verification Desk (reviewing Aadhaar & NSDC skill certificates).
   - Community Welfare Vault (disbursing equipment grants and emergency medical aid).

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **State & Architecture**: Reactive state management with local persistence and Firestore adapter readiness.
- **Demo Switcher**: Top sticky banner for instantaneous 1-click role jumping between Customer, Provider, and Admin for live presentations.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/mitunsri1-maker/sih-2026-cooperative-gig-platform-services.git

# Navigate to project directory
cd sih-2026-cooperative-gig-platform-services

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will start at `http://localhost:5173`.

---

## 🏆 Smart India Hackathon (SIH 2026) Demo Path

1. **Customer**: Request *Ceiling Fan Repair* → View *Why Matched?* breakdown → Click *Book Service*.
2. **Provider**: Switch role to *Provider* → *Accept Job* → *Start Work* → *Mark Completed*.
3. **Customer**: Switch back to *Customer* → Go to *My Bookings* → Leave *5-Star Review* with confetti.
4. **Admin**: Switch to *Admin* → Check the increased *Community Fund Vault* and verify pending KYC applicants.
