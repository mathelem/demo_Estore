// CatalogPage — the product list.
//
// The ONLY component that imports the product dataset. It maps over it and
// passes each product down to <ProductCard> as a prop, so the markup for a
// product exists exactly once (inside ProductCard) no matter how many
// products the catalog has.
import { products } from "../../data/products.js";
import ProductCard from "./ProductCard.jsx";

export default function CatalogPage({ onAddToCart }) {
  return (
    <section className="catalog" aria-labelledby="catalog-title">
      <header className="catalog__header">
        <h1 id="catalog-title" className="catalog__title">
          The catalog
        </h1>
        <p className="catalog__count">{products.length} products</p>
      </header>
      <ul className="catalog__grid">
        {products.map((product) => (
          <li className="catalog__item" key={product.id}>
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </li>
        ))}
      </ul>
    </section>
  );
}
