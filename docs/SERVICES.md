# Whix VTU Platform - Service Implementation Guide

## Available Services

### 1. Airtime Services
**Networks:** MTN, Airtel, Glo, 9mobile

```bash
POST /api/services/airtime/buy
Content-Type: application/json
Authorization: Bearer <token>

{
  "network": "MTN",
  "amount": 500,
  "phone": "08012345678"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Airtime purchased successfully",
  "balance": 49500
}
```

### 2. Data Services
**Networks:** MTN, Airtel, Glo, 9mobile

```bash
POST /api/services/data/buy
Content-Type: application/json
Authorization: Bearer <token>

{
  "network": "MTN",
  "plan": "500MB",
  "phone": "08012345678"
}
```

**Available Plans:**
- MTN: 100MB, 500MB, 1GB, 2GB, 5GB, 10GB
- Airtel: 100MB, 500MB, 1GB, 2GB, 5GB, 10GB
- Glo: 100MB, 500MB, 1GB, 2GB, 5GB, 10GB
- 9mobile: 100MB, 500MB, 1GB, 2GB, 5GB, 10GB

### 3. Electricity Bill Payment
**DISCOs:** EKEDC, IBEDC, KEDCO, AEDC, JEDC, PHEDC, UEDC, BEDC

```bash
POST /api/services/bill/pay
Content-Type: application/json
Authorization: Bearer <token>

{
  "billType": "electricity",
  "disco": "EKEDC",
  "meterNumber": "01234567890",
  "amount": 5000,
  "meterType": "prepaid"
}
```

### 4. TV Subscription
**Providers:** DStv, GOtv, Startimes

```bash
POST /api/services/tv/subscribe
Content-Type: application/json
Authorization: Bearer <token>

{
  "provider": "DStv",
  "plan": "Premium",
  "smartCardNumber": "123456789",
  "amount": 9500
}
```

### 5. Exam E-PINs
**Exams:** WAEC, NECO, JAMB

```bash
POST /api/services/exam/pin
Content-Type: application/json
Authorization: Bearer <token>

{
  "exam": "WAEC",
  "quantity": 1,
  "amount": 2500
}
```

**Response:**
```json
{
  "success": true,
  "message": "E-PIN generated successfully",
  "pin": "1234567890",
  "serialNumber": "ABC123456"
}
```

## Error Codes

| Code | Message | Solution |
|------|---------|----------|
| 400 | Insufficient balance | Fund wallet first |
| 401 | Unauthorized | Login required |
| 403 | Transaction flagged as suspicious | Contact support |
| 404 | Service not found | Check service type |
| 500 | Provider error | Retry or contact support |

## Rate Limits

- **Default:** 100 requests per 15 minutes
- **Authenticated:** 500 requests per 15 minutes
- **Admin:** 5000 requests per 15 minutes

## Webhook Events

Whix VTU sends webhooks for important events:

### Payment Verified
```json
{
  "event": "payment.verified",
  "userId": "user-id",
  "amount": 50000,
  "reference": "paystack_ref_123",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Transaction Completed
```json
{
  "event": "transaction.completed",
  "transactionId": "txn-id",
  "userId": "user-id",
  "type": "airtime",
  "status": "success",
  "timestamp": "2024-01-15T10:35:00Z"
}
```

### Fraud Alert
```json
{
  "event": "fraud.detected",
  "userId": "user-id",
  "riskScore": 0.85,
  "reason": "Velocity check failed",
  "timestamp": "2024-01-15T10:40:00Z"
}
```

## Best Practices

1. **Always validate input** - Use the provided validation middleware
2. **Handle errors gracefully** - Implement proper error handling
3. **Cache when possible** - Use Redis for frequently accessed data
4. **Monitor transactions** - Set up alerts for failed transactions
5. **Secure sensitive data** - Never log API keys or tokens
6. **Rate limit clients** - Prevent abuse with rate limiting
7. **Test thoroughly** - Use staging environment before production

## Testing Services Locally

```bash
# Start mock VTU provider
npm run start:mock-provider

# Run integration tests
npm run test:integration

# Load testing
npm run test:load
```
