# Portfolio CV - UX/UI Design Guidelines

> Design system et directives visuelles inspirées de [brittanychiang.com](https://brittanychiang.com)
> Style: Minimaliste professionnel avec touches Material Design
> Date: 2025-11-09

## 🎨 Design Philosophy

### Principes Directeurs

**Minimalisme professionnel**:
- Less is more - Chaque élément doit avoir une raison d'être
- Espaces blancs généreux pour la respiration visuelle
- Focus sur le contenu, pas la décoration
- Élégance par la simplicité

**Clarity & Readability**:
- Typography claire et hiérarchisée
- Contraste excellent pour accessibilité
- Tailles de texte confortables
- Lignes de lecture optimales (50-75 caractères)

**Subtle Interactions**:
- Animations douces et purposeful
- Micro-interactions pour feedback utilisateur
- Transitions smooth entre états
- Pas d'animations distrayantes

---

## 🎨 Color Palette

### Inspiration brittanychiang.com

**Base Colors** (Dark theme par défaut):
```css
/* Background Colors */
--bg-primary: #0a192f;      /* Navy dark blue - Main background */
--bg-secondary: #112240;    /* Lighter navy - Cards, sections */
--bg-tertiary: #1d2d50;     /* Even lighter - Hover states */

/* Text Colors */
--text-primary: #ccd6f6;    /* Light slate - Main text */
--text-secondary: #8892b0;  /* Medium slate - Secondary text */
--text-tertiary: #495670;   /* Dark slate - Muted text */

/* Accent Colors */
--accent-primary: #64ffda;  /* Mint green - CTA, links, highlights */
--accent-hover: #57e6c5;    /* Darker mint - Hover state */
--accent-light: #64ffda33;  /* Mint transparent - Backgrounds */

/* Semantic Colors */
--success: #64ffda;
--error: #ff6b6b;
--warning: #ffd93d;
--info: #6bcfff;

/* Borders & Dividers */
--border-color: #233554;
--divider-color: #233554;
```

**Light Theme** (Optionnel - Phase Premium):
```css
/* Background Colors */
--bg-primary: #ffffff;
--bg-secondary: #f8f9fa;
--bg-tertiary: #e9ecef;

/* Text Colors */
--text-primary: #2d3748;
--text-secondary: #4a5568;
--text-tertiary: #718096;

/* Accent Colors */
--accent-primary: #0ea5e9;  /* Sky blue for light theme */
--accent-hover: #0284c7;
--accent-light: #e0f2fe;
```

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Navy Theme (Default)
        navy: {
          darkest: '#0a192f',
          dark: '#112240',
          DEFAULT: '#1d2d50',
          light: '#233554',
        },
        slate: {
          lightest: '#ccd6f6',
          light: '#a8b2d1',
          DEFAULT: '#8892b0',
          dark: '#495670',
        },
        mint: {
          DEFAULT: '#64ffda',
          dark: '#57e6c5',
          light: '#7afde4',
        },
      },
    },
  },
}
```

---

## 🔤 Typography

### Fonts

**Primary Font**: Inter (sans-serif)
- Used for: Body text, UI elements
- Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- Source: Google Fonts

**Secondary Font**: JetBrains Mono (monospace)
- Used for: Code snippets, technical details, labels
- Weights: 400, 500, 600
- Source: Google Fonts

**Display Font**: Inter (same as primary, but larger weights)
- Used for: Headings, hero text
- Weights: 700 (bold), 800 (extrabold)

### Font Sizes & Scale

**Modular Scale** (1.25 ratio - Major Third):

```css
/* Typography Scale */
--text-xs: 0.75rem;      /* 12px - Labels, captions */
--text-sm: 0.875rem;     /* 14px - Small text */
--text-base: 1rem;       /* 16px - Body text */
--text-lg: 1.125rem;     /* 18px - Lead paragraphs */
--text-xl: 1.25rem;      /* 20px - Subtitle */
--text-2xl: 1.5rem;      /* 24px - H4 */
--text-3xl: 1.875rem;    /* 30px - H3 */
--text-4xl: 2.25rem;     /* 36px - H2 */
--text-5xl: 3rem;        /* 48px - H1 */
--text-6xl: 3.75rem;     /* 60px - Hero */
--text-7xl: 4.5rem;      /* 72px - Large hero */
```

### Heading Styles

```html
<!-- H1 - Hero Title -->
<h1 class="text-6xl md:text-7xl font-bold text-slate-lightest leading-tight">
  Hi, I'm Gabriel
</h1>

<!-- H2 - Section Title -->
<h2 class="text-4xl md:text-5xl font-bold text-slate-lightest mb-8">
  About Me
