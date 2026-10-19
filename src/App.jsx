// App — base application layout.
// Part of the WAMD TD-TP 2 lab (devcrate). Feature views (catalog, cart,
// product detail modal) will be rendered inside <main> in later phases.
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="page">
      <Header />
      <main className="page__main">
        <section className="placeholder">
          <h1 className="placeholder__title">This is a base layout</h1>
          <p className="placeholder__text">
            The product catalog will be rendered here in the next phase.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
