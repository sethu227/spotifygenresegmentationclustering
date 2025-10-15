# 🎵 Spotify Genre Segmentation & Clustering

A full-stack web application that uses machine learning to cluster Spotify songs based on their audio features, allowing users to discover similar music across different genres.

## 🚀 Features

- **Machine Learning Clustering**: Uses K-Means algorithm to group songs by audio similarity
- **Interactive Web Interface**: Browse and explore music clusters
- **Audio Preview**: 30-second preview playback for songs (when available)
- **Real-time Data**: MongoDB integration for fast data retrieval
- **Responsive Design**: Modern UI with Spotify-inspired design

## 🏗️ Tech Stack

### Frontend
- **React** with Vite
- **Axios** for API calls
- **Custom Audio Player** component

### Backend
- **Node.js** with Express
- **MongoDB** for data storage
- **Spotify Web API** integration

### Machine Learning
- **Python** with scikit-learn
- **K-Means Clustering** on 9 audio features
- **Pandas** for data processing

## 📊 Dataset

The application uses a dataset of **32,833 songs** across **6 genres**:
- EDM (6,043 songs)
- Rap (5,746 songs)
- Pop (5,507 songs)
- R&B (5,431 songs)
- Latin (5,155 songs)
- Rock (4,951 songs)

## 🧠 ML Clustering Results

The algorithm creates **5 clusters** based on audio similarity:

- **Cluster 0**: Electronic/Rock Mix (EDM + Rock dominant)
- **Cluster 1**: Latin/Pop/R&B Mix (Latin + Pop dominant)
- **Cluster 2**: R&B/Rock Mix (R&B + Rock dominant)
- **Cluster 3**: EDM/Dance Mix (EDM dominant)
- **Cluster 4**: Rap/Hip-Hop Mix (Rap dominant)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sethu227/spotifygenresegmentationclustering.git
cd spotifygenresegmentationclustering
```

2. **Install backend dependencies**
```bash
cd server
npm install
```

3. **Install frontend dependencies**
```bash
cd ../client
npm install
```

4. **Generate clustered data**
```bash
cd ../ml
pip install pandas scikit-learn numpy
python clustering.py
```

5. **Set up environment variables**
Create a `.env` file in the server directory:
```env
MONGODB_URI=mongodb://localhost:27017/spotifydb
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

6. **Seed the database**
```bash
cd ../server
node seed.js
```

7. **Start the application**
```bash
# Terminal 1 - Start backend
npm start

# Terminal 2 - Start frontend
cd ../client
npm run dev
```

## 🌐 Deployment

### Render Deployment

1. **Backend (Render Web Service)**
   - Connect your GitHub repository
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
   - Environment Variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `SPOTIFY_CLIENT_ID`: Your Spotify API client ID
     - `SPOTIFY_CLIENT_SECRET`: Your Spotify API client secret

2. **Frontend (Render Static Site)**
   - Connect your GitHub repository
   - Build Command: `cd client && npm install && npm run build`
   - Publish Directory: `client/dist`

## 📁 Project Structure

```
spotify-genre-segmentation/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── api.js         # API calls
│   │   └── main.jsx       # App entry point
│   └── package.json
├── server/                # Node.js backend
│   ├── controllers/       # API controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── data/             # Clustered data
│   └── server.js         # Express server
├── ml/                   # Machine Learning
│   ├── clustering.py     # K-Means clustering script
│   └── requirements.txt
└── spotify.csv          # Original dataset
```

## 🎯 API Endpoints

- `GET /api/songs/counts` - Get cluster counts
- `GET /api/songs/cluster/:id` - Get songs in a cluster
- `GET /api/spotify/track/:id` - Get track preview
- `POST /api/spotify/tracks` - Get multiple track previews

## 🔧 Configuration

### Spotify API Setup
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Get your Client ID and Client Secret
4. Add them to your environment variables

### MongoDB Setup
- **Local**: Install MongoDB locally
- **Cloud**: Use MongoDB Atlas (recommended for deployment)

## 📈 Performance

- **Data Processing**: 32K+ songs processed in seconds
- **API Response**: Sub-100ms response times
- **Frontend**: Optimized with lazy loading and pagination
- **Audio Streaming**: 30-second previews with fallback handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Spotify for providing the audio features API
- Scikit-learn for machine learning capabilities
- React and Node.js communities for excellent tooling

---

**Live Demo**: [Your Render deployment URL]
**GitHub**: https://github.com/sethu227/spotifygenresegmentationclustering
