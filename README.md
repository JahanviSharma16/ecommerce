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
│   ├── hooks/        # Custom React hooks
│   ├── routes/       # Route configuration
│   └── services/     # Utility services
```

## 📋 Payment Flow

### Step-by-Step Process
1. **Order Creation**: User initiates checkout → Order created with PENDING status
2. **Price Validation**: Backend re-validates all product prices at order time
3. **Stock Check**: Backend verifies product availability
4. **Payment Processing**: Order created, cart cleared, user shown processing message
5. **Order Completion**: User can check order status in orders page

### Payment Failure Handling
- Failed payments maintain PENDING → FAILED status transition
- Stock is preserved for failed orders
- User can retry checkout with updated cart
- Clear error messaging for user feedback

### Price Manipulation Prevention
- All pricing calculations happen server-side
- Product prices fetched fresh at order creation
- Cart stores `priceAtAdd` to prevent frontend manipulation
- Backend validates prices before order confirmation

### Stock Concurrency Management
- Atomic stock updates using MongoDB's `$inc` operator
- Concurrent purchase protection with stock availability checks
- Failed payments don't affect stock levels
- Real-time stock reflection across all users

### Guest Cart Implementation
- Local storage for unauthenticated users
- Seamless merge on user registration/login
- Persistent likes for guests using localStorage

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

## 🧪 Testing the Application

### 1. User Registration/Login
1. Visit `http://localhost:5173/register`
2. Create a new account with email and password
3. Login with your credentials
4. Browse products as authenticated user

### 2. Guest User Experience
1. Visit `http://localhost:5173` (home page)
2. Browse products without logging in
3. Add items to cart (stored in localStorage)
4. Like products (persisted in localStorage)
5. Try checkout - will be prompted to login

### 3. Product Management
1. Browse home appliances on the home page
2. View product details, stock levels, and pricing
3. Like/unlike products (heart icon)
4. Add products to cart for purchase

### 4. Cart Operations
1. Add items to cart from product listing
2. Go to cart page to view items
3. Update quantities using +/- buttons
4. View real-time cart total
5. Remove items if needed

### 5. Order Processing
1. Click "Proceed to Checkout" from cart page
2. System creates order and clears cart
3. Shows "Payment processing" message
4. Redirects to orders page
5. Check order status in orders list

### 6. Admin Features
1. Create admin user manually in MongoDB or use existing admin
2. Login with admin credentials
3. Access admin routes if implemented
4. View all users and orders

## 🔄 Common Issues & Solutions

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

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/users` - Get all users (Admin only)

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (Admin only)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity

### Likes
- `GET /api/likes` - Get user's liked products
- `POST /api/likes/like` - Like product
- `POST /api/likes/unlike` - Unlike product

### Orders
- `POST /api/orders` - Create order
- `POST /api/orders/:orderId/pay` - Process payment
- `GET /api/orders/my` - Get user orders
- `GET /api/orders/all` - Get all orders (Admin only)

## 🎯 Key Business Rules

1. **Order Before Payment**: Orders must be created before payment processing
2. **Backend Price Control**: Product prices always validated server-side
3. **Stock on Success**: Stock reduction only after successful payment
4. **Idempotent Payments**: Duplicate payment success handled safely
5. **Concurrent Purchases**: Limited stock managed atomically
6. **Guest Limitations**: Guests cannot place orders without login

## 🚀 Deployment Considerations

### Production Environment Setup
1. Use environment-specific configuration
2. Enable HTTPS for secure API communication
3. Configure production database with proper indexing
4. Implement proper error logging and monitoring
5. Set up CORS for production domains

### Security Recommendations
1. Use strong JWT secrets in production
2. Implement rate limiting on API endpoints
3. Add input validation and sanitization
4. Enable MongoDB authentication
5. Regular security updates for dependencies

## 🤝 Contributing

This project serves as a demonstration of MERN stack capabilities and e-commerce best practices. Feel free to extend functionality or adapt for specific use cases.

## 📝 License

This project is for educational and demonstration purposes.
