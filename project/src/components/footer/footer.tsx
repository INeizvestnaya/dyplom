import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';

function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__info">
          <Link className="footer__logo" to={AppRoute.Main} aria-label="Переход на главную">
            <svg width="100" height="36" aria-hidden="true">
              <use xlinkHref="#icon-logo-mono"></use>
            </svg>
          </Link>
          <p className="footer__description">IShotStore - online photo equipment shop</p>
          <ul className="social">
            <li className="social__item">
              <a className="link" href="#!" aria-label="Переход на страницу вконтатке">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-vk"></use>
                </svg>
              </a>
            </li>
            <li className="social__item">
              <a className="link" href="#!" aria-label="Переход на страницу pinterest">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-pinterest"></use>
                </svg>
              </a>
            </li>
            <li className="social__item">
              <a className="link" href="#!" aria-label="Переход на страницу reddit">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-reddit"></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <p className="footer__title">Navigation</p>
            <ul className="footer__list">
              <li className="footer__item">
                <Link className="link" to={AppRoute.Main} data-testid="footer-catalog">Catalog
                </Link>
              </li>
              <li className="footer__item">
                <a className="link" href="#!">Guarantees
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#!">Delivery
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#!">About
                </a>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Resources</p>
            <ul className="footer__list">
              <li className="footer__item">
                <a className="link" href="#!">Courses
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#!">Blog
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#!">Community
                </a>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Support</p>
            <ul className="footer__list">
              <li className="footer__item">
                <a className="link" href="#!">FAQ
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#!">Ask a question
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
