# Whix VTU Platform

**Modern Fintech VTU Platform** - A premium, production-ready Virtual Top-Up (VTU) service platform inspired by PalmPay and Opay with unique branding.

## 🎨 Design Philosophy
- **Color Scheme**: Premium Blue (#003366), Clean White (#FFFFFF), Fresh Green (#00AA66)
- **Simplicity**: Minimalist UI with maximum functionality
- **Performance**: Sub-second load times with PWA support
- **Security**: Bank-grade encryption and fraud detection

## ✨ Features

### Core Services
- 📱 **Airtime**: MTN, Airtel, Glo, 9mobile
- 📊 **Data Bundles**: All Nigerian networks
- ⚡ **Electricity Bills**: EKEDC, IBEDC, KEDCO, AEDC, JEDC, PHEDC, UEDC, BEDC
- 📺 **TV Subscriptions**: DStv, GOtv, Startimes
- 🎓 **Exam E-PINs**: WAEC, NECO, JAMB
- 💳 **Wallet**: Secure balance management
- 🔄 **Fund Wallet**: Paystack & Flutterwave integration

### User Features
- 👤 User registration, login & KYC verification
- 💰 Wallet management with real-time balance
- 📜 Transaction history with downloadable receipts
- 🎁 Referral & affiliate program
- 🔔 Push notifications
- 🌓 Dark/Light mode
- 🤖 AI chatbot support
- 📲 QR code payments
- 🔐 2FA & biometric authentication

### Admin Features
- 📊 Analytics dashboard
- 👥 User management
- 💸 Commission tracking
- 📈 Performance reports
- 🚨 Fraud detection system

### Reseller Features
- 💰 Discounted pricing
- 📊 Sales dashboard
- 🎯 Performance tracking
- 💵 Commission management

## 🏗️ Project Structure

```
whix-vtu/
├── backend/                 # Node.js/Express backend
├── frontend/                # React/Next.js web app
├── mobile/                  # React Native mobile app
├── admin-dashboard/         # Admin panel
├── docs/                    # Documentation
└── docker-compose.yml       # Docker orchestration
```

## 🚀 Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js / NestJS
- **Database**: PostgreSQL
- **Cache**: Redis
- **Queue**: Bull/RabbitMQ
- **Auth**: JWT + 2FA
- **Payment**: Paystack, Flutterwave APIs
- **AI**: OpenAI API for chatbot

### Frontend
- **Framework**: Next.js 13+
- **UI**: React + Tailwind CSS
- **State**: Redux Toolkit
- **API**: Axios + SWR
- **Charts**: Recharts
- **Forms**: React Hook Form

### Mobile
- **Framework**: React Native + Expo
- **State**: Redux
- **Navigation**: React Navigation
- **Payments**: Paystack, Flutterwave SDKs

### DevOps
- **Container**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Deployment**: AWS / Vercel / Firebase
- **Monitoring**: Sentry, DataDog

## 📦 Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 13+
- Redis 6+
- Docker & Docker Compose

### Quick Start

```bash
# Clone repository
git clone https://github.com/whix-1/Whix.git
cd Whix

# Setup environment
cp .env.example .env

# Start with Docker
docker-compose up -d

# Or manual setup
cd backend && npm install
cd ../frontend && npm install
cd ../mobile && npm install

# Run migrations
cd backend
npm run migrate
npm run seed

# Start services
npm run dev
```

## 🔐 Security Features

- ✅ End-to-end encryption
- ✅ Rate limiting & DDoS protection
- ✅ SQL injection prevention
- ✅ CSRF protection
- ✅ XSS prevention
- ✅ Secure password hashing (bcrypt)
- ✅ JWT token rotation
- ✅ 2FA & biometric auth
- ✅ Fraud detection ML model
- ✅ PCI DSS compliance ready

## 📱 Platform Support

- ✅ Web (Desktop & Tablet)
- ✅ iOS (via React Native)
- ✅ Android (via React Native)
- ✅ PWA (Progressive Web App)

## 🌐 API Documentation

API documentation available at `/api/docs` (Swagger/OpenAPI)

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 License

MIT License - See [LICENSE](LICENSE)

## 📞 Support

- 📧 Email: support@whixvtu.com
- 💬 Chat: In-app AI chatbot
- 🐛 Issues: [GitHub Issues](https://github.com/whix-1/Whix/issues)

---

**Made with ❤️ by Whix Team**
