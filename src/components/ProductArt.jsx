// ProductArt — the product's artwork tile, used by catalog cards (and later
// cart rows).
//
// Renders a real <img> when the product has an image URL, and falls back to
// the built-in emoji tile when there is no URL or when the image fails to
// load, so the layout never breaks. The tile / img gets `data-category`,
// which the stylesheet uses to pick a tint per category.
import { useState } from "react";

function categorySlug(product) {
  return product.category.toLowerCase().replace(/[^a-z]+/g, "-");
}

export default function ProductArt({ product, className = "card__art" }) {
  // Local state: only this tile needs to know whether the image failed,
  // so it does not belong in global state.
  const [showImage, setShowImage] = useState(Boolean(product.image));

  if (showImage) {
    return (
      <img
        className={className}
        data-category={categorySlug(product)}
        src={product.image}
        alt={product.name}
        loading="lazy"
        onError={() => setShowImage(false)}
      />
    );
  }

  // No URL (or it failed): decorative emoji tile on a category tint.
  return (
    <div
      className={className}
      data-category={categorySlug(product)}
      role="img"
      aria-label={product.name}
    >
      <span className="card__art-emoji" aria-hidden="true">
        {product.emoji}
      </span>
    </div>
  );
}
