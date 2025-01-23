# Christian Mauldin Photography Portfolio

A modern photography portfolio website built with React and Sanity.io, featuring photo galleries, video showcases, and print sales.

## Quick Start

1. Start Sanity Studio (Content Management):
```bash
cd studio
npm run dev
```
Access the Sanity Studio at `localhost:3333`

2. Start Main Website:
```bash
cd ..  # back to root
npm run dev
```
Access the website at `localhost:3000`

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Navbar.jsx        # Site navigation
│   │   ├── PrintCard.jsx     # Print display with purchase options
│   │   ├── SizeModal.jsx     # Print size selection
│   │   └── PageTransition.jsx # Page animations
│   ├── pages/         # Main page components
│   │   ├── HomePage.jsx      # Landing page
│   │   ├── PhotosPage.jsx    # Photo gallery
│   │   ├── VideoPage.jsx     # Video showcase
│   │   ├── PrintsPage.jsx    # Print shop
│   │   └── MorePage.jsx      # Blog/updates
│   ├── lib/           # Utilities and configurations
│   │   └── sanity.js         # Sanity client setup
│   └── styles/        # Global styles and theme
└── studio/           # Sanity CMS configuration
    └── schemas/      # Content type definitions
```

## Features

### Content Types (Sanity)

1. **Photos**
   - Title
   - Image
   - Date
   - Description

2. **Videos**
   - Title
   - YouTube URL
   - Date
   - Description

3. **Prints**
   - Title
   - Image
   - Date
   - Description
   - Size options with prices

### Pages

- **Homepage**: Featured content and print showcase
- **Photos**: Masonry gallery with lightbox
- **Videos**: YouTube video grid
- **Prints**: Print shop with size/pricing options
- **More**: Blog and updates section

## Technical Stack

- **Frontend**: React + Vite
- **Styling**: Styled Components
- **Routing**: React Router v6
- **CMS**: Sanity.io
- **Animations**: Framer Motion
- **Image Gallery**: React Masonry CSS

## Development

### Prerequisites
- Node.js
- npm/yarn
- Sanity account

### Setup

1. Install dependencies:
```bash
npm install
cd studio
npm install
```

2. Create `.env` file with Sanity token:
```
VITE_SANITY_TOKEN="your_token_here"
```

3. Start development servers:
```bash
# Terminal 1 - Website
npm run dev

# Terminal 2 - Sanity Studio
cd studio
npm run dev
```

## Content Management

### Adding Content

1. Navigate to Sanity Studio (`localhost:3333`)
2. Choose content type (Photo/Video/Print)
3. Fill required fields
4. Publish

### Print Management

Prints support multiple size options:
- 8" × 10"
- 12" × 16"
- 16" × 20"
- 20" × 24"

Each size can have its own price set in Sanity Studio.

## Deployment

The site is configured for deployment on Vercel:

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

## Best Practices

1. **Images**
   - Use high-quality images
   - Enable lazy loading
   - Optimize for web

2. **Content**
   - Keep descriptions concise
   - Use meaningful titles
   - Maintain consistent pricing

3. **Development**
   - Test responsiveness
   - Check performance
   - Keep dependencies updated

## License

All rights reserved © Christian Mauldin
