import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { Loader } from "./components/Loader/Loader";
import { fetchImagesByQuery } from "./services/api";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

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

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loadMoreBtn, setLoadMoreBtn] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [imgInfo, setImgInfo] = useState<ImgInfo | null>(null);
  const [imgModalIsOpen, setImgModalIsOpen] = useState<boolean>(false);
  const per_page: number = 12;

  const handleSearch = (query: string) => {
    if (query !== "" && query !== searchQuery) {
      setSearchQuery(query);
      setImages([]);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        setLoadMoreBtn(false);
        const response = await fetchImagesByQuery(
          currentPage,
          per_page,
          searchQuery
        );

        if (response.total === 0) {
          setImages([]);
          setIsError(true);
          setErrorMessage(
            "Sorry, nothing was found for your request! Please try something else!"
          );
        } else {
          setImages((prevImages) => [...prevImages, ...response.results]);

          {
            currentPage < response.total_pages
              ? setLoadMoreBtn(true)
              : setLoadMoreBtn(false);
          }
        }
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery !== "") fetchImages();
  }, [searchQuery, currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleOnImgClick = (image: ImgInfo) => {
    setImgInfo(image);
    openImgModal();
  };

  const openImgModal = () => {
    setImgModalIsOpen(true);
  };

  const closeImgModal = () => {
    setImgModalIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {isError && <ErrorMessage message={errorMessage} />}
      {images.length > 0 && (
        <ImageGallery images={images} onImgClick={handleOnImgClick} />
      )}
      {isLoading && <Loader />}
      {searchQuery !== "" && loadMoreBtn && (
        <LoadMoreBtn onLoadMore={handleLoadMore} />
      )}
      {
        <ImageModal
          onImgModalOpen={imgModalIsOpen}
          onImgModalClose={closeImgModal}
          srcImgModal={imgInfo?.srcImgModal || ""}
          description={imgInfo?.description || ""}
          likes={imgInfo?.likes || 0}
          author={imgInfo?.author || ""}
        />
      }
    </div>
  );
}

export default App;