</h2>

<!-- H3 - Subsection Title -->
<h3 class="text-3xl font-semibold text-slate-light mb-4">
  Professional Experience
</h3>

<!-- H4 - Card Title -->
<h4 class="text-2xl font-semibold text-mint">
  Senior Full-Stack Developer
</h4>
```

### Body Text Styles

```html
<!-- Lead paragraph -->
<p class="text-lg text-slate-light leading-relaxed max-w-2xl">
  Full-stack developer with 6 years of experience...
</p>

<!-- Regular paragraph -->
<p class="text-base text-slate leading-relaxed">
  Specialized in Angular, .NET, and DevOps...
</p>

<!-- Small text -->
<p class="text-sm text-slate-dark">
  2019 - 2021 • EDF Paris
</p>

<!-- Code/Technical -->
<span class="font-mono text-sm text-mint">
  Angular 17 • TypeScript • Tailwind CSS
</span>
```

---

## 📐 Spacing & Layout

### Spacing Scale

**Tailwind Default Scale** (Base: 4px = 0.25rem):

```
0   → 0px
1   → 4px
2   → 8px
3   → 12px
4   → 16px
5   → 20px
6   → 24px
8   → 32px
10  → 40px
12  → 48px
16  → 64px
20  → 80px
24  → 96px
32  → 128px
```

### Layout Principles

**Container Widths**:
```css
/* Max widths for content sections */
--container-sm: 640px;   /* Single column */
--container-md: 768px;   /* Forms, CV */
--container-lg: 1024px;  /* Main content */
--container-xl: 1280px;  /* Wide sections */
--container-2xl: 1536px; /* Full width */
```

**Section Spacing**:
```html
<!-- Between sections -->
<section class="py-20 md:py-32">

<!-- Between subsections -->
<div class="mb-16 md:mb-24">

<!-- Between elements -->
<div class="mb-8">
```

**Padding & Margins**:
```html
<!-- Page padding (responsive) -->
<div class="px-6 md:px-12 lg:px-24">

<!-- Card padding -->
<div class="p-6 md:p-8">

<!-- Button padding -->
<button class="px-6 py-3 md:px-8 md:py-4">
```

---

## 🎭 Components

### Buttons

**Primary CTA Button**:
```html
<button class="
  px-8 py-4
  bg-transparent
  border-2 border-mint
  text-mint
  font-semibold
  rounded
  hover:bg-mint/10
  transition-all duration-300
  transform hover:scale-105
">
  View My Work
</button>
```

**Secondary Button**:
```html
<button class="
  px-6 py-3
  bg-navy
  text-slate-light
  font-medium
  rounded
  hover:bg-navy-dark
  transition-colors duration-200
">
  Learn More
</button>
```

**Link Button**:
```html
<a class="
  inline-flex items-center gap-2
  text-mint
  font-medium
  hover:underline
  transition-all duration-200
  group
">
  <span>Explore Project</span>
  <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform">
    <!-- Arrow icon -->
  </svg>
</a>
```

### Cards

**Project Card**:
```html
<article class="
  bg-navy-dark
  border border-navy-light
  rounded-lg
  p-6 md:p-8
  hover:border-mint/50
  hover:shadow-xl hover:shadow-mint/5
  transition-all duration-300
  transform hover:-translate-y-2
">
  <h3 class="text-2xl font-semibold text-mint mb-4">
    Project Title
  </h3>
  <p class="text-slate mb-6 leading-relaxed">
    Project description...
  </p>
  <div class="flex flex-wrap gap-2">
    <!-- Tech stack badges -->
  </div>
</article>
```

**Experience Card**:
```html
<div class="
  relative
  pl-8 md:pl-12
  border-l-2 border-navy-light
  pb-12
  hover:border-mint/50
  transition-colors duration-300
">
  <!-- Timeline dot -->
  <div class="
    absolute -left-2
    w-4 h-4
    bg-mint
    rounded-full
    border-4 border-navy-darkest
  "></div>

  <div class="bg-navy-dark rounded-lg p-6">
    <!-- Content -->
  </div>
</div>
```

### Badges

**Tech Stack Badge**:
```html
<span class="
  inline-block
  px-3 py-1
  bg-mint/10
  text-mint
  text-sm
  font-mono
  rounded
  border border-mint/20
">
  TypeScript
</span>
```

**Status Badge**:
```html
<span class="
  inline-flex items-center gap-1
  px-3 py-1
  bg-success/10
  text-success
  text-xs
  font-medium
  rounded-full
">
  <span class="w-2 h-2 bg-success rounded-full"></span>
  Available
