import { useRef } from "react";
import GistRow from "./GistRow";
import { useState } from "react";

const Gists = ({ gists }) => {
  const centerImage = useRef(null);
  const [items, setItems] = useState([]);

  const handleRowClick = (gist) => {
    //Decect which row i  clicked and store that in state so we can assign classes conditionally
    if (items.includes(gist)) {
      setItems((s) => s.filter((item) => item === gist));
    } else {
      setItems((s) => [gist]);
    }
    //I couldn't think of a better way in the moment but basicaly the idea is to assign fade in animation on click and then using timeout we assign fade out animation
    centerImage.current.classList.remove("fade-out");
    centerImage.current.src = gist.owner.avatar_url;
    //This line is to trigger the reflow again
    void centerImage.current.offsetWidth;
    centerImage.current.classList.add("fade-in");

    setTimeout(() => {
      centerImage.current.classList.remove("fade-in");
      void centerImage.current.offsetWidth;
      centerImage.current.classList.add("fade-out");
    }, 1000);
  };

  return (
    <main>
      <ul>
        {gists.map((gist) => (
          <GistRow
            key={gist.id}
            gist={gist}
            handleRowClick={handleRowClick}
            items={items}
          />
        ))}
      </ul>
      <img src="" className="center-image" ref={centerImage} alt="" />
    </main>
  );
};

export default Gists;
