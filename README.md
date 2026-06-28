# Two Brothers Home Bakery — Premium Homemade Bakery Website

A luxury, fully-responsive frontend website for a homemade bakery brand.  
Built with Three.js, GSAP, Lenis, AOS, and Vanilla Tilt. Ready for GitHub Pages.

---

## 🗂 Folder Structure

```
/bakery
├── index.html          ← Main HTML (all sections)
├── css/
│   └── style.css       ← Full design system + responsive styles
├── js/
│   ├── products.js     ← ⭐ YOUR MENU — edit this file only
│   └── app.js          ← All JS: Three.js, GSAP, filters, FAQ, etc.
├── images/             ← Put your own product photos here
├── assets/             ← Fonts, icons, other assets
└── README.md
```

---

## ✏️ How to Manage Your Menu

**You never need to touch HTML to update your products.**

Open `js/products.js` and edit the `PRODUCTS` array.

### Add a product
```js
{
  id: "my-new-product",
  name: "Mango Cheesecake",
  category: "cheesecake",           // must match a CATEGORIES id
  description: "Fresh mango...",
  shortDesc: "Mango · Cream Cheese · No-Bake",
  price: 499,
  priceUnit: "per serving",
  image: "images/mango-cheesecake.jpg",  // or Unsplash URL
  bestSeller: false,
  available: true,                  // false = hidden from site
  newArrival: true,
  tags: ["mango", "summer", "new"],
  whatsappMessage: "Hi! I would like to order Mango Cheesecake.",
  badge: "Seasonal"
}
```

### Hide a product (without deleting it)
```js
available: false
```

### Mark as Best Seller
```js
bestSeller: true
```

### Add a new category
In the `CATEGORIES` array:
```js
{ id: "cakes", label: "Cakes", icon: "🎂" }
```
Then add products with `category: "cakes"`.

---

## 🚀 Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `ladouceur`)
2. Upload all files maintaining the folder structure
3. Go to **Settings → Pages → Source → main branch / root**
4. Your site will be live at `https://yourusername.github.io/ladouceur/`

---

## 📦 Libraries Used (all via CDN — no npm needed)

| Library | Purpose |
|---|---|
| Three.js r128 | 3D hero particle scene |
| GSAP 3.12 | Hero animations, scroll triggers |
| Lenis 1.0 | Buttery smooth scrolling |
| AOS 2.3 | Scroll reveal animations |
| Vanilla Tilt 1.8 | 3D card hover effect |

---

## 📱 Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Dark / Light mode toggle (saved to localStorage)
- ✅ Interactive Three.js floating particle scene
- ✅ Dynamic product rendering from `products.js`
- ✅ Search, category filter, sort, best seller filter
- ✅ Favourite heart (saved to localStorage)
- ✅ FAQ accordion
- ✅ Gallery with lightbox
- ✅ Animated counters
- ✅ Floating WhatsApp button
- ✅ Scroll progress bar
- ✅ Custom cursor (desktop only)
- ✅ Smooth scroll with Lenis
- ✅ Sticky navbar with active section indicator
- ✅ SEO meta tags
- ✅ Accessible HTML (aria labels, semantic tags)
- ✅ Lazy loaded images

---

## 📞 WhatsApp Number

Configured in `js/products.js` under `BRAND.whatsapp`:
```js
const BRAND = {
  whatsapp: "917019051231",   // ← change this if needed
  ...
};
```

---

## 🎨 Colours (edit in `css/style.css` `:root`)

| Token | Hex | Usage |
|---|---|---|
| `--cream` | `#FFF8F0` | Page background |
| `--choco` | `#3D1A0E` | Dark text, hero bg |
| `--coffee` | `#8B5A3C` | Accents |
| `--gold` | `#C9A84C` | CTAs, highlights |
| `--pink` | `#F0B8B8` | Soft accent |

---

*Made with ♥ for La Douceur, Bangalore.*
