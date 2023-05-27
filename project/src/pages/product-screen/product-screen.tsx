import Icons from '../../components/icons/icons';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchCameraAction, fetchReviewsAction, fetchSimilarCamerasAction, fetchCamerasAction } from '../../store/api-actions';
import { getCamera, getCameras, getReviews, getSimilarCamerasList, getIsPostSendingStatus, getOrderData } from '../../store/site-data/selectors';
import { RATING_NUMBERS } from '../../consts';
import { separateNumbers, isEscKeyPressed, refreshOrderData, summarizeNumbers } from '../../utils/utils';
import { resetCameraData, resetPostSentSuccessful, setOrderData } from '../../store/site-data/site-data';
import Slider from '../../components/slider/slider';
import Reviews from '../../components/reviews/reviews';
import ReviewModal from '../../components/product/review-modal/review-modal';
import ReviewSuccessModal from '../../components/product/review-success-modal/review-success-modal';
import AddItemModal from '../../components/add-item-modal/add-item-modal';
import AddItemSuccessModal from '../../components/add-item-success-modal/add-item-success-modal';
import LoadingScreen from '../loading-screen/loading-screen';

const TAB_SEARCH_PARAM = 'tab';
const EMPTY_LIST_LENGTH = 0;
const NON_EXISTENT_ID = 0;
const BEGIN_OF_PAGE_COORDINATE = 0;

