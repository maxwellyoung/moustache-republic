# Classic Tee Product Page

A responsive e-commerce product page for a Classic Tee, built with Next.js 14, TypeScript, and Tailwind CSS. This project implements a product details page with size selection and cart functionality, following specific design requirements.

## Features

- Product details display with:
  - Dynamic image loading
  - Size selection (S, M, L)
  - Size validation with error messaging
  - Price and description display
- Mini Cart functionality:
  - Add items with selected sizes
  - Update quantities
  - Remove items
  - Sliding cart interface on mobile
  - Total price calculation
- API Integration:
  - Product data fetched from provided endpoint
  - Rate limiting (5 requests per hour)
  - Response caching
- Responsive Design:
  - Mobile-first approach
  - Desktop layout optimization
  - Smooth transitions and animations

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd classic-tee-product
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the product page

## API Details

The product data is fetched from:

```
https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product
```

Response format:

```json
{
  "id": 1,
  "title": "Classic Tee",
  "description": "Lorem ipsum...",
  "price": 75.0,
  "imageURL": "...",
  "sizeOptions": [
    { "id": 1, "label": "S" },
    { "id": 2, "label": "M" },
    { "id": 3, "label": "L" }
  ]
}
```

## Testing

Run the test suite:

```bash
npm test
```

Tests cover:

- Cart functionality
- Size selection
- Quantity updates
- API caching
- UI interactions

## Implementation Details

### Rate Limiting

- Maximum 5 API requests per hour
- Cached responses used when limit reached
- Cache invalidation after 1 hour

### Cart Features

- Add items with size selection
- Update quantities with +/- controls
- Remove items when quantity reaches 0
- Persistent cart state during session
- Toast notifications for cart actions

### Responsive Behavior

- Mobile: Full-width layout with sliding cart
- Desktop: Side-by-side layout with inline cart
- Breakpoint at 768px (md)

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Testing**: Jest & React Testing Library
- **UI Components**: Custom implementation
- **Notifications**: Sonner
- **Icons**: Lucide React

## Project Structure

```
src/
  app/                  # Next.js App Router
    page.tsx           # Main product page
    layout.tsx         # Root layout
  components/          # React components
    ProductDetails.tsx # Product display
    MiniCart.tsx      # Cart interface
  utils/              # Utilities
    api.ts            # API cache implementation
  types/              # TypeScript definitions
  lib/                # Shared utilities
```

## Development Commands

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
npm test       # Run tests
```

## Browser Support

Tested and optimized for:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
