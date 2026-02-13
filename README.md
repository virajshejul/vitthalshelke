# ALEXANDER NOIR - Premium Photography Portfolio

A luxury, cinematic photography portfolio website with smooth scrolling, GSAP animations, and award-winning design aesthetics.

## 🎨 Features

### Design
- **Ultra Minimalist** - Clean, sophisticated black & white aesthetic
- **Cinematic Layout** - Large typography and generous spacing
- **Premium Typography** - Unbounded display font paired with Manrope body font
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Custom Cursor** - Interactive cursor with hover effects

### Animations
- **Lenis Smooth Scroll** - Buttery smooth scrolling experience
- **GSAP Animations** - Professional scroll-triggered animations
- **Parallax Effects** - Subtle depth and movement
- **Staggered Reveals** - Elegant content entrance animations
- **Page Transitions** - Smooth fade transitions between pages

### Functionality
- **Masonry Gallery** - Beautiful image grid with lightbox
- **Fullscreen Lightbox** - View images in detail with keyboard navigation
- **Contact Form** - Elegant form with validation and animations
- **Mobile Menu** - Smooth mobile navigation
- **Lazy Loading** - Optimized image loading for performance
- **SEO Optimized** - Clean, semantic HTML structure

## 📁 File Structure

```
portfolio/
│
├── index.html          # Home page with hero and featured works
├── works.html          # Gallery page with masonry grid
├── about.html          # About page with biography
├── contact.html        # Contact page with form and map
│
├── css/
│   └── style.css       # Main stylesheet with animations
│
├── js/
│   └── main.js         # JavaScript functionality
│
└── assets/
    └── images/         # Your photography images
```

## 🚀 Quick Start

### 1. Setup Files
1. Extract all files to your web directory
2. Ensure the folder structure matches above
3. Add your images to `assets/images/`

### 2. Customize Content

#### Update Personal Information
In all HTML files, replace:
- `ALEXANDER NOIR` → Your name
- `hello@alexandernoir.com` → Your email
- Location and contact details
- Social media links

#### Add Your Images
Replace the Unsplash placeholder images with your photography:

```html
<!-- Replace image URLs in index.html, works.html, about.html -->
<img src="assets/images/your-photo.jpg" alt="Your description">
```

#### Customize Colors
In `css/style.css`, modify CSS variables:

```css
:root {
    --color-bg: #0a0a0a;           /* Background color */
    --color-text: #ffffff;          /* Text color */
    --color-text-secondary: #a0a0a0; /* Secondary text */
    --color-accent: #ffffff;        /* Accent color */
    --color-border: #2a2a2a;       /* Border color */
}
```

#### Change Typography
Replace fonts in the `<head>` of each HTML file:

```html
<!-- Current fonts -->
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@200;300;400;500;600;700;800;900&family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">

<!-- Update CSS variables -->
:root {
    --font-display: 'Unbounded', sans-serif;
    --font-body: 'Manrope', sans-serif;
}
```

### 3. Deploy

#### Option 1: Local Testing
1. Simply open `index.html` in a modern browser
2. For best results, use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx serve
   ```

#### Option 2: Web Hosting
Upload all files to your hosting provider:
- Netlify (Drag & Drop)
- Vercel
- GitHub Pages
- Traditional hosting (FTP)

## 🎯 Pages Overview

### Home Page (index.html)
- Fullscreen hero section with animated title
- Featured works grid with hover effects
- Philosophy section
- Scroll indicator

### Works Page (works.html)
- Masonry-style gallery grid
- Hover zoom and grayscale-to-color effects
- Fullscreen lightbox with keyboard navigation
- Image counter and navigation

### About Page (about.html)
- Sticky portrait image with parallax
- Biography with elegant typography
- Services section
- Client logos grid
- Stats counter animation

### Contact Page (contact.html)
- Contact information sidebar
- Animated contact form with validation
- Interactive Google Map
- Social media links

## ⚙️ Technical Details

### Dependencies
- **Lenis** (v1.0.29) - Smooth scrolling
- **GSAP** (v3.12.2) - Animations
- **ScrollTrigger** - Scroll-based animations

All loaded via CDN - no installation required!

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Optimizations
- Lazy loading images
- Efficient GSAP animations
- Debounced scroll events
- Optimized CSS transitions
- Reduced motion support

## 🎨 Customization Guide

### Adding New Gallery Images

1. **In works.html**, add a new gallery item:
```html
<div class="gallery-item" data-cursor="VIEW">
    <img src="your-image.jpg" alt="Description" loading="lazy">
    <div class="gallery-overlay">
        <h3>IMAGE TITLE</h3>
        <span>2024</span>
    </div>
