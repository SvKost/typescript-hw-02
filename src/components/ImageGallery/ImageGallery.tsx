import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

type Image = {
  id: number;
  urls: { regular: string; small: string };
  description: string;
  likes: number;
  user: { name: string };
};

interface ImgInfo {
  srcImgModal: string;
  description: string;
  likes: number;
  author: string;
}

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
