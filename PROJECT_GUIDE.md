# Devcrate React Project Guide

This document explains the project in beginner-friendly language: what the
technologies do, how the folders are organised, and what happens when the
application starts or when a user clicks **Add to cart**.

## 1. What this project is

This is a small online-store front end called **devcrate**. It currently
displays a catalog of desk and developer-related products.

The application is a **single-page React application**:

- The browser loads one HTML page.
- React takes control of the `<div id="root"></div>` element.
- React creates and updates the visible interface using JavaScript.
- The page does not need to reload when React changes the interface.

The current implementation is the catalog phase. A cart structure is planned,
and Redux is already listed as a dependency, but the cart is not connected yet.
At the moment, clicking **Add to cart** only writes a message to the browser
console and the header badge remains `0`.

## 2. Important technologies

### React

React lets the interface be split into reusable **components**. A component is
usually a JavaScript function that returns JSX.

JSX looks similar to HTML, but it is written inside JavaScript:

```jsx
function Greeting() {
  return <h1>Hello</h1>;
}
```

React calls the function and turns the returned JSX into browser elements.

### Vite

Vite is the development server and build tool:

- `npm run dev` starts a local development server.
- It provides fast refresh while editing files.
- `npm run build` creates an optimised production version in `dist/`.
- `npm run preview` serves the production build locally.

### Redux and React Redux

Redux is intended for shared application state, such as a shopping cart. A
Redux store would hold the cart items, and components could:

- **dispatch** an action such as `addToCart(product)`;
- **select** data such as the number of items from the store.

Those packages are installed in this project, but the store, slices, and
`<Provider>` wrapper have not been implemented yet.

### Oxlint

Oxlint checks the JavaScript and JSX for common mistakes:

```text
npm run lint
```

## 3. Folder and file structure

```text
webApp/
├── index.html                 Browser entry HTML
├── package.json               Scripts and dependencies
├── vite.config.js             Vite configuration
├── public/
│   └── favicon.svg            Static file copied as-is
├── src/
│   ├── main.jsx               React entry point
│   ├── App.jsx                Top-level page composition
│   ├── components/            Reusable UI pieces
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ProductArt.jsx
│   ├── features/
│   │   └── catalog/           Catalog-specific UI
│   │       ├── CatalogPage.jsx
│   │       └── ProductCard.jsx
│   ├── data/
│   │   └── products.js        Product data
│   ├── lib/
│   │   └── format.js          Shared formatting helper
│   ├── store/                 Reserved for Redux state
│   │   ├── cart/
│   │   └── products/
│   └── styles/
│       └── global.css         Global styles and layout
├── dist/                      Generated production output
└── node_modules/              Installed packages; do not edit manually
```

The `.gitkeep` files inside currently empty feature/store folders exist so Git
can keep those folders in the repository before their real files are added.

## 4. How the application starts

The startup chain is:

```text
index.html
  -> src/main.jsx
      -> src/App.jsx
          -> Header
          -> CatalogPage
              -> ProductCard (one per product)
                  -> ProductArt
          -> Footer
```

### Step 1: `index.html`

The browser opens [`index.html`](./index.html). It contains:

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

The empty `root` element is the mounting point where React will render.

### Step 2: `src/main.jsx`

[`src/main.jsx`](./src/main.jsx) is the React entry point. It:

1. imports React's `StrictMode`;
2. imports `createRoot` from `react-dom/client`;
3. imports the top-level `App`;
4. imports the global stylesheet;
5. renders `<App />` into the element whose ID is `root`.

`StrictMode` helps reveal some development-time problems. It does not create a
visible part of the store.

### Step 3: `src/App.jsx`

[`src/App.jsx`](./src/App.jsx) is the page coordinator. It does not contain
every visual detail. Instead, it assembles the page from components:

- `Header` is the store header and navigation.
- `CatalogPage` is the main product listing.
- `Footer` is the bottom note.

It also currently owns `handleAddToCart`. This function receives a product and
logs a demo message. Later, this is the natural place to dispatch a Redux
action.

## 5. How components communicate

React components receive information through **props**. Props are inputs
passed from a parent component to a child component.

For example, `App` passes a callback to `CatalogPage`:

```jsx
<CatalogPage onAddToCart={handleAddToCart} />
```

`CatalogPage` passes that callback and one product to every `ProductCard`:

```jsx
<ProductCard product={product} onAddToCart={onAddToCart} />
```

This gives the data flow a single direction:

```text
App owns the click handler
  -> CatalogPage forwards it
      -> ProductCard calls it with the selected product
```

The card does not need to know where the cart is stored. It only reports that a
user clicked the button. This keeps the card reusable and makes the future
Redux change smaller.

