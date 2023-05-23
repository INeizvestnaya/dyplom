import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { isTabKeyPressed } from '../../utils/utils';

const TAB_EVENT_CODE = 'Tab';

type GratitudeModalProps = {
  onCloseBtnOrOverlayClick: () => void;
  isModalOpened: boolean;
  onBackToShoppingBtnClick: () => void;
}

function GratitudeModal({ onCloseBtnOrOverlayClick, isModalOpened, onBackToShoppingBtnClick }: GratitudeModalProps): JSX.Element {
  const continueButtonRef = useRef<HTMLAnchorElement| null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isModalOpened === true) {
      continueButtonRef.current?.focus();
    }
  }, [isModalOpened]);

  //solution: https://hidde.blog/using-javascript-to-trap-focus-in-an-element/
  const handleShiftTabBtnsKeydown = (evt:React.KeyboardEvent<Element>) => {
    const isShiftTabBtnsPressed = (isTabKeyPressed(evt) || evt.code === TAB_EVENT_CODE) && evt.shiftKey;
    const isContinueBtnActiveElement = document.activeElement === continueButtonRef.current;

    if (isShiftTabBtnsPressed) {
      if (isModalOpened && isContinueBtnActiveElement) {
        closeButtonRef.current?.focus();
        evt.preventDefault();
      }
    }
  };

  const handleTabBtnKeydown = (evt:React.KeyboardEvent<Element>) => {
    const isShiftBtnPressed = evt.shiftKey;
    const isCloseBtnActiveElement = document.activeElement === closeButtonRef.current;

    if (isModalOpened && isTabKeyPressed(evt) && !isShiftBtnPressed) {
      if (isCloseBtnActiveElement) {
        continueButtonRef.current?.focus();
        evt.preventDefault();
      }
    }
  };

  const handleCloseBtnOrOverlayClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    onCloseBtnOrOverlayClick();
  };

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={(evt) => handleCloseBtnOrOverlayClick(evt)}
          data-testid={'modal-overlay'}
        >
        </div>
        <div className="modal__content">
          <p className="title title--h4">Thank you for choosing our shop!</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <Link
              to={AppRoute.Catalog}
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              ref={continueButtonRef}
              onClick={onBackToShoppingBtnClick}
              onKeyDown={handleShiftTabBtnsKeydown}
              data-testid={'back-to-shopping-btn'}
            >Back to shopping
            </Link>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={(evt) => handleCloseBtnOrOverlayClick(evt)}
            ref={closeButtonRef}
            onKeyDown={handleTabBtnKeydown}
            data-testid={'close-btn'}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default GratitudeModal;
