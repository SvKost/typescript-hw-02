import { FormEvent, useRef } from "react";
import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
import { IoSearchOutline } from "react-icons/io5";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const notify = () =>
    toast("Please enter your query!", {
      position: "top-right",
    });

  const queryRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const query = queryRef.current?.value.trim();

    {
      !query ? notify() : onSearch(query);
    }

    formRef.current?.reset();
  };

  return (
    <header className={css.header}>
      <form className={css.form} ref={formRef} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          ref={queryRef}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.button} type="submit">
          <IoSearchOutline />
        </button>
      </form>
      <Toaster />
    </header>
  );
};
export default SearchBar;