</div>
```

2. The lightbox will automatically include it!

### Modifying Animations

In `js/main.js`, adjust GSAP animation parameters:

```javascript
// Change animation duration
duration: 1,  // seconds

// Change animation easing
ease: 'power3.out',  // Try: 'power2.in', 'elastic', 'bounce'

// Change scroll trigger point
start: 'top 85%',  // When to start animation
```

### Adding New Sections

Follow this pattern for consistent animations:

```html
<section class="your-section">
    <div class="container">
        <div class="section-header">
            <span class="section-number">03</span>
            <h2 class="section-title">YOUR TITLE</h2>
        </div>
        <!-- Your content -->
    </div>
</section>
```

### Mobile Responsiveness

The design is fully responsive with breakpoints:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

Adjust breakpoints in `css/style.css`:

```css
@media (max-width: 768px) {
    /* Mobile styles */
}
```

## 🔧 Advanced Features

### Custom Cursor
The cursor changes based on hover states. To customize:

```javascript
// In main.js, modify cursor behavior
cursor.classList.add('hover');  // Enlarge cursor
cursor.innerHTML = '<div class="cursor-text">CLICK</div>';  // Add text
```

### Form Integration
Connect the contact form to your backend:

```javascript
// In initContactForm() function
// Replace the setTimeout with actual form submission:

fetch('your-backend-url', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
})
.then(response => response.json())
.then(result => {
    showMessage('Message sent successfully!', 'success');
})
.catch(error => {
    showMessage('Error sending message', 'error');
});
```

### Google Maps API
To use a custom styled map:

1. Get API key from Google Cloud Console
2. Replace iframe in contact.html with Maps JavaScript API
3. Apply custom styling for dark theme

## 📱 Social Media Integration

Update social links in all HTML files:

```html
<div class="footer-socials">
    <a href="https://instagram.com/yourhandle" class="social-link">INSTAGRAM</a>
    <a href="https://behance.net/yourhandle" class="social-link">BEHANCE</a>
    <a href="https://vsco.co/yourhandle" class="social-link">VSCO</a>
</div>
```

## 🎬 Animation Tips

### Disable Animations for Accessibility
The site automatically respects `prefers-reduced-motion`:

```javascript
// Already implemented in main.js
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(0.01);
}
```

### Adjust Scroll Speed
Modify Lenis configuration:

```javascript
const lenis = new Lenis({
    duration: 1.2,  // Increase for slower scroll
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
```

## 🐛 Troubleshooting

### Images Not Loading
- Check file paths are correct
- Ensure images are in `assets/images/` folder
- Verify image formats (jpg, png, webp)

### Animations Not Working
- Check browser console for errors
- Ensure GSAP and Lenis scripts are loaded
- Clear browser cache

### Smooth Scroll Not Working
- Verify Lenis script is loaded before main.js
- Check for JavaScript errors in console
- Ensure `overflow-x: hidden` on body

### Mobile Menu Not Opening
- Check that menu-toggle class is present
- Verify JavaScript is loaded
- Inspect for console errors

## 🌟 Best Practices

### Image Optimization
- Use WebP format for best quality/size ratio
- Compress images (aim for < 500KB)
- Provide appropriate dimensions:
  - Portrait: 800x1200px
  - Landscape: 1600x900px
  - Square: 1000x1000px

### SEO Optimization
- Update meta descriptions in each HTML file
- Add relevant alt text to all images
- Use semantic HTML structure
- Create XML sitemap

### Performance
- Lazy load all images except hero
- Minimize DOM manipulation
- Use CSS transforms for animations
- Compress JavaScript if deploying

## 📄 License

This template is free to use for personal and commercial projects.
- Modify as needed
- Remove or keep attribution
- Share and distribute

## 🤝 Credits

- **Design Inspiration**: Taras Yareha portfolio aesthetic
- **Fonts**: Google Fonts (Unbounded, Manrope)
- **Images**: Unsplash (replace with your own)
- **Libraries**: Lenis, GSAP, ScrollTrigger

## 📧 Support

For questions or issues:
- Check the troubleshooting section
- Review browser console for errors
- Verify all file paths are correct

---

**Built with ❤️ for photographers who value premium design**

Enjoy creating your stunning portfolio! 🎨📸
