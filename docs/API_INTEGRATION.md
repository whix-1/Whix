# Whix VTU Platform - API Integration Guide

## Payment Gateway Integration

### Paystack
```bash
PAYSTACK_SECRET_KEY=pk_test_your_key
PAYSTACK_PUBLIC_KEY=pk_test_your_public_key
```

**Endpoints:**
- `POST /api/payment/paystack/initialize` - Initialize payment
- `POST /api/payment/paystack/verify` - Verify payment

### Flutterwave
```bash
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-your_key
FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-your_key
```

## VTU Provider Integration

The platform supports integration with VTU providers like:
- Baxi
- DartAPI
- Smile Telecoms
- Any other API-compatible VTU provider

**Configuration:**
```bash
VTU_PROVIDER_API_KEY=your_key
VTU_PROVIDER_BASE_URL=https://api.provider.com
```

## Services Available

### Airtime
- MTN, Airtel, Glo, 9mobile
- Real-time top-up

### Data Bundles
- All Nigerian networks
- Various plan sizes (100MB - 100GB)

### Electricity Bills
- EKEDC, IBEDC, KEDCO, AEDC, JEDC, PHEDC, UEDC, BEDC
- Real-time bill payment

### TV Subscriptions
- DStv, GOtv, Startimes
- Subscription renewals

### Exam E-PINs
- WAEC, NECO, JAMB
- Instant delivery

## Authentication

All API endpoints (except auth) require JWT token:
```
Authorization: Bearer <jwt_token>
```

## Error Handling

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error description"
}
```

## Rate Limiting

- Default: 100 requests per 15 minutes
- Configurable via `RATE_LIMIT_*` environment variables
