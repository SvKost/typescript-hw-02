import ImageCard from "../ImageCard/ImageCard";
import { ImageType, ImgInfoType } from "../App/types";
import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: ImageType[];
  onImgClick: (image: ImgInfoType) => void;
}

const ImageGallery = ({ images, onImgClick }: ImageGalleryProps) => {
  return (
    <div>
      <ul className={css.imgGallery}>
        {images.map((image) => {
          return (
            <li key={image.id}>
              <ImageCard image={image} onImgClick={onImgClick} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ImageGallery;
