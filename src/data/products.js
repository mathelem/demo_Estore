// devcrate — sample catalog data.
//
// All product data lives in this single file. Components import it and map
// over it; nothing product-specific is hard-coded in JSX.
//
// Product shape (documented for new contributors):
// {
//   id:          string  — stable unique id (used by the Redux cart later)
//   name:        string  — display name
//   category:    string  — one of the categories below (used by filters)
//   price:       number  — decimal price in EUR, formatted by components
//   image:       string? — optional image URL; null -> built-in art instead
//   emoji:       string  — placeholder artwork, always renders, needs no network
//   description: string  — one-liner shown on cards and the detail view
// }
//
// Every product also has an emoji fallback, so even if a real image URL is
// added later and fails to load, the layout still works (the <img/> gets an
// onError fallback that switches to the emoji tile).

export const products = [
  {
    id: "kb-clack-tkl",
    name: "Clack TKL Mechanical Keyboard",
    category: "Peripherals",
    price: 89.99,
    image: null,
    emoji: "⌨️",
    description:
      "Hot-swappable tenkeyless board with pre-lubed tactile switches and a gasket mount that keeps late-night typing quiet.",
  },
  {
    id: "ms-driftpro",
    name: "DriftPro Vertical Mouse",
    category: "Peripherals",
    price: 34.5,
    image: null,
    emoji: "🖱️",
    description:
      "57° vertical grip that takes the twist out of long sessions, with six programmable buttons and silent clicks.",
  },
  {
    id: "hub-sevenport",
    name: "SevenPort USB-C Hub",
    category: "Peripherals",
    price: 44.0,
    image: null,
    emoji: "🔌",
    description:
      "One cable for the whole desk: dual 4K HDMI, 100 W laptop passthrough and gigabit Ethernet, all through a single USB-C plug.",
  },
  {
    id: "mg-404-coffee",
    name: "“404: Coffee Not Found” Mug",
    category: "Drinkware",
    price: 12.99,
    image: null,
    emoji: "☕",
    description:
      "350 ml ceramic mug for debugging by caffeine. Dishwasher-safe, stackable and unreasonably encouraging before stand-up.",
  },
  {
    id: "st-pi-stand",
    name: "Pi Laptop Stand",
    category: "Desk Gear",
    price: 24.99,
    image: null,
    emoji: "📐",
    description:
      "Anodised aluminium riser with six tilt heights. Raises your screen to eye level and quietly helps your CPU breathe.",
  },
  {
    id: "mt-ideas-grid",
    name: "Ideas Grid Desk Mat",
    category: "Desk Gear",
    price: 19.0,
    image: null,
    emoji: "🧩",
    description:
      "90 × 40 cm stitched-edge mat with a faint 5 mm grid — perfect for sketching wireframes and keeping your keyboard aligned.",
  },
  {
    id: "sticker-shipit",
    name: "Ship It! Sticker Pack",
    category: "Desk Gear",
    price: 6.5,
    image: null,
    emoji: "🏷️",
    description:
      "24 vinyl stickers of merge conflicts, rubber ducks and other developer folklore. Waterproof and laptop-lid-proof.",
  },
  {
    id: "hd-codecoffee",
    name: "Code & Coffee Hoodie",
    category: "Apparel",
    price: 49.0,
    image: null,
    emoji: "👕",
    description:
      "Heavyweight fleece hoodie: small “devcrate” embroidery on the chest, the whole workflow on the back — code, brew, repeat.",
  },
];

// Categories derived from the data (kept as a derived export so filters and
// the future detail view always agree with what is actually in the catalog).
export const categories = [...new Set(products.map((p) => p.category))];
