# Whix VTU - Referral & Affiliate Program

## Overview

Earn commissions by referring friends or becoming a reseller.

## Referral Program

### How It Works

1. **Get Your Referral Code**
   - Every user gets a unique referral code
   - Share it with friends
   - Friends sign up using your code

2. **Earn Commissions**
   - **Direct Commission:** 1% on each transaction by referred users
   - **Minimum Transaction:** ₦100
   - **Payment Frequency:** Monthly

3. **Track Your Earnings**
   ```bash
   GET /api/referral/earnings
   Authorization: Bearer <token>
   ```

   Response:
   ```json
   {
     "success": true,
     "data": {
       "totalEarnings": 150000,
       "pendingCommissions": 50000,
       "referralCount": 25,
       "commissions": [
         {
           "id": "comm-1",
           "from": "friend@email.com",
           "amount": 500,
           "date": "2024-01-15",
           "status": "pending"
         }
       ]
     }
   }
   ```

### Withdrawal

```bash
POST /api/referral/withdraw
Content-Type: application/json
Authorization: Bearer <token>

{
  "amount": 50000,
  "bankCode": "044",
  "accountNumber": "0123456789",
  "accountName": "John Doe"
}
```

## Affiliate Program

### Requirements

- Minimum 50 transactions in 30 days
- Account age ≥ 30 days
- KYC Level 2 verification
- Referral count ≥ 10

### Benefits

| Tier | Requirement | Commission |
|------|-------------|------------|
| Bronze | 50 txn/month | 1.5% |
| Silver | 200 txn/month | 2% |
| Gold | 500 txn/month | 2.5% |
| Platinum | 1000+ txn/month | 3% |

### Apply for Affiliate

```bash
POST /api/affiliate/apply
Content-Type: application/json
Authorization: Bearer <token>

{
  "companyName": "My VTU Business",
  "businessType": "reseller",
  "cacNumber": "BN12345",
  "website": "https://example.com"
}
```

## Reseller Dashboard

### Features

- Discounted pricing on services
- Bulk purchase options
- Transaction monitoring
- Commission tracking
- Performance analytics

### Reseller Pricing

```bash
GET /api/reseller/pricing
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "pricing": {
    "airtime": {
      "MTN": {
        "buyPrice": 95,
        "sellPrice": 100,
        "margin": 5
      }
    },
    "data": {
      "MTN_1GB": {
        "buyPrice": 350,
        "sellPrice": 400,
        "margin": 50
      }
    }
  }
}
```

## Commission Payout Schedule

- **Payment Date:** 15th of each month
- **Minimum Payout:** ₦1,000
- **Processing Time:** 2-3 business days
- **Payment Method:** Direct bank transfer

## Frequently Asked Questions

**Q: When do I get my commission?**
A: Monthly on the 15th after your referral completes a transaction.

**Q: Can I withdraw before the 15th?**
A: Yes, for amounts ≥ ₦10,000, you can request early withdrawal (2% fee).

**Q: What if my referred friend makes a refund?**
A: The commission is reversed from your account.

**Q: Can I be both referrer and affiliate?**
A: Yes, you can combine both programs for maximum earnings.

**Q: How do I increase my tier?**
A: Meet the transaction requirements for the next tier.