## 6. How the catalog is generated

### Product data

[`src/data/products.js`](./src/data/products.js) exports a `products` array.
Each product has:

| Property | Meaning |
| --- | --- |
| `id` | Stable unique identifier |
| `name` | Name shown to the user |
| `category` | Product category |
| `price` | Numeric price in euros |
| `image` | Optional image URL; currently `null` for the sample products |
| `emoji` | Fallback artwork |
| `description` | Short product description |

It also derives `categories` from the products. This avoids maintaining a
second list that could become out of sync.

### Mapping an array to UI

[`src/features/catalog/CatalogPage.jsx`](./src/features/catalog/CatalogPage.jsx)
imports the data once and uses `.map()`:

```jsx
products.map((product) => (
  <ProductCard key={product.id} product={product} />
))
```

`.map()` means “run this JSX template once for every product.” The `key` gives
React a stable identity for each item so React can update the list correctly.

### The product card

[`src/features/catalog/ProductCard.jsx`](./src/features/catalog/ProductCard.jsx)
is the reusable template for one product. It displays:

- the artwork;
- category;
- name;
- description;
- formatted price;
- the Add to cart button.

It imports `ProductArt` and `formatPrice`, but it does not import the complete
dataset. That separation prevents product markup from being duplicated.

## 7. Image fallback behavior

[`src/components/ProductArt.jsx`](./src/components/ProductArt.jsx) handles
product artwork.

1. If `product.image` exists, it renders an `<img>`.
2. If there is no image URL, it renders an emoji tile.
3. If an image URL exists but fails to load, `onError` switches to the emoji
   tile.

The `showImage` value is local React state because only that individual artwork
needs to know whether its image failed. It does not belong in a global cart
store.

## 8. Price formatting

[`src/lib/format.js`](./src/lib/format.js) contains the shared `formatPrice`
function. It uses `Intl.NumberFormat` with the `en-IE` locale and `EUR`
currency.

The data stays numeric (`89.99`) instead of storing display text (`€89.99`).
That is useful because numeric values can later be added, sorted, filtered, or
sent to an API before they are formatted for the screen.

## 9. Styling theory

[`src/styles/global.css`](./src/styles/global.css) contains the global visual
system:

- CSS variables in `:root` act as design tokens for colors, spacing, borders,
  shadows, and fonts.
- A reset makes browser defaults more predictable.
- The `.page` class creates a full-height page with a header, flexible main
  area, and footer.
- The catalog uses a responsive grid.
- Names such as `card__body` and `btn--add` follow a BEM-style convention:
  `block__element` and `block--modifier`.

The visual theme is called “Paper & Ink”: warm paper colors, dark borders,
hard offset shadows, and orange/cobalt accent colors.

## 10. What happens when “Add to cart” is clicked

The current click path is:

```text
User clicks the button
  -> ProductCard calls onAddToCart(product)
  -> CatalogPage forwards the callback
  -> App.handleAddToCart(product) runs
  -> A message is printed with console.info()
```

No product is saved yet. This is intentional preparation for the next Redux
phase. The intended future path is:

```text
ProductCard
  -> dispatch(addToCart(product))
  -> Redux cart state changes
  -> Header reads the new item count
  -> React re-renders the badge
```

To see the current demo message, open the browser developer tools and select
the **Console** tab.

## 11. How to run the project

From the project directory:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually something like
`http://localhost:5173`.

Useful commands:

```bash
npm run dev       # Start development mode
npm run lint      # Check JavaScript and JSX
npm run build     # Create a production build in dist/
npm run preview   # Preview the production build
```

## 12. A safe way to make changes

When adding a new product:

1. Add one object to `src/data/products.js`.
2. Keep its `id` unique.
3. Keep `price` numeric.
4. Provide an `emoji` even if an image URL is added.
5. Run `npm run lint` and `npm run build`.

When changing a product card, edit `ProductCard.jsx`. When changing the whole
catalog layout, edit `CatalogPage.jsx`. When changing the visual appearance,
edit `global.css`. Avoid putting all three responsibilities into one file.

## 13. Current limitations and likely next steps

The project is a working catalog UI, but these features are not connected yet:

1. Create a Redux store and cart slice.
2. Wrap the app with Redux's `<Provider>` in `main.jsx`.
3. Dispatch `addToCart` from `App` or directly from a suitable feature layer.
4. Read the cart count in `Header`.
5. Add a cart view and quantity controls.
6. Add routing or view state if the Products and Cart buttons should switch
   screens.
7. Replace static data with an API when a backend is available.

The current component boundaries are already prepared for these additions:
the catalog receives a callback, cards receive props, and shared state has
reserved folders under `src/store/`.

