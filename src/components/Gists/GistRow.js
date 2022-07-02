import React from "react";
import styles from "./Gists.module.css";

const GistRow = ({ gist, handleRowClick, items }) => {
  return (
    <li className={styles["gist-item"]} onClick={() => handleRowClick(gist)}>
      <span className={styles["avatar-wrapper"]}>
        <img
          src={gist.owner.avatar_url}
          className={`${styles.avatar} ${items.includes(gist) ? "darken" : ""}`}
          alt=""
        />
      </span>
      <p className={items.includes(gist) ? "link-color" : ""}>
        {Object.keys(gist.files)[0]}
      </p>
    </li>
  );
};

export default GistRow;
