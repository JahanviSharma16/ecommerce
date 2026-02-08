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


## 🤝 Contributing

This project serves as a demonstration of MERN stack capabilities and e-commerce best practices. Feel free to extend functionality or adapt for specific use cases.

## 📝 License

This project is for educational and demonstration purposes.
