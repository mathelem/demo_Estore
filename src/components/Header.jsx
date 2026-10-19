// Header — store branding, navigation links and the cart badge.
// Placeholder version: the cart count is static for now and will be read
// from the Redux store (useSelector) in the next phase.
export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <span className="header__logo" aria-hidden="true">
            ⌨️
          </span>
          <div className="header__name-group">
            <span className="header__name">devcrate</span>
            <span className="header__tagline">desk gear for builders</span>
          </div>
        </div>
        <nav className="header__nav" aria-label="Main navigation">
          <button type="button" className="header__link">
            Products
          </button>
          <button type="button" className="header__link">
            Cart
            <span className="header__badge">0</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
