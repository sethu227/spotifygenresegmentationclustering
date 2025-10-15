import React, { useState, useEffect } from "react";
import { fetchCounts, fetchCluster, fetchMultipleTrackPreviews } from "../api";
import AudioPlayer from "./AudioPlayer";

export default () => {
  const [counts, setCounts] = useState([]);
  const [songs, setSongs] = useState([]);
  const [sel, setSel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [trackPreviews, setTrackPreviews] = useState({});
  const [loadingPreviews, setLoadingPreviews] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(50);

  useEffect(() => {
    fetchCounts().then(setCounts);
  }, []);

  useEffect(() => {
    if (sel !== null) {
      setLoading(true);
      setTrackPreviews({});
      setDisplayLimit(50);
      fetchCluster(sel)
        .then(songsData => {
          console.log('Fetched songs data:', songsData);
          setSongs(songsData);
          
          const tracksWithId = songsData.filter(song => song.track_id);
          if (tracksWithId.length > 0) {
            setLoadingPreviews(true);
            const trackIds = tracksWithId.slice(0, 30).map(song => song.track_id);
            console.log('Fetching previews for track IDs:', trackIds);
            
            fetchMultipleTrackPreviews(trackIds)
              .then(previewData => {
                console.log('Received preview data:', previewData);
                const previewMap = {};
                previewData.tracks.forEach(track => {
                  previewMap[track.trackId] = track;
                });
                setTrackPreviews(previewMap);
              })
              .catch(error => {
                console.error('Error fetching track previews:', error);
              })
              .finally(() => setLoadingPreviews(false));
          }
        })
        .catch(error => {
          console.error('Error fetching cluster:', error);
        })
        .finally(() => setLoading(false));
    }
  }, [sel]);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e0533 0%, #110a1f 25%, #1a0b2e 50%, #2d1b4e 75%, #1e0533 100%)',
      padding: '40px 20px',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(138, 43, 226, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '8%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(75, 0, 130, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 10s ease-in-out infinite reverse'
      }}></div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-30px) translateX(20px); }
          }
          
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(138, 43, 226, 0.3), 0 0 40px rgba(138, 43, 226, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.05); }
            50% { box-shadow: 0 0 30px rgba(138, 43, 226, 0.5), 0 0 60px rgba(138, 43, 226, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.08); }
          }
          
          .glass-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .glass-card:hover {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(138, 43, 226, 0.4);
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 40px rgba(138, 43, 226, 0.3), 0 0 30px rgba(138, 43, 226, 0.2);
          }
          
          .royal-button {
            background: linear-gradient(135deg, #8a2be2 0%, #6a0dad 100%);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .royal-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s;
          }
          
          .royal-button:hover::before {
            left: 100%;
          }
          
          .royal-button:hover {
            background: linear-gradient(135deg, #9d4edd 0%, #7b2cbf 100%);
            box-shadow: 0 8px 25px rgba(138, 43, 226, 0.5);
            transform: translateY(-2px);
          }
          
          .song-row {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(10px);
            border-left: 3px solid transparent;
            transition: all 0.3s ease;
          }
          
          .song-row:hover {
            background: rgba(138, 43, 226, 0.08);
            border-left: 3px solid #8a2be2;
            transform: translateX(5px);
          }
        `}
      </style>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '50px',
          position: 'relative'
        }}>
          <h1 style={{ 
            color: 'transparent',
            background: 'linear-gradient(135deg, #ffffff 0%, #e0b3ff 50%, #c77dff 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            fontSize: '3.5em',
            fontWeight: '900',
            margin: '0 0 10px 0',
            letterSpacing: '2px',
            textShadow: '0 0 40px rgba(138, 43, 226, 0.5)',
            animation: 'glow 3s ease-in-out infinite'
          }}>
            ♔ Music Clusters ♔
          </h1>
          <div style={{
            height: '4px',
            width: '200px',
            background: 'linear-gradient(90deg, transparent, #8a2be2, transparent)',
            margin: '0 auto',
            borderRadius: '2px',
            boxShadow: '0 0 20px rgba(138, 43, 226, 0.8)'
          }}></div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '25px', 
          marginBottom: '50px' 
        }}>
          {counts.map(c => (
            <div 
              key={c._id}
              className="glass-card"
              style={{
                borderRadius: '20px',
                padding: '25px',
                cursor: 'pointer',
                boxShadow: sel === c._id 
                  ? '0 20px 50px rgba(138, 43, 226, 0.4), inset 0 0 30px rgba(138, 43, 226, 0.1)' 
                  : '0 8px 32px rgba(0, 0, 0, 0.3)',
                border: sel === c._id 
                  ? '2px solid rgba(138, 43, 226, 0.6)' 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                background: sel === c._id 
                  ? 'rgba(138, 43, 226, 0.15)' 
                  : 'rgba(255, 255, 255, 0.03)'
              }}
              onClick={() => setSel(c._id)}
            >
              <div style={{
                fontSize: '2.5em',
                textAlign: 'center',
                marginBottom: '15px',
                filter: 'drop-shadow(0 0 10px rgba(138, 43, 226, 0.6))'
              }}>
                ✦
              </div>
              <h3 style={{ 
                margin: '0 0 15px 0', 
                color: '#e0b3ff',
                fontSize: '1.4em',
                fontWeight: '700',
                textAlign: 'center',
                textShadow: '0 2px 10px rgba(138, 43, 226, 0.5)'
              }}>
                Cluster {c._id}
              </h3>
              <div style={{ 
                fontSize: '16px', 
                color: '#c9a9e0', 
                marginBottom: '20px',
                textAlign: 'center',
                fontWeight: '500'
              }}>
                {c.count} songs
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSel(c._id);
                }}
                className="royal-button"
                style={{
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '700',
                  width: '100%',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}
              >
                Explore
              </button>
            </div>
          ))}
        </div>

        {sel !== null && (
          <div className="glass-card" style={{
            borderRadius: '24px',
            padding: '35px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(138, 43, 226, 0.05)',
            animation: 'glow 4s ease-in-out infinite'
          }}>
            <h2 style={{ 
              color: 'transparent',
              background: 'linear-gradient(135deg, #ffffff 0%, #e0b3ff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              marginBottom: '30px',
              fontSize: '2em',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <span style={{ fontSize: '1.2em', filter: 'drop-shadow(0 0 10px rgba(138, 43, 226, 0.8))' }}>♛</span>
              Cluster {sel} Collection
            </h2>
            
            {loading ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '60px 20px',
                color: '#c9a9e0',
                fontSize: '18px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  border: '4px solid rgba(138, 43, 226, 0.2)',
                  borderTop: '4px solid #8a2be2',
                  borderRadius: '50%',
                  margin: '0 auto 20px',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                Loading your music...
              </div>
            ) : (
              <div style={{ 
                maxHeight: '600px', 
                overflowY: 'auto',
                borderRadius: '16px',
                padding: '5px'
              }}>
                <style>
                  {`
                    div::-webkit-scrollbar {
                      width: 12px;
                    }
                    div::-webkit-scrollbar-track {
                      background: rgba(255, 255, 255, 0.02);
                      border-radius: 10px;
                    }
                    div::-webkit-scrollbar-thumb {
                      background: linear-gradient(180deg, #8a2be2, #6a0dad);
                      border-radius: 10px;
                      border: 2px solid rgba(255, 255, 255, 0.05);
                    }
                    div::-webkit-scrollbar-thumb:hover {
                      background: linear-gradient(180deg, #9d4edd, #7b2cbf);
                    }
                  `}
                </style>
                {songs.length === 0 ? (
                  <div style={{ 
                    textAlign: 'center', 
                    color: '#c9a9e0',
                    padding: '40px',
                    fontSize: '16px'
                  }}>
                    No songs found in this cluster
                  </div>
                ) : (
                  <div>
                    {loadingPreviews && (
                      <div style={{ 
                        textAlign: 'center', 
                        padding: '15px', 
                        color: '#e0b3ff',
                        fontSize: '15px',
                        background: 'rgba(138, 43, 226, 0.15)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        marginBottom: '20px',
                        border: '1px solid rgba(138, 43, 226, 0.3)',
                        fontWeight: '600'
                      }}>
                        🎵 Loading audio previews...
                      </div>
                    )}
                    
                    <div style={{ padding: '0' }}>
                      {songs.slice(0, displayLimit).map((s, i) => {
                        const preview = s.track_id ? trackPreviews[s.track_id] : null;
                        return (
                          <div 
                            key={i}
                            className="song-row"
                            style={{
                              padding: '20px',
                              borderRadius: '12px',
                              marginBottom: '12px',
                            }}
                          >
                            <div style={{ 
                              fontWeight: '700', 
                              color: '#ffffff', 
                              marginBottom: '8px',
                              fontSize: '16px',
                              textShadow: '0 2px 8px rgba(138, 43, 226, 0.3)'
                            }}>
                              {s.track_name}
                            </div>
                            <div style={{ 
                              fontSize: '14px', 
                              color: '#c9a9e0', 
                              marginBottom: '10px',
                              fontWeight: '500'
                            }}>
                              {s.artist_name || 'Unknown Artist'}
                            </div>
                            <div style={{ 
                              fontSize: '12px', 
                              color: '#9d7ab5', 
                              marginBottom: '15px',
                              display: 'flex',
                              gap: '15px',
                              flexWrap: 'wrap'
                            }}>
                              <span style={{
                                background: 'rgba(138, 43, 226, 0.2)',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                border: '1px solid rgba(138, 43, 226, 0.3)'
                              }}>
                                🎸 {s.playlist_genre}
                              </span>
                              <span style={{
                                background: 'rgba(138, 43, 226, 0.2)',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                border: '1px solid rgba(138, 43, 226, 0.3)'
                              }}>
                                📀 {s.playlist_name}
                              </span>
                            </div>
                            
                            {s.track_id && (
                              <AudioPlayer
                                trackId={s.track_id}
                                trackName={s.track_name}
                                artistName={s.artist_name}
                                previewUrl={preview?.previewUrl}
                                albumImage={preview?.albumImage}
                              />
                            )}
                            
                            {s.track_id && !preview && !loadingPreviews && (
                              <div style={{
                                padding: '12px',
                                background: 'rgba(255, 193, 7, 0.1)',
                                border: '1px solid rgba(255, 193, 7, 0.3)',
                                borderRadius: '10px',
                                fontSize: '13px',
                                color: '#ffd54f',
                                fontWeight: '500'
                              }}>
                                Preview unavailable - <a 
                                  href={`https://open.spotify.com/track/${s.track_id}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ 
                                    color: '#1db954', 
                                    textDecoration: 'none',
                                    fontWeight: '700',
                                    textShadow: '0 0 10px rgba(29, 185, 84, 0.5)'
                                  }}
                                >
                                  Open in Spotify ↗
                                </a>
                              </div>
                            )}
                          </div>
                        );
                      })}
                      
                      {songs.length > displayLimit && (
                        <div style={{
                          textAlign: 'center',
                          padding: '25px',
                          background: 'rgba(255, 255, 255, 0.02)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '16px',
                          marginTop: '20px',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                          <div style={{ 
                            marginBottom: '15px', 
                            color: '#c9a9e0', 
                            fontSize: '15px',
                            fontWeight: '600'
                          }}>
                            Showing {displayLimit} of {songs.length} total songs
                          </div>
                          <button
                            onClick={() => setDisplayLimit(prev => Math.min(prev + 50, songs.length))}
                            className="royal-button"
                            style={{
                              color: 'white',
                              border: 'none',
                              padding: '14px 32px',
                              borderRadius: '12px',
                              cursor: 'pointer',
                              fontSize: '15px',
                              fontWeight: '700',
                              letterSpacing: '1px'
                            }}
                          >
                            Load More ✦ ({Math.min(50, songs.length - displayLimit)} more)
                          </button>
                        </div>
                      )}
                      
                      {songs.length <= displayLimit && songs.length > 30 && (
                        <div style={{
                          textAlign: 'center',
                          padding: '20px',
                          color: '#c9a9e0',
                          fontSize: '14px',
                          background: 'rgba(255, 255, 255, 0.02)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '12px',
                          marginTop: '20px',
                          fontWeight: '600'
                        }}>
                          ✦ Showing all {songs.length} songs in this cluster ✦
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}