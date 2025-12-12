# Medicine-E-commerce-Website

This project is a full-stack **Medicine E-Commerce Web Application** built using **Django (Backend API)** and **React.js (Frontend UI)**. It provides functionalities similar to modern online pharmacies, including user authentication, browsing medicines, cart management, order placement, and an admin dashboard for analytics.

The backend is powered by a Django REST API that manages users, products, orders, and authentication. The frontend delivers a responsive and user-friendly shopping experience with functionalities like product listing, cart actions, secure login, and viewing order history.

---

## 📌 Features

### 🔐 **Authentication**
- User registration & login using email  
- Custom user model supporting mobile & address fields  
- Secure login API with credential validation  
*(Backend: `register_user`, `login_user`)*
  
### 🛒 **E-Commerce Functionality**
- View all medicines/products  
- Add to cart, update quantity, remove items  
- Tax calculation, delivery charges, order summary  
*(Frontend: `Cart.jsx`)*
  
### 📦 **Order Management**
- Place orders through backend API  
- Save user order history  
- View detailed order summary with items, prices, date  
*(Backend: `place_order`, `order_list`; Frontend: `OrderHistory.jsx`)*

### 🛍️ **Product Browsing**
- Featured products  
- New arrivals  
- Shop by category  
*(Frontend: `Home.jsx`)*

### 🛠️ **Admin Dashboard**
Admin-only dashboard for:
- Revenue analytics  
- Total orders, product stock, low stock alerts  
- Product management (view/edit/delete)  
- Order analytics (top selling products, etc.)  
*(Frontend: `AdminDashboard.jsx`)*

### 🔗 **Backend API Features**
- Register new users  
- Login user  
- List all products  
- Place orders  
- Fetch user-specific order history  
*(Backend: `views.py`)*

---



### **Backend (Django)**
