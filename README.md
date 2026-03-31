🛒 Amazon Clone – Full Stack E-Commerce Platform

A full-stack e-commerce web application inspired by Amazon, built as part of an SDE Intern assignment. This project replicates core functionalities of an online shopping platform including product browsing, cart management, and order placement.

🚀 Features

✅ Core Features

Product Listing Page

  * Grid layout similar to Amazon
  * Product cards with image, name, and price
  * Search functionality
  * Category-based filtering

Product Detail Page

  * Image carousel
  * Product description & specifications
  * Price and stock availability
  * Add to Cart & Buy Now options

Shopping Cart

  * View added items
  * Update quantity
  * Remove items
  * Cart summary (subtotal & total)

Order Placement

  * Checkout with shipping details
  * Order summary before confirmation
  * Order confirmation with Order ID

⭐ Bonus Features 

* Responsive design (mobile, tablet, desktop)
* User authentication (Login/Signup)
* Order history
* Wishlist
* Email notifications

🏗️ Tech Stack

Frontend
* React.js / Next.js
* HTML, CSS, JavaScript

Backend
* Node.js with Express.js 

Database
* PostgreSQL 

📂 Project Structure

/frontend      → React/Next.js application
/backend       → API server (Node.js / Python)
/database      → Schema & seed data

⚙️ Installation & Setup

1. Clone the Repository

```bash
git clone https://github.com/your-username/amazon-clone.git
cd amazon-clone
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file and add:

```
PORT=5000
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

Run backend:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm start
```

### 4. Database Setup

* Create database (PostgreSQL/MySQL)
* Run schema scripts
* Seed sample product data

## 🧠 Assumptions

* A default user is assumed to be logged in (no authentication required)
* Sample product data is pre-seeded
* Focus is on functionality and UI rather than production-level security

## 📊 Evaluation Focus

* Functionality of core features
* UI/UX similarity to Amazon
* Clean and modular code
* Database design and relationships
* Ability to explain implementation

## 🤖 AI Tools Usage

AI tools like ChatGPT, Claude, and GitHub Copilot were used to assist development. All code written is fully understood and can be explained.

## 📸 Screenshots 

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/41c16393-a431-4d50-b85b-4dcd3723e407" />

## 📌 Future Improvements

* Payment gateway integration
* Advanced search & filters
* Recommendation system
* Real-time order tracking

## 🙌 Acknowledgements

* Inspired by Amazon UI/UX
* Built as part of Scaler SDE Internship Assignment
