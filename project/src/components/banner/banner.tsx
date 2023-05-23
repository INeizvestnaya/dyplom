import { Link } from 'react-router-dom';
import { PromoCamera } from '../../types';

type BannerProps = {
  promoCamera: PromoCamera | null;
}

function Banner(props: BannerProps):JSX.Element {
  if (props.promoCamera === null) {
    return <div/>;
  }

  const { id, name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = props.promoCamera;
  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`../${previewImgWebp}, ../${previewImgWebp2x} 2x`}/>
        <img src={`../${previewImg}`} srcSet={`../${previewImg2x} 2x`} width="1280" height="280" alt="баннер"/>
      </picture>
      <p className="banner__info">
        <span className="banner__message">New!</span>
        <span className="title title--h1">{name}</span>
        <span className="banner__text">Professional full frame camera from famous brand!</span>
        <Link className="btn" to={`/product/${id}?tab=specifications`}>More info</Link>
      </p>
    </div>
  );
}

export default Banner;