</span>
```

### Forms

**Input Field**:
```html
<input
  type="text"
  class="
    w-full
    px-4 py-3
    bg-navy-dark
    border-2 border-navy-light
    text-slate-lightest
    rounded
    focus:border-mint
    focus:outline-none
    focus:ring-2 focus:ring-mint/20
    transition-all duration-200
  "
  placeholder="Your name"
/>
```

**Textarea**:
```html
<textarea
  rows="5"
  class="
    w-full
    px-4 py-3
    bg-navy-dark
    border-2 border-navy-light
    text-slate-lightest
    rounded
    resize-none
    focus:border-mint
    focus:outline-none
    focus:ring-2 focus:ring-mint/20
    transition-all duration-200
  "
  placeholder="Your message"
></textarea>
```

---

## ✨ Animations & Transitions

### Animation Principles

1. **Purposeful** - Every animation has a reason
2. **Subtle** - Not distracting from content
3. **Performant** - Use `transform` and `opacity` only
4. **Consistent** - Same timings across similar interactions

### Durations

```css
/* Standard transition times */
--duration-fast: 150ms;       /* Hover states */
--duration-normal: 200ms;     /* Default transitions */
--duration-slow: 300ms;       /* Complex animations */
--duration-slower: 500ms;     /* Page transitions */
```

### Easing Functions

```css
/* Tailwind built-in easings */
ease-linear     /* Constant speed */
ease-in         /* Slow start */
ease-out        /* Slow end (most common for UI) */
ease-in-out     /* Slow start and end */
```

### Common Animations

**Fade In on Scroll**:
```html
<div class="
  opacity-0
  translate-y-10
  animate-fade-in
">
  <!-- Content -->
</div>

