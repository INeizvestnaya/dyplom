type Camera = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  category: string;
  description: string;
  level: string;
  rating: number;
  price: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  reviewCount: number;
}

type CameraNew = {
  id: number;
  name: string;
  vendorCode: string;
  description: string;
  rating: number;
  price: number;
  previewImg: string;
  reviewCount: number;

  type: 'camera' | 'lens' | 'tripod' | 'light';

  matrix: 'crop' | 'full frame';
  cameraType: 'slr' | 'mirrorless';
  brand: 'nikon' | 'canon' | 'sony';

  diafragm: string;
  focusDistance: number;
  brandLens: 'nikon' | 'canon' | 'sony' | 'sigma' | 'tamron';

  height: number;

  lightType: 'flash' | 'lamp';
}

export default Camera;
