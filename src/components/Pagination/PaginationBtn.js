import React from "react";

const PaginationBtn = ({ fn, iconClass, styles }) => {
  return (
    <button onClick={fn} className={styles.btn}>
      <i className={iconClass}></i>
    </button>
  );
};

export default PaginationBtn;