<!-- In tailwind.config.js -->
{
  animation: {
    'fade-in': 'fadeIn 0.6s ease-out forwards',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0', transform: 'translateY(20px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
  },
}
```

**Hover Scale**:
```html
<div class="transform hover:scale-105 transition-transform duration-300">
```

**Smooth Scroll**:
```css
html {
  scroll-behavior: smooth;
}
```

**Slide In from Left** (for timeline):
```html
<div class="
  transform -translate-x-10 opacity-0
  transition-all duration-500
  [&.visible]:translate-x-0 [&.visible]:opacity-100
">
```

---

## 📱 Responsive Design

### Breakpoints

**Tailwind Breakpoints**:
```
sm:   640px   /* Small tablets */
md:   768px   /* Tablets */
lg:   1024px  /* Small laptops */
xl:   1280px  /* Desktops */
2xl:  1536px  /* Large screens */
```

### Mobile-First Approach

**Always design mobile first, then enhance for larger screens:**

```html
<!-- Mobile: Stack vertically -->
<!-- Tablet+: Side by side -->
<div class="
  flex flex-col md:flex-row
  gap-6 md:gap-12
">
  <div class="w-full md:w-1/2">Content 1</div>
  <div class="w-full md:w-1/2">Content 2</div>
</div>

<!-- Mobile: Small text -->
<!-- Desktop: Large text -->
<h1 class="text-4xl md:text-6xl lg:text-7xl">
  Hero Title
</h1>

<!-- Mobile: Hidden navigation -->
<!-- Desktop: Visible navigation -->
<nav class="hidden md:block">
  <!-- Desktop nav -->
</nav>
<button class="md:hidden">
  <!-- Mobile hamburger -->
</button>
```

### Common Responsive Patterns

**Grid Layout**:
```html
<!-- 1 col mobile, 2 cols tablet, 3 cols desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

**Padding Responsive**:
```html
<section class="px-4 md:px-8 lg:px-16 py-12 md:py-20 lg:py-32">
```

**Hidden/Visible Responsive**:
```html
<!-- Show on mobile only -->
<div class="block md:hidden">Mobile menu</div>

<!-- Show on desktop only -->
<div class="hidden md:block">Desktop nav</div>
```

---

## 🎯 Page-Specific Guidelines

### Home Page

**Hero Section**:
- Full viewport height (`min-h-screen`)
- Centered content vertically and horizontally
- Large heading (text-6xl md:text-7xl)
- Tagline below (text-lg md:text-xl text-slate)
- CTA button with accent color
- Subtle scroll indicator at bottom

**Layout**:
```html
<section class="min-h-screen flex items-center justify-center px-6">
  <div class="max-w-4xl">
    <h1 class="text-6xl md:text-7xl font-bold text-slate-lightest mb-6">
      Hi, I'm Gabriel
    </h1>
    <p class="text-xl md:text-2xl text-mint mb-4">
      Full-Stack Developer & DevOps Engineer
    </p>
    <p class="text-lg text-slate mb-8 max-w-2xl leading-relaxed">
      I build exceptional digital experiences...
    </p>
    <button class="...">View My Work</button>
  </div>
</section>
```

### Experience Page

**Timeline Layout** (inspired by brittanychiang.com):
- Vertical timeline on the left
- Cards on the right
- Alternating layout on desktop (optional)
- Hover effects on cards
- Tech stack badges at bottom of each card

### Projects Page

**Grid Layout**:
- 1 column mobile
- 2 columns tablet
- 3 columns desktop (optional, or stay at 2 for larger cards)
- Featured project (IFTT-Trading) is larger or highlighted
- Hover effects: lift + shadow + border glow

### CV Page

**Print-Friendly Design**:
- Remove navigation when printing (`@media print`)
- Clean, professional layout
- Good contrast for printing
- Standard A4 proportions
- Page breaks between sections

```css
@media print {
  nav, footer { display: none; }
  body { background: white; color: black; }
  section { page-break-inside: avoid; }
}
```

### Contact Page

**Form Layout**:
- Centered form, max-width 768px
- Clear labels above inputs
- Validation states (error/success)
- Social links grid below form
- Icon buttons for social media

---

## ♿ Accessibility

### WCAG 2.1 Level AA Compliance

**Color Contrast**:
- Text on background: Minimum 4.5:1 ratio
- Large text (18px+): Minimum 3:1 ratio
- Interactive elements: Minimum 3:1 ratio

**Keyboard Navigation**:
```html
<!-- Visible focus states -->
<button class="
  focus:outline-none
  focus:ring-2
  focus:ring-mint
  focus:ring-offset-2
  focus:ring-offset-navy-darkest
">
```

**Semantic HTML**:
```html
<!-- Use proper heading hierarchy -->
<h1> → <h2> → <h3> (no skipping levels)

<!-- Use semantic tags -->
<header>, <nav>, <main>, <section>, <article>, <footer>

<!-- Alt text for images -->
<img src="..." alt="Descriptive alt text" />

<!-- ARIA labels when needed -->
<button aria-label="Open mobile menu">
```

**Screen Reader Support**:
```html
<!-- Skip to main content link -->
<a href="#main-content" class="sr-only focus:not-sr-only">
  Skip to main content
</a>

<!-- Hidden text for screen readers -->
<span class="sr-only">New window</span>

<!-- ARIA live regions for dynamic content -->
<div aria-live="polite" aria-atomic="true">
  Form submitted successfully
</div>
```

---

## 📦 Assets & Icons

### Icon Library

**Heroicons** (recommended):
- Free, open-source
- Tailwind-friendly
- Outline and solid variants
- Copy SVG directly

**Usage**:
```html
<svg class="w-6 h-6 text-mint" fill="none" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
```

### Images

**Format**:
- Profile photo: WebP format, 400x400px, optimized
- Project screenshots: WebP, max 1200px width
- Logos: SVG when possible

**Optimization**:
- Use `loading="lazy"` for images below fold
- Provide width/height to prevent layout shift
- Use responsive images with `srcset`

---

## 🎨 Design Checklist

### Before Implementing a Component

- [ ] Colors match palette (navy, slate, mint)
- [ ] Typography uses defined scale
- [ ] Spacing follows 4px grid
- [ ] Mobile-first responsive design
- [ ] Hover states defined
- [ ] Focus states for accessibility
- [ ] Smooth transitions (200-300ms)
- [ ] Semantic HTML structure
- [ ] ARIA labels where needed
- [ ] Tested with screen reader (NVDA/VoiceOver)

### Quality Checks

- [ ] Lighthouse Accessibility: 100
- [ ] Color contrast: WCAG AA compliant
- [ ] Keyboard navigation works
- [ ] Focus visible on all interactive elements
- [ ] No layout shifts (CLS < 0.1)
- [ ] Animations smooth on 60fps
- [ ] Print styles work for CV page

---

## 📚 Resources

### Inspiration Sources

- **brittanychiang.com** - Main inspiration, minimal portfolio
- **tailwindui.com** - Component examples
- **dribbble.com** - Design inspiration (search: "developer portfolio dark")

### Tools

- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Tailwind Play**: https://play.tailwindcss.com/
- **Heroicons**: https://heroicons.com/
- **Google Fonts**: https://fonts.google.com/

### Testing

- **Lighthouse**: Chrome DevTools
- **WAVE**: Browser extension for accessibility
- **axe DevTools**: Accessibility testing
- **ResponsivelyApp**: Multi-device preview

---

**Dernière mise à jour**: 2025-11-09
**Status**: Design system complet - Ready for implementation
**Référence**: brittanychiang.com + Material Design principles
