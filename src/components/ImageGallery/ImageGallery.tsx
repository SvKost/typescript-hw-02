import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: Image[];
  onImgClick: (image: ImgInfo) => void;
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
