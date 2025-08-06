import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import TrackCard from "./components/TrackCard";
import Modal from "./components/Modal";
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTrack, setselectedTrack] = useState(null);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCardClick = (track) => {
    setselectedTrack(track);
    window.scrollTo({top:0, behavior:"smooth"});
  };

  const closeModal = () => {
    setselectedTrack(null);
  };

  useEffect(() => {
    if (!searchTerm) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(searchTerm)}`,
          {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '29288478bdmsh8d7236a2e481977p1713e2jsn98a59a8ae3d4',
              'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Something went wrong with the API.');
        }

        const data = await response.json();
        setTracks(data.data);
        console.log(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className="container">
      <div className="background-overlay"></div>
      <h1>🎵 MusiX🎵 </h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="message">Loading...</p>}
      {error && <p className="message" style={{ color: 'red' }}>{error}</p>}

      <div className="track-list">
        {tracks.slice(0, 24).map((track) => (
          <TrackCard key={track.id} track={track} onClick={() => handleCardClick(track)} />
        ))}
      </div>
      {!loading && tracks.length === 0 && searchTerm && (
          <p className="message">🎧 No results found for “{searchTerm}”</p>
        )}


      {selectedTrack && (
        <Modal track={selectedTrack} onclose={closeModal} />
      )}
    </div>
  );
}

export default App;
