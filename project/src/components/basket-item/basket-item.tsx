import React, { useState } from 'react';
import { Camera, Order } from '../../types';
import { separateNumbers, isEnterKeyPressed, isTabKeyPressed } from '../../utils/utils';
import { setOrderData } from '../../store/site-data/site-data';
import { useAppDispatch } from '../../hooks';
import './basket-item.css';

type BasketItemProps = {
  cameraData: Camera;
  orderData: Order;
  onClick:(id:number) => void;
}

enum PriceLength {
  Min = 0,
  Max = 2,
}

enum ProductsAmount {
  Min = 1,
  Max = 99,
}

const AMOUNT_ITEMS_TO_CUT = 1;

function BasketItem(props: BasketItemProps):JSX.Element {
  const { id, name, vendorCode, level, type, price, category, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = props.cameraData;
  const { amounts, identifiers, prices } = props.orderData;
  const dispatch = useAppDispatch();
  const [amountCounterInputValue, setAmountCounterInputValue] = useState<string | undefined>('');
  const itemsAmount = amounts[identifiers.indexOf(id)];
  const disableReduceBtn = itemsAmount === ProductsAmount.Min;
  const disableincreaseBtn = itemsAmount === ProductsAmount.Max;

  const handleItemsCounterInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const currentValue = evt.target.value.replace(/^0/, '').replace(/\D/g,'').substring(PriceLength.Min, PriceLength.Max);

    setAmountCounterInputValue(currentValue);
  };

  const handleItemsCounterInputFocus = () => {
    setAmountCounterInputValue(String(itemsAmount));
  };

  const handleItemsCounterInputKeydown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (isTabKeyPressed(evt)) {
      setAmountCounterInputValue(String(itemsAmount));
    }

    if (isEnterKeyPressed(evt)) {
      const copiedAmounts = [...amounts];
      const indexOfAmount = identifiers.indexOf(id);
      copiedAmounts.splice(indexOfAmount, AMOUNT_ITEMS_TO_CUT, Number(amountCounterInputValue));

      dispatch(setOrderData({
        amounts: [...copiedAmounts],
        identifiers: [...identifiers],
        prices: [...prices],
      }));
    }
  };

  const handleItemsCounterInputBlur = () => {
    setAmountCounterInputValue(String(itemsAmount));
  };

  const handleDecrementBtnClick = () => {
    const copiedAmounts = [...amounts];
    const indexOfAmount = identifiers.indexOf(id);
    const newAmount = copiedAmounts[indexOfAmount] - 1;
    copiedAmounts.splice(indexOfAmount, AMOUNT_ITEMS_TO_CUT, newAmount);

    dispatch(setOrderData({
      amounts: [...copiedAmounts],
      identifiers: [...identifiers],
      prices: [...prices],
    }));
    setAmountCounterInputValue(String(newAmount));
  };

  const handleIncrementBtnClick = () => {
    const copiedAmounts = [...amounts];
    const indexOfAmount = identifiers.indexOf(id);
    const newAmount = copiedAmounts[indexOfAmount] + 1;
    copiedAmounts.splice(indexOfAmount, AMOUNT_ITEMS_TO_CUT, newAmount);

    dispatch(setOrderData({
      amounts: [...copiedAmounts],
      identifiers: [...identifiers],
      prices: [...prices],
    }));
    setAmountCounterInputValue(String(newAmount));
  };

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <img src={previewImg} width="140" height="120" alt="Фотоаппарат «Орлёнок»"/>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Vendor code:</span> <span className="basket-item__number">{vendorCode}</span>
          </li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Price:</span>{separateNumbers(price)} $</p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          disabled={disableReduceBtn}
          onClick={handleDecrementBtnClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor={`counter-${id}`}></label>
        <input
          type="text"
          id={`counter-${id}`}
          aria-label="количество товара"
          placeholder={String(itemsAmount)}
          value={amountCounterInputValue}
          onChange={handleItemsCounterInputChange}
          onFocus={handleItemsCounterInputFocus}
          onKeyDown={handleItemsCounterInputKeydown}
          onBlur={handleItemsCounterInputBlur}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          disabled={disableincreaseBtn}
          onClick={handleIncrementBtnClick}
          data-testid={'increase-btn'}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Full price:</span>{separateNumbers(itemsAmount * price)} $</div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={() => props.onClick(id)}
        data-testid={'delete-item-btn'}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default BasketItem;