function ProductScreen(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const camera = useAppSelector(getCamera);
  const reviews = useAppSelector(getReviews);
  const isPostSentSuccessfully = useAppSelector(getIsPostSendingStatus);
  const similarCamerasList = useAppSelector(getSimilarCamerasList);
  const camerasList = useAppSelector(getCameras);
  const currentOrderData = useAppSelector(getOrderData);
  const [isSpecsLinkActive, setIsSpecsLinkActive] = useState(true);
  const [isDescriptionLinkActive, setIsDescriptionLinkActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSendReviewModalOpened, setIsSendReviewModalOpened] = useState(false);
  const [isReviewSuccessModalOpened, setIsReviewSuccessModalOpened] = useState(false);
  const [isAddItemModalOpened, setIsAddItemModalOpened] = useState(false);
  const [isAddItemSuccessModalOpened, setIsAddItemSuccessModalOpened] = useState(false);
  const [idForAddItemModal, setIdForAddItemModal] = useState(NON_EXISTENT_ID);
  // Получение данных по конкретному продукту для заполнения полей модального окна "Добавить товар в корзину"
  const isIdExists = idForAddItemModal !== NON_EXISTENT_ID;
  const dataForAddItemModal = isIdExists ? camerasList.find((currentCamera) => currentCamera.id === idForAddItemModal) : camera;

  // Обработка параметров поиска адресной строки для корретной работы Табов "Характеристики" и "Описание"
  useEffect(() => {
    if (searchParams.get(TAB_SEARCH_PARAM) === null) {
      setSearchParams({tab: 'specifications'});
    }
  });

  useEffect(() => {
    const isSearchParamIsSpecifications = searchParams.get(TAB_SEARCH_PARAM) === 'specifications';

    setIsSpecsLinkActive(isSearchParamIsSpecifications);
    setIsDescriptionLinkActive(!isSearchParamIsSpecifications);
  },[searchParams]);

  useEffect(() => {
    window.scrollTo({top: BEGIN_OF_PAGE_COORDINATE});
    dispatch(fetchCameraAction(Number(id)));
    dispatch(fetchSimilarCamerasAction(Number(id)));
    dispatch(fetchReviewsAction(Number(id)));
    dispatch(fetchCamerasAction());

    return () => {
      dispatch(resetCameraData());
    };
  }, [dispatch, id]);

  // Скрытие/отображение секции "Похожие товары"
  const isSliderSectionVisible = !(similarCamerasList.length === EMPTY_LIST_LENGTH);

  // Скрытие/отображение секции "Отзывы"
  const isReviewsSectionVisible = !(reviews.length === EMPTY_LIST_LENGTH);

  // Действия, которые выполнятся сразу после отправки формы "Оставить отзыв". Т.е. после нажатия кнопки "Отправить отзыв"
  useEffect(() => {
    if (isSendReviewModalOpened && isPostSentSuccessfully) {
      setIsSendReviewModalOpened(false);
      dispatch(resetPostSentSuccessful());
      dispatch(fetchReviewsAction(Number(id)));
      setIsReviewSuccessModalOpened(true);
    }
  }, [isSendReviewModalOpened, isPostSentSuccessfully, dispatch, id]);

  if (!camera) {
    return <LoadingScreen/>;
  }

  // Нет возможности реализовать деструктуризацию переменной "camera" раньше проверки переменной на null,
  // поскольку будет выпадать ошибка: "Type 'null' is not assignable to type 'Camera'".
  const { name, vendorCode, type, category, description, level, rating, price, previewImg, reviewCount, matrix, brand, pixels, exposure, iso, weight } = camera;

  // Обработчики клика по Табам "Характеристики" и "Описание"
  const handleSpecificationsLinkClick = () => {
    setIsSpecsLinkActive(true);
    setIsDescriptionLinkActive(false);
  };

  const handleDescriptionLinkClick = () => {
    setIsSpecsLinkActive(false);
    setIsDescriptionLinkActive(true);
  };

  // Обработчик нажатия на кнопку "Наверх". Плавное поднятие на верх страницы
  const handleUpButtonClick = () => {
    window.scrollTo({
      top: BEGIN_OF_PAGE_COORDINATE,
      behavior: 'smooth'
    });
  };

  // Обработчик нажатия на кнопку "Оставить свой отзыв" для открытия модального окна "Оставить отзыв"
  const onSendReviewButonClick = () => {
    setIsSendReviewModalOpened(true);
    document.body.style.overflowY = 'hidden';
    document.body.style.paddingRight = '17px';
  };

  // Обработчик натия на кнопку "Купить" на элементе слайдера для открытия модального окна "Добавить товар в корзину"
  const onBuyButtonClick = (gettedId: number) => {
    if (gettedId !== undefined) {
      setIdForAddItemModal(gettedId);
    }
    setIsAddItemModalOpened(true);
    document.body.style.overflowY = 'hidden';
    document.body.style.paddingRight = '17px';
  };

  // Обработчики закрытия модальных окон по нажатию Кнопки закрытия, нажатия на overlay, нажатия на Esc
  const onCloseBtnOrOverlayClick = () => {
    setIsSendReviewModalOpened(false);
    setIsReviewSuccessModalOpened(false);
    setIsAddItemModalOpened(false);
    setIsAddItemSuccessModalOpened(false);
    setIdForAddItemModal(NON_EXISTENT_ID);
    document.body.style.overflowY = '';
    document.body.style.paddingRight = '0';
  };

  const handleEscBtnKeydown = (evt: React.KeyboardEvent<Element>) => {
    if(isEscKeyPressed(evt)) {
      isSendReviewModalOpened && setIsSendReviewModalOpened(false);
      isReviewSuccessModalOpened && setIsSendReviewModalOpened(false);
      isAddItemSuccessModalOpened && setIsAddItemSuccessModalOpened(false);
      if (isAddItemModalOpened) {
        setIsAddItemModalOpened(false);
        setIdForAddItemModal(NON_EXISTENT_ID);
      }

      document.body.style.overflowY = '';
      document.body.style.paddingRight = '0';
    }
  };

  // Обработчик нажатия на кнопку "Добавить в корзину"
  const handleAddToBasketBtnClick = () => {
    setIsAddItemModalOpened(true);
    document.body.style.overflowY = 'hidden';
    document.body.style.paddingRight = '17px';
  };

  // Обработчик нажатия на кнопку "Добавить в корзину" на модальном окне AddItemModal
  const onAddToBasketBtnClick = (gettedId: number) => {
    dispatch(setOrderData(refreshOrderData(gettedId, currentOrderData, camerasList)));
    setIsAddItemModalOpened(false);
    setIsAddItemSuccessModalOpened(true);
    setIdForAddItemModal(NON_EXISTENT_ID);
  };

  return (
    <>
      <Icons/>
      <div className="wrapper">

        <Header
          basketCount={summarizeNumbers(currentOrderData.amounts)}
        />

        <main onKeyDown={handleEscBtnKeydown} >
          <div className="page-content" >
            <div className="breadcrumbs">
              <div className="container">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link" href="#!">Main
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </a>
                  </li>
                  <li className="breadcrumbs__item">
                    <Link className="breadcrumbs__link" to='/'>Catalog
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </Link>
                  </li>
                  <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">{category} {name}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="page-content__section">
              <section className="product">
                <div className="container">
                  <div className="product__img">
                    <img src={previewImg} width="560" height="480" alt={name} />
                  </div>
                  <div className="product__content">
                    <h1 className="title title--h3">{category} {name}</h1>
                    <div className="rate product__rate">
                      {
                        RATING_NUMBERS.map((ratingNumber) => (
                          <svg width="17" height="16" aria-hidden="true" key={ratingNumber}>
                            <use xlinkHref={rating >= ratingNumber ? '#icon-full-star' : '#icon-star'}></use>
                          </svg>
                        ))
                      }
                      <p className="rate__count"><span style={{paddingRight: '8px'}}>Total reviews:</span>{reviewCount}</p>
                    </div>
                    <p className="product__price"><span className="visually-hidden">Price:</span>{separateNumbers(price)} $</p>
                    <button
                      className="btn btn--purple"
                      type="button"
                      onClick={() => handleAddToBasketBtnClick()}
                    >
                      <svg width="24" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-add-basket"></use>
                      </svg>Add to the cart
                    </button>
                    <div className="tabs product__tabs">
                      <div className="tabs__controls product__tabs-controls">
                        <Link
                          className={isSpecsLinkActive ? 'tabs__control is-active' : 'tabs__control'}
                          to={'?tab=specifications'}
                          onClick={() => handleSpecificationsLinkClick()}
                        >Characteristics
                        </Link>
                        <Link
                          className={isDescriptionLinkActive ? 'tabs__control is-active' : 'tabs__control'}
                          to={'?tab=description'}
                          onClick={() => handleDescriptionLinkClick()}
                          data-testid="link-description"
                        >Description
                        </Link>
                      </div>
                      <div className="tabs__content">
                        <div className={isSpecsLinkActive ? 'tabs__element is-active' : 'tabs__element'}>
                          <ul className="product__tabs-list">
                            <li className="item-list"><span className="item-list__title">Vendor code:</span>
                              <p className="item-list__text">{vendorCode}</p>
                            </li>
                            <li className="item-list"><span className="item-list__title">Matrix type:</span>
                              <p className="item-list__text">{matrix}</p>
                            </li>
                            <li className="item-list"><span className="item-list__title">Camera type:</span>
                              <p className="item-list__text">{type}</p>
                            </li>
                            <li className="item-list"><span className="item-list__title">Brand:</span>
                              <p className="item-list__text">{brand}</p>
                            </li>
                            <li className="item-list"><span className="item-list__title">Min / Max exposure:</span>
                              <p className="item-list__text">1/{exposure} / 30 s</p>
                            </li>
                            <li className="item-list"><span className="item-list__title">Min / Max ISO:</span>
                              <p className="item-list__text">100 / {iso}</p>
                            </li>
                          </ul>
                        </div>
                        <div className={isDescriptionLinkActive ? 'tabs__element is-active' : 'tabs__element'}>
                          <div className="product__tabs-text">
                            {description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="page-content__section" style={{marginTop: '100px'}}>

              { isReviewsSectionVisible && <Reviews reviews={reviews} openSendReviewModal={onSendReviewButonClick}/>}

            </div>
          </div>
          <button className="up-btn" onClick={() => handleUpButtonClick()}>
            <svg width="12" height="18" aria-hidden="true">
              <use xlinkHref="#icon-arrow2"></use>
            </svg>
          </button>

          { isSendReviewModalOpened &&
            <ReviewModal
              onCloseBtnOrOverlayClick={onCloseBtnOrOverlayClick}
              cameraId={id}
              isReviewModalOpened={isSendReviewModalOpened}
            /> }
          { isReviewSuccessModalOpened &&
            <ReviewSuccessModal
              onCloseBtnOrOverlayClick={onCloseBtnOrOverlayClick}
              isReviewSuccessModalOpened={isReviewSuccessModalOpened}
            /> }
          { isAddItemModalOpened &&
            <AddItemModal
              dataForAddItemModal={dataForAddItemModal}
              onCloseBtnOrOverlayClick={onCloseBtnOrOverlayClick}
              isModalOpened={isAddItemModalOpened}
              onAddToBasketBtnClick={onAddToBasketBtnClick}
            /> }
          { isAddItemSuccessModalOpened &&
            <AddItemSuccessModal
              onCloseBtnOrOverlayClick={onCloseBtnOrOverlayClick}
              isModalOpened={isAddItemSuccessModalOpened}
            /> }
        </main>

        <Footer/>

      </div>
    </>
  );
}

export default ProductScreen;
