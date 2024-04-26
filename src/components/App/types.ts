export interface ImageType {
  id: number;
  urls: { regular: string; small: string };
  description: string;
  likes: number;
  user: { name: string };
}

export interface ImgInfoType {
  srcImgModal: string;
  description: string;
  likes: number;
  author: string;
}

export interface ApiResponseType {
  total_pages: number;
  total: number;
  results: ImageType[];
}