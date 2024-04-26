interface Image {
  id: number;
  urls: { regular: string; small: string };
  description: string;
  likes: number;
  user: { name: string };
}

interface ImgInfo {
  srcImgModal: string;
  description: string;
  likes: number;
  author: string;
}
