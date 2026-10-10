# Libas — Clothing E-Commerce Website

A modern clothing e-commerce website built with Next.js, MongoDB, Mongoose, Cloudinary, and Clerk. Libas allows customers to explore clothing collections, view product details, select sizes, add products to their cart, place orders, and track their orders. It also provides an admin panel for managing products and customer orders.

## Features

### Customer Experience
- Modern and responsive user interface
- Home page with a clothing-focused hero section
- Separate Female, Male, and Kids collections
- Product search functionality
- Product detail pages with images, prices, descriptions, and available sizes
- Shopping cart with quantity management, item removal, and total calculation
- Cart persistence using Local Storage
- Checkout form for customer information and delivery address
- Order placement and order ID generation
- Order tracking by order information
- Customer authentication using Clerk
- About and Contact pages

### Admin Panel
- Protected admin dashboard
- Add new clothing products
- Edit existing products
- Delete products
- Upload product images using Cloudinary
- Manage customer orders
- Update order statuses
- View customer and order details

### Backend and Database
- REST API routes using Next.js App Router
- MongoDB Atlas database integration
- Mongoose models for products and orders
- API-based product management
- Database-backed order creation and management

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Full-stack web application and routing |
| React | User interface |
| JavaScript (JSX) | Application logic |
| Tailwind CSS | Styling and responsive design |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |
| Cloudinary | Product image uploads and hosting |
| Clerk | Authentication and user management |
| React Icons | Interface icons |
| Git and GitHub | Version control and source code hosting |
| Vercel | Deployment platform |

## Project Structure

```text
libas/
├── scripts/             # Utility and seed scripts
├── src/
│   ├── app/
│   │   ├── about/
│   │   ├── admin/
│   │   │   ├── products/
│   │   │   └── orders/
│   │   ├── api/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── collections/
│   │   ├── contact/
│   │   ├── products/
│   │   ├── search/
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   └── track-order/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── libs/
│   └── models/
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

Before running the project, make sure you have:

- Node.js installed
- npm installed
- A MongoDB Atlas account and database
- A Cloudinary account
- A Clerk account for authentication

### 1. Clone the Repository

```bash
git clone https://github.com/uzairshahzadpak/libas.git
```

### 2. Navigate to the Project

```bash
cd libas
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root directory.

Add the environment variables required by your local project configuration, including your MongoDB connection string, Clerk keys, Cloudinary configuration, and admin email where applicable.

Example:

```env
MONGODB_URI=your_mongodb_connection_string

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset

ADMIN_EMAIL=your_admin_email
```

**Important:** Check the actual variable names used in your project before configuring them. If your image upload API requires additional Cloudinary credentials, configure those as well.

Never commit `.env.local` or expose secret keys, database credentials, or private API credentials on GitHub.

### 5. Run the Development Server

```bash
npm run dev
```

Open the following URL in your browser:

http://localhost:3000

## Database

Libas uses MongoDB Atlas with Mongoose to store and manage application data.

The main database collections include:

- **Products:** Product names, prices, categories, collections, sizes, images, and descriptions.
- **Orders:** Customer details, purchased items, totals, order information, and status.

Products can be managed through the Admin Panel rather than relying on hardcoded sample product data.

## Image Management

Cloudinary is used to upload and host product images. The admin product form sends images through the configured upload flow and stores the resulting image URL with the product data.

## Authentication and Admin Security

Clerk provides sign-in and sign-up functionality. The admin area includes access protection so that only the configured admin account can access administrative pages.

Configure the appropriate Clerk keys and admin settings before running the application in a new environment.

## Deployment

The project is intended to be deployed on Vercel.

Deployment steps:

1. Push the source code to GitHub.
2. Import the repository into Vercel.
3. Configure all required environment variables in Vercel Project Settings.
4. Ensure MongoDB Atlas permits connections from the deployed application.
5. Configure Cloudinary and Clerk for the production environment.
6. Deploy and test the customer and admin workflows.

**Live Demo:** Add the Vercel URL here after deployment succeeds.

## Future Improvements

- Product reviews and ratings
- Enhanced product filtering and sorting
- Inventory and stock management
- Improved order notifications
- Additional checkout and payment options
- Further UI and performance improvements

## Author

**Uzair Shahzad**

- GitHub: https://github.com/uzairshahzadpak
- Repository: https://github.com/uzairshahzadpak/libas

---

*Libas — Discover Your Style.*
