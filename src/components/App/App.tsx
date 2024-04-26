import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Loader } from "../Loader/Loader";
import { fetchImagesByQuery } from "../../services/api";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { ApiResponseType, ImageType, ImgInfoType } from "./types";

function App() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loadMoreBtn, setLoadMoreBtn] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [imgModalIsOpen, setImgModalIsOpen] = useState<boolean>(false);
  const [imgInfo, setImgInfo] = useState<ImgInfoType>({
    srcImgModal: "",
    description: "",
    likes: 0,
    author: "",
  });
  const per_page = 12;

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
        const response: ApiResponseType = await fetchImagesByQuery(
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

  const handleLoadMore = (): void => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleOnImgClick = (image: ImgInfoType) => {
    setImgInfo(image);
    openImgModal();
  };

  const openImgModal = (): void => {
    setImgModalIsOpen(true);
  };

  const closeImgModal = (): void => {
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
      <ImageModal
        onImgModalOpen={imgModalIsOpen}
        onImgModalClose={closeImgModal}
        {...imgInfo}
      />
    </div>
  );
}

export default App;
