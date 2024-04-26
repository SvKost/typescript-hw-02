import css from "./LoadMoreBtn.module.css";

type LoadMoreBtnProps = {
  onLoadMore: () => void;
};

const LoadMoreBtn = ({ onLoadMore }: LoadMoreBtnProps) => {
  return (
    <button className={css.loadMoreBtn} type="button" onClick={onLoadMore}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
