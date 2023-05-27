type CameraNew = {
  id: number;
  name: string;
  vendorCode: string;
  description: string;
  rating: number;
  price: number;
  previewImg: string;
  reviewCount: number;
  matrix: "crop" | "full frame";
  type: "slr" | "mirrorless";
  brand: "nikon" | "canon" | "sony";
  pixels: number;
  exposure: number;
  iso: number;
  weight: number;
};

export const shopData: CameraNew[] = [
  {
    id: 2,
    name: "Canon EOS 600D",
    vendorCode: "fb8943r92h",
    description: "",
    rating: 3.2,
    price: 900,
    previewImg:
      "https://jogjakamera.id/foto_produk/Canon_EOS_600D_thumb800.jpg",
    reviewCount: 4,
    matrix: "crop",
    type: "slr",
    brand: "canon",
    pixels: 36,
    exposure: 4000,
    iso: 25600,
    weight: 800,
  },
  {
    id: 1,
    name: "Nikon D5300",
    vendorCode: "eb94rhe2f",
    description: `The Nikon D5300 features a 24.2MP APS-C sensor coupled with the EXPEED 4 processing engine found in the D3300. However, the D5300 uses a sensor without a low-pass (anti-aliasing) filter, which offers the potential to capture images in more detail. It has a fully articulated 3.2″ LCD screen with 1,037k dots resolution.
        Despite its plastic body, the D5300 feels like a solid well-constructed camera with a comfortable grip. It’s some 20g lighter than its predecessor. Like the D7100, it’s not a professional-grade camera; however, it acquires a few features from it. This is something to be expected as the cost of the D7100 is significantly higher than the D5300.
        A pair of stereo microphones are placed on the top deck; since the D3300 only had the option for mono recording, this is a welcome addition. You will also find a speaker, auto pop-up flash, hot shoe, and a mode dial on top of the camera.
        There is a lever next to the mode dial that will help you quickly move into Live View. A red-dot video recording button sits on top of the grip along with the Info and Exposure Compensation buttons. The functionality of the Info button is similar to cameras from other brands. It wakes up the LCD and shows you the shooting info when D5300 is in rest mode.
        The optical viewfinder and the LCD, two critical DSLR components, are placed on the rear. The viewfinder has a 95-percent field of view, which is slightly dim. The 3.2-inch articulated LCD does well in direct sunlight once you increase the brightness. This articulated screen enables you to hold the camera at a variety of angles to easily capture creative shots.
        Above the LCD screen to the right of the viewfinder is an ‘i’ button, which can be used to access key shooting parameters ( ISO, white balance, exposure compensation, aperture, shutter speed, etc.) in the quick menu.
        `,
    rating: 3.5,
    price: 1000,
    previewImg:
      "https://avatars.mds.yandex.net/get-marketpic/1620218/market_CBI8BV0ruh1Y9RHxSqWKkA/orig",
    reviewCount: 4,
    matrix: "crop",
    type: "slr",
    brand: "nikon",
    pixels: 21,
    exposure: 4000,
    iso: 25600,
    weight: 720,
  },
  {
    id: 7,
    name: "Nikon D7100",
    vendorCode: "4w39832d981",
    description: "",
    rating: 5,
    price: 1150,
    previewImg:
      "https://photographypresets.com/wp-content/uploads/2016/06/Nikon-D7100-Pros-1.jpg.webp",
    reviewCount: 9,
    matrix: "crop",
    type: "slr",
    brand: "nikon",
    pixels: 46,
    exposure: 8000,
    iso: 25600,
    weight: 1020,
  },
  {
    id: 3,
    name: "Nikon D850",
    vendorCode: "34t3w98249",
    description: "",
    rating: 4.1,
    price: 2000,
    previewImg: "https://fscene.net/wp-content/uploads/2018/03/DSC_3986.jpg",
    reviewCount: 5,
    matrix: "full frame",
    type: "slr",
    brand: "nikon",
    pixels: 46,
    exposure: 8000,
    iso: 25600,
    weight: 1020,
  },
  {
    id: 4,
    name: "Sony A7",
    vendorCode: "4w39832d981",
    description: "",
    rating: 5,
    price: 2600,
    previewImg: "https://www.gearbooker.com/images/listing/00018516.jpg",
    reviewCount: 4,
    matrix: "full frame",
    type: "mirrorless",
    brand: "sony",
    pixels: 46,
    exposure: 8000,
    iso: 25600,
    weight: 1020,
  },
  {
    id: 5,
    name: "Nikon z6",
    vendorCode: "4w39832d981",
    description: "",
    rating: 5,
    price: 4300,
    previewImg:
      "https://sl-foto.ru/wa-data/public/shop/products/88/13/1388/images/1958/1958.970.jpg",
    reviewCount: 3,
    matrix: "full frame",
    type: "mirrorless",
    brand: "nikon",
    pixels: 46,
    exposure: 8000,
    iso: 25600,
    weight: 1020,
  },
  {
    id: 15,
    name: "Canon EOS 6D Mark II",
    vendorCode: "458t7338h42",
    description: "",
    rating: 4.3,
    price: 2300,
    previewImg:
      "https://photo-shop.by/pics/items/20210415130431691_Canon_6v_mark_II_body_1.jpg",
    reviewCount: 3,
    matrix: "full frame",
    type: "slr",
    brand: "canon",
    pixels: 46,
    exposure: 8000,
    iso: 25600,
    weight: 1020,
  },
  {
    id: 8,
    name: "Sony A860",
    vendorCode: "4w39832d981",
    description: "ky,jthyrtegrwefda",
    rating: 5,
    price: 1800,
    previewImg:
      "https://m.media-amazon.com/images/I/91d1c-SGgiL._AC_SL1500_.jpg",
    reviewCount: 1,
    matrix: "full frame",
    type: "mirrorless",
    brand: "sony",
    pixels: 46,
    exposure: 8000,
    iso: 25600,
    weight: 1020,
  },
  {
    id: 9,
    name: "Sony A860",
    vendorCode: "4w39832d981",
    description: "ky,jthyrtegrwefda",
    rating: 5,
    price: 1800,
    previewImg:
      "https://m.media-amazon.com/images/I/91d1c-SGgiL._AC_SL1500_.jpg",
    reviewCount: 1,
    matrix: "full frame",
    type: "mirrorless",
    brand: "sony",
    pixels: 46,
    exposure: 8000,
    iso: 25600,
    weight: 1020,
  },
  {
    id: 10,
    name: "Sony A860",
    vendorCode: "4w39832d981",
    description: "ky,jthyrtegrwefda",
    rating: 5,
    price: 1800,
    previewImg:
      "https://m.media-amazon.com/images/I/91d1c-SGgiL._AC_SL1500_.jpg",
    reviewCount: 1,
    matrix: "full frame",
    type: "mirrorless",
    brand: "sony",
    pixels: 46,
    exposure: 8000,
    iso: 25600,
    weight: 1020,
  },
  {
    id: 11,
    name: "Sony A860",
    vendorCode: "4w39832d981",
    description: "ky,jthyrtegrwefda",
    rating: 5,
    price: 1800,
    previewImg:
      "https://m.media-amazon.com/images/I/91d1c-SGgiL._AC_SL1500_.jpg",
    reviewCount: 1,
    matrix: "full frame",
    type: "mirrorless",
    brand: "sony",
    pixels: 46,
    exposure: 8000,
    iso: 25600,
    weight: 1020,
  },
];
