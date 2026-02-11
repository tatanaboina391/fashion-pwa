# Fashion Studio PWA

A Progressive Web Application for browsing and customizing fashion items built with React.

## Features

- 🎨 **Beautiful UI**: Modern, premium design with smooth animations
- 📱 **PWA Ready**: Installable on mobile devices with offline support
- 🔐 **Authentication**: Login and registration screens (UI only)
- 🏠 **Home Screen**: Browse fashion categories
- 👗 **Category Listings**: View items in each category
- ✨ **Customization**: Customize colors, designs, fabrics, and sizes
- 📐 **Responsive**: Works seamlessly on all device sizes

## Categories

- Saree
- Half Saree
- Lehanga
- Crop Top

## Tech Stack

- **React** - UI framework
- **React Router** - Navigation
- **Vite** - Build tool
- **CSS3** - Styling with custom design system
- **PWA** - Progressive Web App capabilities

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd fashion-pwa
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
fashion-pwa/
├── public/
│   ├── manifest.json          # PWA manifest
│   └── service-worker.js      # Service worker for offline support
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Navigation component
│   │   └── Navbar.css
│   ├── pages/
│   │   ├── Home.jsx           # Home page with categories
│   │   ├── Home.css
│   │   ├── Login.jsx          # Login page
│   │   ├── Register.jsx       # Registration page
│   │   ├── Auth.css           # Shared auth styles
│   │   ├── CategoryListing.jsx # Category items listing
│   │   ├── CategoryListing.css
│   │   ├── Customize.jsx      # Customization screen
│   │   └── Customize.css
│   ├── App.jsx                # Main app component with routing
│   ├── App.css
│   ├── index.css              # Global styles & design system
│   └── main.jsx               # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Design System

The application uses a comprehensive design system with:

- **Color Palette**: Premium fashion-themed colors with gradients
- **Typography**: Inter for body text, Playfair Display for headings
- **Spacing**: Consistent spacing scale (xs to xxl)
- **Shadows**: Multiple shadow levels for depth
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Mobile-first approach

## PWA Features

### Manifest
The app includes a `manifest.json` file with:
- App name and description
- Theme colors
- Display mode (standalone)
- Icon configurations

### Service Worker
Basic service worker implementation for:
- Offline functionality
- Resource caching
- Cache management

### Icons
To complete the PWA setup, add icon files:
- `public/icon-192.png` (192x192)
- `public/icon-512.png` (512x512)

You can generate these icons using any design tool or online icon generator.

## Screens

### 1. Authentication
- **Login**: Email/password with validation
- **Register**: Full name, email, password, confirm password with validation

### 2. Home
- Hero section with statistics
- Category grid (Saree, Half Saree, Lehanga, Crop Top)
- Features section

### 3. Category Listing
- Category header with description
- Filter options (sort, price range)
- Grid of items with ratings and prices

### 4. Customization
- Live preview panel
- Color selection (8 colors)
- Design patterns (6 options)
- Fabric types (6 options)
- Size selection (XS to XXL + Custom)
- Additional notes field

## Future Enhancements

This is a UI-only implementation. Future phases could include:

- Backend API integration
- Real authentication with JWT
- Database for products and user data
- Payment gateway integration
- Order management system
- User profile and order history
- Real-time customization preview with actual images
- Shopping cart functionality
- Wishlist feature
- Reviews and ratings system

## Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## License

This project is created for demonstration purposes.

## Author

Built with ❤️ using React and modern web technologies.
