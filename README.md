# Contour ERP - Enterprise Resource Planning System

A comprehensive ERP prototype built with Next.js and TypeScript, featuring customer management, inventory tracking, work order management, and station operations.

## 🚀 Features

### Dashboard
- Overview of total customers, inventory items, work orders, and stations
- Real-time statistics and status indicators
- Recent work orders and low stock alerts
- Quick navigation to all modules

### Customer Management
- Complete customer database with business information
- Pagination and search functionality
- CRUD operations (Create, Read, Update, Delete)
- Customer details include business name, address, contact information, and invoice history

### Inventory Management
- Comprehensive inventory tracking with detailed metadata
- Low stock alerts and quantity management
- Sortable columns and search functionality
- Quantity adjustment with reason tracking and confirmation dialogs
- Part information includes ID, description, pricing, and supplier details

### Work Order Management
- Complete work order lifecycle management
- Print functionality for work order details
- Status tracking and stage management
- Integration with customer and inventory data
- Work order templates and routing

### Work Order Details
- Detailed view of individual work orders
- Editable fields with status-based visibility
- Parts usage tracking
- Station routing and operations tracking
- Comments and financial information

### Station Management
- Manufacturing station configuration
- Consumable materials tracking
- Station-based operations management

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 15.5.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Deployment**: GitHub Pages (Static Export)

## 📊 Sample Data

The application comes pre-populated with:
- 120+ fake customers with realistic business data
- 150+ inventory items across various categories
- 130+ work orders in different stages
- 10 manufacturing stations with consumables

## 🏗️ Project Structure

```
src/
├── app/                  # Next.js app router pages
│   ├── customers/        # Customer management
│   ├── inventory/        # Inventory management
│   ├── work-orders/      # Work order management
│   └── stations/         # Station management
├── components/           # Reusable UI components
├── data/                 # Mock data generation
├── types/                # TypeScript type definitions
└── lib/                  # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/contour-erp.git
cd contour-erp
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

This creates an optimized static export in the `out/` directory suitable for GitHub Pages deployment.

## 📋 Features Overview

### Customer View
- ✅ Editable customer list with pagination
- ✅ Customer metadata (business name, address, contact, etc.)
- ✅ Delete functionality with confirmation
- ✅ Add new customers manually
- ✅ Search and filter capabilities

### Inventory View
- ✅ Editable inventory list with sorting
- ✅ Quantity management with reason tracking
- ✅ Low stock alerts and status indicators
- ✅ Comprehensive part information
- ✅ Supplier and pricing data

### Work Order Management
- ✅ Work order listing with filtering
- ✅ Print functionality for detailed work orders
- ✅ Status and stage tracking
- ✅ Customer integration
- ✅ Create new work orders

### Work Order Details
- ✅ Comprehensive work order view
- ✅ Status-based field visibility
- ✅ Parts usage tracking
- ✅ Station routing information
- ✅ Editable work order data

### Station Management
- ✅ Station listing and management
- ✅ Consumable materials tracking
- ✅ Add/edit/delete operations

## 🎨 Design Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface using Tailwind CSS
- **Interactive Elements**: Hover effects, transitions, and status indicators
- **Data Visualization**: Color-coded status indicators and progress tracking
- **User Experience**: Intuitive navigation and confirmation dialogs

## 📈 Deployment

The application is configured for automatic deployment to GitHub Pages using GitHub Actions. Every push to the main branch triggers a build and deployment.

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the `out/` directory to your hosting provider

## 🤝 Contributing

This is a prototype application. Feel free to fork and customize for your needs.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Components

- **Navigation**: Responsive navigation bar with active state indicators
- **Dashboard Cards**: Statistical overview with interactive elements
- **Data Tables**: Sortable, searchable tables with pagination
- **Modal Forms**: Clean form interfaces for data entry
- **Status Indicators**: Color-coded badges for different states

---

Built with ❤️ using Next.js and TypeScript
