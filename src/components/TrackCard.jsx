import '../App.css';

function TrackCard({ track,onClick }) {
  return (
    <div className="track-card" onClick={onClick}>
      <img 
        src={track.album.cover_medium}
        alt={track.title}
        className="track-image"
      />

      <div className='track-info'>
        <h3 className='track-title'>{track.title}</h3>
        <p className='track-artist'>{track.artist.name}</p> {/* FIXED */}
      </div>
    </div>
  );
}

export default TrackCard;
