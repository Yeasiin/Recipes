import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-brand">
            <Link href="/">
              <img
                src="https://res.cloudinary.com/yex/image/upload/v1646088232/storage/logo_ka5uhb.svg"
                alt="Recipes"
              />
            </Link>
            <nav>
              <ul className="nav-list">
                <li>
                  <Link href="/breakfast">
                    <a className="nav-link">Breakfast</a>
                  </Link>
                </li>
                <li>
                  <Link href="/lunch">
                    <a className="nav-link">Lunch</a>
                  </Link>
                </li>
                <li>
                  <Link href="/dinner">
                    <a className="nav-link">Dinner</a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <div className="page-content">{children}</div>

      <footer className="footer">
        <div className="container">
          <div className="footer-brand">
            <div>
              <img
                src="https://res.cloudinary.com/yex/image/upload/v1646088232/storage/logo-light_v6uwmg.svg"
                alt=""
              />
              <p>Save your time looking for recipes</p>
            </div>
            <div className="newsletter">
              <input type="text" placeholder="Subscribe to our newsletter !" />
              <input type="submit" value="SUBSCRIBE" />
            </div>
          </div>
          <hr color="#8a8a8a" size="1px" />
          <p className="footer-copyright">
            © Recipes - 2022 - All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  );
}
