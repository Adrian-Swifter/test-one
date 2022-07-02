import { useState, useEffect } from "react";
import PageNumber from "./PageNumber";
import PaginationBtn from "./PaginationBtn";
import styles from "./Pagination.module.css";

const Pagination = ({ linkHeader, setUrl, url }) => {
  const [pageNumberLimit] = useState(2);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(2);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const currentPage = Number(url.split("=")[1]);
  const numOfPages = Number(sessionStorage.getItem("numOfPages"));
  const pages = [];
  //Loop so we create page numbers
  for (let i = 1; i <= numOfPages - 2; i++) {
    pages.push(i);
  }
  //Using state to move limits and to show 2 by 2 pages around the current one
  useEffect(() => {
    if (currentPage > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  });
  //We set the next and previous URLs which will trugger rerender and show next or previous page
  const loadPrevPage = () => {
    if (linkHeader.hasOwnProperty("prev")) {
      setUrl(linkHeader.prev);
    }
  };

  const loadNextPage = () => {
    if (linkHeader.hasOwnProperty("next")) {
      setUrl(linkHeader.next);
    }
  };
  //Here we render page numbers only if they are in the limits we set above
  const renderPageNumbers = pages.map((pageNumber) => {
    if (
      pageNumber < maxPageNumberLimit + 1 &&
      pageNumber > minPageNumberLimit
    ) {
      return (
        <PageNumber
          key={pageNumber}
          pageNumber={pageNumber}
          currentPage={currentPage}
        />
      );
    } else {
      return null;
    }
  });

  return (
    <footer className={styles.footer}>
      <ul className={styles.pagination}>
        {renderPageNumbers}
        <span className="link-color">{"..."}</span>
        {/*This is a little hack to show last 2 page numbers*/}
        <PageNumber
          pageNumber={numOfPages - 1}
          currentPage={currentPage}
          numOfPages={numOfPages}
        />
        <PageNumber
          pageNumber={numOfPages}
          currentPage={currentPage}
          numOfPages={numOfPages}
        />
      </ul>

      <PaginationBtn
        fn={loadPrevPage}
        iconClass="fa-solid fa-angle-left"
        styles={styles}
      />
      <PaginationBtn
        fn={loadNextPage}
        iconClass="fa-solid fa-angle-right"
        styles={styles}
      />
    </footer>
  );
};

export default Pagination;
