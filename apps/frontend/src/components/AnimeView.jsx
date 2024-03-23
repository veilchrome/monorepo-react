import React, { useState } from "react";
import Axios from "axios";

const AnimeView = () => {
  const [animeData, setAnimeData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await Axios.get(
        `http://localhost:3000/anime?q=${query}`
      );
      setAnimeData(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Anime Viewer</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for anime..."
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {animeData.length > 0 && (
        <div>
          <h2>Anime Information</h2>
          {animeData.map((anime) => (
            <div key={anime.mal_id}>
              <img src={anime.images.jpg.image_url} alt={anime.title}></img>
              <h3>{anime.title}</h3>
              <p>Source: {anime.source}</p>
              <p>Status: {anime.status}</p>
              <p>Rating: {anime.rating}</p>
              <p>Rank: {anime.rank}</p>
              <p>Popularity: {anime.popularity}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AnimeView;
