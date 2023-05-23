import { useEffect, useRef } from 'react';
import { Camera } from '../../types';
import { isTabKeyPressed } from '../../utils/utils';

type DeleteItemModalProps = {
  dataForAddItemModal: Camera | undefined;
  onCloseBtnOrOverlayClick: () => void;
  isModalOpened: boolean;
  onDeleteBtnClick: () => void;
}

const TAB_EVENT_CODE = 'Tab';

function DeleteItemModal({dataForAddItemModal, onCloseBtnOrOverlayClick, isModalOpened, onDeleteBtnClick}: DeleteItemModalProps): JSX.Element | null {
  const deleteButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isModalOpened === true) {
      deleteButtonRef.current?.focus();
    }
  }, [isModalOpened]);

  if (dataForAddItemModal === undefined) {
    return null;
  }

  const { name, vendorCode, type, category, level, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = dataForAddItemModal;

  //solution: https://hidde.blog/using-javascript-to-trap-focus-in-an-element/
  const handleShiftTabBtnsKeydown = (evt:React.KeyboardEvent<Element>) => {
    const isShiftTabBtnsPressed = (isTabKeyPressed(evt) || evt.code === TAB_EVENT_CODE) && evt.shiftKey;
    const isDeleteBtnActiveElement = document.activeElement === deleteButtonRef.current;

    if (isShiftTabBtnsPressed) {
      if (isModalOpened && isDeleteBtnActiveElement) {
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
        deleteButtonRef.current?.focus();
        evt.preventDefault();
      }
    }
  };

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
          data-testid={'modal-overlay'}
        >
        </div>
        <div className="modal__content">
          <p className="title title--h4">Are you sure you want to delete this item?</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`../${previewImgWebp}, ../${previewImgWebp2x} 2x`}/>
                <img src={`../${previewImg}`} srcSet={`../${previewImg2x} 2x`} width="140" height="120" alt="Фотоаппарат «Орлёнок»"/>
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{`${category} «${name}»`}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Vendor code:</span> <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{type} {category.toLowerCase() === 'фотоаппарат' ? 'фотокамера' : 'видеокамера'}</li>
                <li className="basket-item__list-item">{level} level</li>
              </ul>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--half-width"
              type="button"
              ref={deleteButtonRef}
              onClick={onDeleteBtnClick}
              onKeyDown={handleShiftTabBtnsKeydown}
              data-testid={'delete-btn'}
            >Delete
            </button>
            <button
              className="btn btn--transparent modal__btn modal__btn--half-width"
              onClick={(evt) => handleCloseBtnOrOverlayClick(evt)}
              data-testid={'close-btn'}
            >Continue shopping
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={(evt) => handleCloseBtnOrOverlayClick(evt)}
            ref={closeButtonRef}
            onKeyDown={handleTabBtnKeydown}
            data-testid={'continue-btn'}
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

export default DeleteItemModal;

