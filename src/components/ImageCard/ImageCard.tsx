import css from "./ImageCard.module.css";

interface ImageCardProps {
  image: Image;
  onImgClick: (image: ImgInfo) => void;
}

const ImageCard = ({ image, onImgClick }: ImageCardProps) => {
  const imgInfo = {
    srcImgModal: image.urls.regular,
    description: image.description,
    likes: image.likes,
    author: image.user.name,
  };

  return (
    <div className={css.imageCard}>
      <img
        onClick={() => onImgClick(imgInfo)}
        width="400"
        src={image.urls.small}
        alt={image.description}
      />
    </div>
  );
};

export default ImageCard;
