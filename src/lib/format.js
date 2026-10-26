// lib/format.js — small formatting helpers shared by feature components.

// One formatter instance, reused across components (cards, cart, summary).
// Formatting lives here, not inside the data file, so the dataset stays
// plain and display-independent.
const euro = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
});

export function formatPrice(value) {
  return euro.format(value);
}
