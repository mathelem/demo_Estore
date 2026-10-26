// ProductCard — one product as a reusable "catalog tag".
//
// Everything inside comes in through props: the `product` object and an
// `onAddToCart` handler. The card never imports the dataset and never knows
// where the cart lives (it just reports the click upward), which makes it
// ready to be wired to Redux once the store exists.
import ProductArt from "../../components/ProductArt.jsx";
import { formatPrice } from "../../lib/format.js";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="card">
      <ProductArt product={product} />
      <div className="card__body">
        <p className="card__category">{product.category}</p>
        <h2 className="card__name">{product.name}</h2>
        <p className="card__description">{product.description}</p>
      </div>
      <div className="card__footer">
        <p className="card__price" aria-label={`Price: ${formatPrice(product.price)}`}>
          {formatPrice(product.price)}
        </p>
        <button
          type="button"
          className="btn btn--add"
          onClick={() => onAddToCart(product)}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
