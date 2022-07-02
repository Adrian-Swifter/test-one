import { useState, useEffect } from "react";
import Gists from "./components/Gists/Gists";
import parseLinkHeader from "./utils/parseLinkHeader";
import "./App.css";
import Pagination from "./components/Pagination/Pagination";

function App() {
  const [gists, setGists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("https://api.github.com/gists/public?page=1");
  const [linkHeader, setLinkHeader] = useState(null);

  useEffect(() => {
    const getGists = async () => {
      setLoading(true);

      const response = await fetch(url);
      const resJson = await response.json();
      //Getting the URLs for pagination from Link headers
      const parsedLinkHeader = parseLinkHeader(response.headers.get("Link"));
      //Storing the last page number in session storage in case number of pages change while using the app
      if (parsedLinkHeader && parsedLinkHeader.last) {
        sessionStorage.setItem(
          "numOfPages",
          parsedLinkHeader.last.split("=")[1]
        );
      }
      setLinkHeader(parsedLinkHeader);
      setGists(resJson);
      setLoading(false);
    };

    getGists();

    const toID = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0 });
    }, 1500);

    return () => clearTimeout(toID);
  }, [url]);

  return (
    <div className="App">
      {loading ? (
        <h2 className="loading">Loading...</h2>
      ) : (
        <>
          <Gists gists={gists} loading={loading} />
          <Pagination linkHeader={linkHeader} setUrl={setUrl} url={url} />
        </>
      )}
    </div>
  );
}

export default App;
