# Mini E-commerce Module (MERN Stack)

A fully functional e-commerce application built with MERN stack (MongoDB, Express.js, React.js, Node.js) that demonstrates core e-commerce functionality including user authentication, product management, cart operations, and order processing with payment simulation.

## 🌐 Live Deployment

- **Live Demo (Frontend – Vercel):**  
  https://ecommerce-self-zeta.vercel.app/

- **Backend API (Render):**  
  https://ecommerce-1uns.onrender.com/


## 🚀 Features

### User Management
- **Guest Users**: Browse products, add to cart, like products
- **Registered Users**: Full access to all features including order placement and order history
- **Admin Users**: View all users and orders, manage system

### Core Functionality
- **Product Management**: Browse home appliances with real-time stock information
- **Shopping Cart**: Add/remove items, update quantities, guest cart support
- **Wishlist/Likes**: Like/unlike products with persistent storage
- **Order Processing**: Complete checkout flow with payment simulation
- **Payment Simulation**: Realistic payment success/failure scenarios

### Business Logic Features
- **Price Protection**: Backend-controlled pricing prevents manipulation
- **Stock Management**: Real-time stock updates with concurrency handling
- **Idempotency**: Safe handling of duplicate payment attempts
- **Guest Cart Merge**: Seamless transition from guest to authenticated user

## 🏗️ Architecture

### Backend (Node.js + Express + MongoDB)
```
backend/
├── src/
│   ├── controllers/     # Business logic handlers
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API endpoints
│   ├── middlewares/    # Authentication & authorization
│   ├── config/         # Database and environment setup
│   ├── app.js          # Express application setup
│   └── server.js       # Server entry point
```

### Frontend (React.js + Tailwind CSS)
```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Route-based page components
│   ├── context/       # React context for state management
│   ├── api/          # API service functions
│   ├── routes/       # Route configuration
```


## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd mini-ecommerce
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

3. **Frontend Setup** (In a new terminal)
```bash
cd frontend
npm install
touch .env
# Add VITE_API_URL=http://localhost:8000/api to .env
npm run dev
```

4. **Database Setup**
- Ensure MongoDB is running on your system
- The application will automatically create the database and collections

### Detailed Environment Setup

#### Backend Configuration
1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/mini-ecommerce
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
NODE_ENV=development
```

#### Frontend Configuration
1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
touch .env
```

4. Configure environment variables in `frontend/.env`:
```env
VITE_API_URL=http://localhost:8000/api
```

### Running the Application

#### Start Backend Server
```bash
cd backend
npm run dev
```
- Server will run on `http://localhost:8000`
- API endpoints available at `http://localhost:8000/api`
- Uses nodemon for auto-restart on file changes

#### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
- Application will run on `http://localhost:5173` (or similar Vite port)
- Hot reload enabled for development

### Production Build

#### Backend Production
```bash
cd backend
npm start
```

#### Frontend Production Build
```bash
cd frontend
npm run build
# Serve the dist folder with your preferred web server
```



## � Payment Flow & Business Logic

### Step-by-Step Payment Process

1. **Order Creation** (`POST /orders`)
   - Validates cart is not empty
   - Checks stock availability for each item
   - Calculates total using backend prices (prevents manipulation)
   - Creates order with items and locks current prices
   - Clears user's cart

2. **Payment Simulation** (`POST /orders/:id/pay`)
   - Accepts success/failure flag and payment ID
   - Validates order exists and isn't already paid
   - **Success**: Reduces product stock, marks order as PAID
   - **Failure**: Marks order as FAILED, no stock changes

### Payment Failure Handling

- **Failed Payments**: Order status set to "FAILED", stock remains unchanged
- **Duplicate Payments**: System checks if order already paid, returns early
- **Stock Issues**: If stock depleted during payment, order fails safely
- **Error Recovery**: All operations atomic - either complete fully or rollback

### Price Manipulation Prevention

- **Backend Price Control**: Prices fetched from database, not client input
- **Order Price Locking**: Prices locked at order creation time
- **No Client Trust**: All calculations performed server-side
- **Validation**: Stock and price validated at multiple checkpoints

### Stock Concurrency Management

- **Atomic Updates**: Uses MongoDB's `$inc` with stock condition checks
- **Race Condition Protection**: Stock check and decrement in single operation
- **Optimistic Locking**: Only updates if sufficient stock available
- **Rollback Safety**: Failed operations don't affect stock levels

### Guest Cart Merge Logic

**Current Implementation**: Guest cart stored in browser localStorage
**Merge Process** (when user logs in):
1. Retrieve guest cart from localStorage
2. Send guest cart items to backend merge endpoint
3. Backend combines with existing user cart
4. Clear localStorage guest cart
5. Return merged cart to frontend

**Note**: Implementation optional but architecture supports seamless merge

### Edge Cases Handled

- **Empty Cart**: Prevents order creation with validation
- **Insufficient Stock**: Checks availability at order creation and payment
- **Concurrent Orders**: Atomic stock updates prevent overselling
- **Payment Timeouts**: Orders can be retried if payment fails
- **Product Price Changes**: Prices locked at order creation
- **Cart Abandonment**: Guest carts persist in localStorage
- **Network Failures**: Idempotent operations safe to retry
- **Database Errors**: Transaction-like behavior with rollback

## �🔄 Common Issues & Solutions

### Port Conflicts
- If port 8000 is in use, change PORT in backend/.env
- If frontend port is in use, Vite will automatically suggest alternative

### Database Connection Issues
- Ensure MongoDB is running: `mongod` (for local MongoDB)
- Check MONGO_URI in backend/.env matches your MongoDB setup
- For MongoDB Atlas, use the connection string provided

### CORS Issues
- Frontend API URL must match backend URL in VITE_API_URL
- Backend CORS is configured for localhost during development

### Environment Variables Not Loading
- Ensure .env files are in the correct directories
- Restart the server after changing environment variables
- Check that .env.example was copied to .env


## 🤝 Contributing

This project serves as a demonstration of MERN stack capabilities and e-commerce best practices. Feel free to extend functionality or adapt for specific use cases.

## 📝 License

This project is for educational and demonstration purposes.
