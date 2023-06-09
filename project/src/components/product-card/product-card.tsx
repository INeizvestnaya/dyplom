import { Camera } from '../../types';
import { Link } from 'react-router-dom';
import { separateNumbers } from '../../utils/utils';
import { RATING_NUMBERS } from '../../consts';
import './product-card.css';

type ProductCardProps = {
  cameraData: Camera;
  onClick?:(id:number) => void;
  isActive?: boolean;
  basketProductsIdentifiers?: number[];
}

function ProductCard(props: ProductCardProps):JSX.Element {
  const { id, name, rating, price, category, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount, type } = props.cameraData;
  const isCameraInBasket = props.basketProductsIdentifiers?.includes(id);
console.log(previewImg)
  return (
    <div className={props.isActive ? 'product-card is-active' : 'product-card'}>
      <div className="product-card__img">
        <img src={previewImg} width="280" height="280" alt={name} />
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {
            RATING_NUMBERS.map((ratingNumber) => (
              <svg width="17" height="16" aria-hidden="true" key={ratingNumber}>
                <use xlinkHref={rating >= ratingNumber ? '#icon-full-star' : '#icon-star'}></use>
              </svg>
            ))
          }
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Price:</span>{separateNumbers(price)} $
        </p>
      </div>
      <div className="product-card__buttons">
        {!isCameraInBasket &&
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={() => props.onClick ? props.onClick(id) : null}
        >
          Buy
        </button>}
        {isCameraInBasket &&
        <button
          className="btn btn--purple-border product-card__btn"
          type="button"
        >
          <span>In the cart</span>
          <img
            src='../img/sprite/icon-basket-purple.svg'
            alt='icon-basket'
            className='product-card__btn-icon'
          >
          </img>
        </button>}
        <Link className="btn btn--transparent" to={`/product/${id}?tab=specifications`}>More
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
