# Trading Signal Tracker

## Overview

Trading Signal Tracker is a full-stack application for creating and tracking trading signals using live Binance market data.

Features:

- Create BUY and SELL signals
- Live Binance price integration
- Automatic status updates
- ROI calculation
- Signal expiry handling
- Auto-refresh dashboard

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Frontend

- React
- Vite
- Tailwind CSS

---

## Setup

### Backend

```bash
cd server
npm install
```

Create `.env`

```env
PORT=8000

MONGODB_URI=YOUR_MONGODB_URI

CLIENT_URL=http://localhost:5173
```

Run:

```bash
npm run dev
```

---

### Frontend

```bash
cd client
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:8000/api/signals
```

Run:

```bash
npm run dev
```

---

## API Endpoints

```http
POST /api/signals
GET /api/signals
GET /api/signals/:id
DELETE /api/signals/:id
```

---

## Business Logic

### BUY

- Stop Loss < Entry Price
- Target Price > Entry Price

### SELL

- Stop Loss > Entry Price
- Target Price < Entry Price

### Status Rules

- TARGET_HIT
- STOPLOSS_HIT
- EXPIRED

Once a signal reaches any final status, it cannot change again.

### ROI

BUY:

```text
((Current Price - Entry Price) / Entry Price) * 100
```

SELL:

```text
((Entry Price - Current Price) / Entry Price) * 100
```

---

## Live Price Source

Binance Public API:

```text
https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT
```
