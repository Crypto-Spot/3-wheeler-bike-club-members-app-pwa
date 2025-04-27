# 3WB Members App PWA

A Progressive Web App built with Next.js 14 for 3WB members to manage memberships, payments, and credit scoring both online and offline.

## 🚀 Core Features

- **PWA Ready**: Installable, offline caching, and seamless updates via service worker.  
- **Member Dashboard**: View membership badges, on-chain credit scores, and payment history.  
- **On-Chain & Off-Chain Payments**: Pay dues via Paystack or ERC20 stablecoins through Celo wallet integration.  
- **Badges & Receipts**: Fetch/render attestation badges and payment receipts from Celo schemas.  
- **Push Notifications**: Browser reminders for upcoming payments.  
- **Responsive & Accessible UI**: Built with Tailwind CSS and Radix UI.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)  
- **Language**: TypeScript, React 18  
- **PWA**: @ducanh2912/next-pwa  
- **UI**: Radix UI, Tailwind CSS  
- **State/Data**: React Query & Zod validation  
- **Auth/Payments**: Privy, CashRamp, Stripe  
- **Blockchain**: Sign Protocol Wagmi & Viem for Celo wallet  

## 📦 Getting Started

1. **Clone the repository**  
   ```bash
   git clone https://github.com/3-Wheeler-Bike-Club/3-wheeler-bike-club-members-app-pwa.git
   cd 3-wheeler-bike-club-members-app-pwa
   ```

2. **Install dependencies**  
   ```bash
   npm ci
   # or yarn
   ```

3. **Configure environment**  
   Create a `.env.local` file in root with:
   ```env
   NEXT_PUBLIC_PRIVY_APP_ID=...  
   NEXT_PUBLIC_PAYSTACK_KEY=...  
   PRIVY_APP_SECRET=...  
   PRIVATE_KEY=0x...  
   WHEELER_API_KEY=...  
   ATTEST_PRIVATE_KEY=0x...  
   BASE_NODE_API_KEY=...  
   BASE_URL=http://localhost:3000  
   ATTESTER=0x...  
   CASHRAMP_SECRET_KEY=...  
   NEXT_PUBLIC_MEMBER_BADGE_SCHEMA_ID=0x...  
   NEXT_PUBLIC_MEMBER_RECEIPT_SCHEMA_ID=0x...  
   NEXT_PUBLIC_MEMBER_CREDIT_SCORE_SCHEMA_ID=0x...  
   NEXT_PUBLIC_HIRE_PURCHASE_RECEIPT_SCHEMA_ID=0x...  
   NEXT_PUBLIC_HIRE_PURCHASE_CREDIT_SCORE_SCHEMA_ID=0x...
   ```

4. **Run in development**  
   ```bash
   npm run dev
   ```

5. **Build & Start**  
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```bash
/
├── app/                   # App Router (pages, API routes, manifest)
│   ├── api/               # Member & payment REST endpoints
│   ├── dashboard/         # Member dashboard pages
│   ├── manifest.json      # PWA manifest
│   └── layout.tsx         # Global layout & providers
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Helper functions (wallet, data fetch)
├── providers/             # React context providers
├── public/                # Static assets & PWA icons
├── utils/                 # Utilities & validators
├── environment.d.ts       # Env var typings
├── next.config.mjs        # Next.js + PWA plugin config
├── tailwind.config.ts     # Tailwind CSS config
└── package.json           # Project dependencies & scripts
```

## 🤝 Contributing

Fork the repo, create a branch, implement features/tests, and open a Pull Request with clear descriptions.

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE).  
```

