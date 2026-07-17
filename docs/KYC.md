# Whix VTU - User KYC Verification Guide

## Overview

KYC (Know Your Customer) verification ensures compliance and security. There are 3 levels.

## Verification Levels

### Level 1: Basic
**Requirement:** Email + Phone
**Limit:** ₦500,000/month
**Time:** Instant

```bash
POST /api/kyc/level1
Authorization: Bearer <token>

{
  "email": "user@email.com",
  "phone": "08012345678"
}
```

### Level 2: Intermediate
**Requirement:** BVN + ID
**Limit:** ₦5,000,000/month
**Time:** 5-10 minutes

```bash
POST /api/kyc/level2
Authorization: Bearer <token>

{
  "bvn": "12345678901",
  "nin": "12345678901234",
  "idType": "national_id",
  "idNumber": "123456789"
}
```

### Level 3: Advanced
**Requirement:** CAC + Bank Details
**Limit:** Unlimited
**Time:** 24-48 hours

```bash
POST /api/kyc/level3
Authorization: Bearer <token>

{
  "cacNumber": "BN1234567",
  "companyName": "My Company",
  "director": "John Doe",
  "bankCode": "044",
  "accountNumber": "0123456789",
  "accountName": "My Company"
}
```

## Verification Status

```bash
GET /api/kyc/status
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "kycLevel": "level2",
  "verified": true,
  "verifiedAt": "2024-01-15T10:30:00Z",
  "monthlyLimit": 5000000,
  "monthlyUsed": 1250000,
  "monthlyRemaining": 3750000
}
```

## Document Requirements

### National ID
- Format: JPEG, PNG
- Size: 100KB - 5MB
- Clear photo of both sides
- Date expiry > 6 months

### BVN (Bank Verification Number)
- 11 digits
- Matches with NIN

### CAC
- Certificate of Registration
- Recent (< 2 years)
- All names matching

## Rejection Reasons

| Reason | Solution |
|--------|----------|
| Document Expired | Provide current document |
| Name Mismatch | Ensure names are exact |
| Poor Image Quality | Take clearer photo |
| Incomplete Information | Fill all required fields |

## FAQ

**Q: How long does verification take?**
A: Level 1 is instant. Level 2 is 5-10 min. Level 3 is 24-48 hours.

**Q: Can I verify later?**
A: Yes, you can start with Level 1 and upgrade anytime.

**Q: Is my information secure?**
A: Yes, we use end-to-end encryption and never share your data.

**Q: What if I'm rejected?**
A: You'll receive details on why and can resubmit after fixing issues.
