import React from "react";

const PageNumber = ({ pageNumber, currentPage }) => {
  return (
    <li>
      <span className={pageNumber === currentPage ? "highlight" : "link-color"}>
        {pageNumber}
      </span>
    </li>
  );
};

export default PageNumber;
