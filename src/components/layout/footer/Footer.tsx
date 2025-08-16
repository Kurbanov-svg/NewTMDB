import styles from "./Footer.module.css";
import {
  FaYoutube,
  FaInstagram,
  FaTelegramPlane,
  FaFacebookF,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span>Nexa Cinema</span>
          </div>
          <p className={styles.desc}>
            Ваш идеальный спутник в мире кино и сериалов. Откройте для себя
            новые горизонты развлечений.
          </p>
          <div className={styles.social}>
            <FaTelegramPlane />
            <FaFacebookF />
            <FaYoutube />
            <FaInstagram />
          </div>
        </div>

        <div className={styles.column}>
          <h4>Навигация</h4>
          <ul>
            <li>Главная</li>
            <li>Новинки</li>
            <li>Топ 100</li>
            <li>Рекомендации</li>
            <li>Избранное</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Категории</h4>
          <ul>
            <li>Фильмы</li>
            <li>Сериалы</li>
            <li>Документальные</li>
            <li>Мультфильмы</li>
            <li>Аниме</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Жанры</h4>
          <ul>
            <li>Боевики</li>
            <li>Комедии</li>
            <li>Драмы</li>
            <li>Триллеры</li>
            <li>Фантастика</li>
          </ul>
        </div>

        <div className={styles.subscribe}>
          <h4>Будьте в курсе</h4>
          <p>
            Подпишитесь на новости и получайте информацию о новинках первыми
          </p>
          <div className={styles.emailForm}>
            <input type="email" placeholder="Ваш email" />
            <button>➤</button>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2025 CinemaHub. Все права защищены.</p>
        <div className={styles.links}>
          <span>Политика конфиденциальности</span>
          <span>Пользовательское соглашение</span>
          <span>Поддержка</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
