import { Camera } from '../../types';
import { separateNumbers } from '../../utils/utils';
import React, { useRef, useEffect } from 'react';
import { isTabKeyPressed } from '../../utils/utils';

type AddItemModalProps = {
  dataForAddItemModal?: Camera | null;
  onCloseBtnOrOverlayClick: () => void;
  isModalOpened: boolean;
  onAddToBasketBtnClick?: (id: number) => void;
}

function AddItemModal({dataForAddItemModal, onCloseBtnOrOverlayClick, isModalOpened, onAddToBasketBtnClick}: AddItemModalProps): JSX.Element | null {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const addInBasketButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isModalOpened === true) {
      addInBasketButtonRef.current?.focus();
    }
  }, [isModalOpened]);

  //the solution: https://hidde.blog/using-javascript-to-trap-focus-in-an-element/
  const handleTabBtnKeydown = (evt:React.KeyboardEvent<Element>) => {
    const isCloseBtnActiveElement = document.activeElement === closeButtonRef.current;
    const isAddInBasketBtnActiveElement = document.activeElement === addInBasketButtonRef.current;
    const isBtnElementsNotEmpty = closeButtonRef.current !== null && addInBasketButtonRef.current !== null;

    if (isModalOpened === true && isTabKeyPressed(evt) && isBtnElementsNotEmpty) {
      if (isCloseBtnActiveElement) {
        addInBasketButtonRef.current?.focus();
        evt.preventDefault();
      }

      if (isAddInBasketBtnActiveElement) {
        closeButtonRef.current?.focus();
        evt.preventDefault();
      }
    }
  };

  if (dataForAddItemModal === undefined || dataForAddItemModal === null || onAddToBasketBtnClick === undefined) {
    return null;
  }

  const { id, name, vendorCode, price, type, category, level, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = dataForAddItemModal;

  const handleCloseBtnOrOverlayClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    onCloseBtnOrOverlayClick();
  };

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={(evt) => handleCloseBtnOrOverlayClick(evt)}
        >
        </div>
        <div className="modal__content">
          <p className="title title--h4">Add to the cart</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <img src={previewImg}width="140" height="120" alt={name}/>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Vendor code:</span> <span className="basket-item__number">{vendorCode}</span>
                </li>
              </ul>
              <p className="basket-item__price"><span className="visually-hidden">Price:</span>{separateNumbers(price)} $</p>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              ref={addInBasketButtonRef}
              onKeyDown={handleTabBtnKeydown}
              onClick={() => onAddToBasketBtnClick(id)}
            >
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Add
            </button>
          </div>
          <button
            ref={closeButtonRef}
            onKeyDown={handleTabBtnKeydown}
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            data-testid="close-btn"
            onClick={(evt) => handleCloseBtnOrOverlayClick(evt)}
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

export default AddItemModal;
