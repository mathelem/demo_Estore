// App — base application layout.
// Currently renders the catalog; the cart view and the view state will be
// added when the Redux cart exists (next phase).
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import CatalogPage from "./features/catalog/CatalogPage.jsx";

export default function App() {
  // Temporary demo handler — every "Add to cart" click lands here.
  // The Redux phase replaces this body with:
  //   const dispatch = useDispatch();
  //   const handleAddToCart = (product) => dispatch(addToCart(product));
  // ProductCard and CatalogPage keep the exact same props and need no change.
  function handleAddToCart(product) {
    console.info(
      `[demo] add-to-cart clicked: "${product.name}" (id: ${product.id})`,
    );
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main">
        <CatalogPage onAddToCart={handleAddToCart} />
      </main>
      <Footer />
    </div>
  );
}
