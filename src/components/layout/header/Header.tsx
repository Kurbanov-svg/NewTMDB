import { useState } from "react";
import { Link } from "react-router-dom";
import css from "./Header.module.css";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={css.container}>
      <div className={css.logo}>
        <span className={css.icon}></span>
        <span className={css.logoText}>Nexa Cinema</span>
      </div>

      <nav className={`${css.nav} ${css.desktopOnly}`}>
        <Link to="/home" className={css.link}>
          Главная
        </Link>
        <Link to="/film" className={css.link}>
          Фильмы
        </Link>
        <Link to="/tw" className={css.link}>
          TV шоу
        </Link>
        <Link to="/inject" className={css.link}>
          Inject
        </Link>
      </nav>

      <div className={`${css.search} ${css.desktopOnly}`}>
        <input type="text" placeholder="Поиск фильмов, сериалов..." />
        <button>🔍</button>
      </div>

      <div className={`${css.auth} ${css.desktopOnly}`}>
        <button className={css.login}>Войти</button>
        <button className={css.register}>Регистрация</button>
      </div>

      <button className={css.burger} onClick={() => setMenuOpen(true)}>
        <FiMenu size={26} />
      </button>

      <div className={`${css.mobileMenu} ${menuOpen ? css.open : ""}`}>
        <div className={css.menuHeader}>
          <span className={css.logoText}>Nexa Cinema</span>
          <button onClick={() => setMenuOpen(false)}>
            <FiX size={28} />
          </button>
        </div>

        <nav className={css.navMobile}>
          <Link to="/home" onClick={() => setMenuOpen(false)}>
            Главная
          </Link>
          <Link to="/film" onClick={() => setMenuOpen(false)}>
            Фильмы
          </Link>
          <Link to="/tw" onClick={() => setMenuOpen(false)}>
            TV шоу
          </Link>
          <Link to="/inject" onClick={() => setMenuOpen(false)}>
            Inject
          </Link>
        </nav>

        <div className={css.searchMobile}>
          <input type="text" placeholder="Поиск..." />
          <button>🔍</button>
        </div>

        <div className={css.authMobile}>
          <button className={css.login}>Войти</button>
          <button className={css.register}>Регистрация</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
