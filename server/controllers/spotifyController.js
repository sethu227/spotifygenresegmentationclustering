import SpotifyWebApi from 'spotify-web-api-node';

// Initialize Spotify Web API (using client credentials flow)
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID || 'demo_client_id',
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET || 'demo_client_secret',
});

// Get access token
const getAccessToken = async () => {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);
    return data.body['access_token'];
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    // Return demo data if Spotify API is not available
    return null;
  }
};

export const getTrackPreview = async (req, res) => {
  try {
    const { trackId } = req.params;
    
    if (!trackId) {
      return res.status(400).json({ error: 'Track ID is required' });
    }

    const accessToken = await getAccessToken();
    
    if (!accessToken) {
      // Return demo data when Spotify API is not available
      return res.json({
        trackId: trackId,
        trackName: 'Demo Track',
        artistName: 'Demo Artist',
        previewUrl: null,
        externalUrl: `https://open.spotify.com/track/${trackId}`,
        albumImage: null,
        duration: 0
      });
    }

    const data = await spotifyApi.getTrack(trackId);
    const track = data.body;
    
    res.json({
      trackId: track.id,
      trackName: track.name,
      artistName: track.artists.map(artist => artist.name).join(', '),
      previewUrl: track.preview_url,
      externalUrl: track.external_urls.spotify,
      albumImage: track.album.images[0]?.url || null,
      duration: track.duration_ms
    });
  } catch (error) {
    console.error('Error fetching track preview:', error);
    // Return demo data on error
    res.json({
      trackId: req.params.trackId,
      trackName: 'Track Preview Unavailable',
      artistName: 'Unknown Artist',
      previewUrl: null,
      externalUrl: `https://open.spotify.com/track/${req.params.trackId}`,
      albumImage: null,
      duration: 0
    });
  }
};

export const getMultipleTrackPreviews = async (req, res) => {
  try {
    const { trackIds } = req.body;
    
    if (!trackIds || !Array.isArray(trackIds)) {
      return res.status(400).json({ error: 'Track IDs array is required' });
    }

    const accessToken = await getAccessToken();
    
    if (!accessToken) {
      // Return demo data when Spotify API is not available
      const demoResults = trackIds.map(trackId => ({
        trackId: trackId,
        trackName: 'Demo Track',
        artistName: 'Demo Artist',
        previewUrl: null,
        externalUrl: `https://open.spotify.com/track/${trackId}`,
        albumImage: null,
        duration: 0
      }));
      return res.json({ tracks: demoResults });
    }

    // Spotify API allows up to 50 tracks per request
    const chunks = [];
    for (let i = 0; i < trackIds.length; i += 50) {
      chunks.push(trackIds.slice(i, i + 50));
    }

    const results = [];
    for (const chunk of chunks) {
      try {
        const data = await spotifyApi.getTracks(chunk);
        const tracks = data.body.tracks;
        
        for (const track of tracks) {
          if (track) {
            results.push({
              trackId: track.id,
              trackName: track.name,
              artistName: track.artists.map(artist => artist.name).join(', '),
              previewUrl: track.preview_url,
              externalUrl: track.external_urls.spotify,
              albumImage: track.album.images[0]?.url || null,
              duration: track.duration_ms
            });
          }
        }
      } catch (chunkError) {
        console.error('Error fetching chunk of tracks:', chunkError);
        // Add demo data for failed chunks
        chunk.forEach(trackId => {
          results.push({
            trackId: trackId,
            trackName: 'Track Preview Unavailable',
            artistName: 'Unknown Artist',
            previewUrl: null,
            externalUrl: `https://open.spotify.com/track/${trackId}`,
            albumImage: null,
            duration: 0
          });
        });
      }
    }

    res.json({ tracks: results });
  } catch (error) {
    console.error('Error fetching multiple track previews:', error);
    // Return demo data on error
    const { trackIds } = req.body;
    const demoResults = trackIds.map(trackId => ({
      trackId: trackId,
      trackName: 'Track Preview Unavailable',
      artistName: 'Unknown Artist',
      previewUrl: null,
      externalUrl: `https://open.spotify.com/track/${trackId}`,
      albumImage: null,
      duration: 0
    }));
    res.json({ tracks: demoResults });
  }
};
