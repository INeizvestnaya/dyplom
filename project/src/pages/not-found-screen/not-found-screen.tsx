import Icons from '../../components/icons/icons';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import './not-found-screen.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getOrderData } from '../../store/site-data/selectors';
import { summarizeNumbers } from '../../utils/utils';

function NotFoundScreen(): JSX.Element {
  const currentOrderData = useAppSelector(getOrderData);

  return (
    <>
      <Icons/>
      <div className="wrapper">

        <Header
          basketCount={summarizeNumbers(currentOrderData.amounts)}
        />

        <main>
          <div className="page-message">
            <h1 className="page-message__title">404</h1>
            <span className="page-message__text">Page not found</span>
            <Link className="page-message__link" to='/'>Back to main page</Link>
          </div>
        </main>

        <Footer/>

      </div>
    </>
  );
}
export default NotFoundScreen;
