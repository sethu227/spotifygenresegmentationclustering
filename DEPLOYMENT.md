# 🚀 Deployment Guide for Spotify Genre Segmentation

This guide will help you deploy your Spotify Genre Segmentation application on Render.

## 📋 Prerequisites

1. **GitHub Repository**: Your code should be pushed to GitHub
2. **MongoDB Database**: Set up MongoDB Atlas (cloud database)
3. **Spotify API Credentials**: Get Spotify Web API credentials
4. **Render Account**: Sign up at [render.com](https://render.com)

## 🔧 Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user
4. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

## 🎵 Step 2: Get Spotify API Credentials

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in the details:
   - App name: "Spotify Genre Segmentation"
   - App description: "Music clustering app"
5. After creation, note down:
   - **Client ID**
   - **Client Secret**

## 🌐 Step 3: Deploy Backend on Render

1. **Go to Render Dashboard**
   - Visit [render.com](https://render.com)
   - Sign in with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `sethu227/spotifygenresegmentationclustering`

3. **Configure Backend Service**
   ```
   Name: spotify-backend
   Environment: Node
   Build Command: cd server && npm install
   Start Command: cd server && npm start
   ```

4. **Set Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/spotifydb
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note down the backend URL (e.g., `https://spotify-backend.onrender.com`)

## 🎨 Step 4: Deploy Frontend on Render

1. **Create New Static Site**
   - Click "New +" → "Static Site"
   - Connect your GitHub repository

2. **Configure Frontend**
   ```
   Name: spotify-frontend
   Build Command: cd client && npm install && npm run build
   Publish Directory: client/dist
   ```

3. **Set Environment Variables**
   ```
   VITE_API_URL=https://spotify-backend.onrender.com
   ```

4. **Deploy**
   - Click "Create Static Site"
   - Wait for deployment to complete
   - Your app will be live at the provided URL!

## 🔄 Step 5: Update and Push Changes

After making the deployment configuration changes:

```bash
git add .
git commit -m "Add deployment configuration for Render"
git push origin main
```

## 🌍 Step 6: Seed Production Database

Once your backend is deployed, you need to seed the production database:

1. **Option 1: Local seeding to production**
   ```bash
   # Update server/seed.js to use production MongoDB URI
   MONGODB_URI=your_production_mongodb_uri node server/seed.js
   ```

2. **Option 2: Add seeding endpoint**
   - Add a `/api/seed` endpoint to your backend
   - Call it once to populate the database

## 🔍 Step 7: Test Your Deployment

1. **Backend Health Check**
   - Visit: `https://your-backend-url.onrender.com/api/songs/counts`
   - Should return cluster counts JSON

2. **Frontend Test**
   - Visit your frontend URL
   - Click on clusters to see songs
   - Test audio previews

## 🚨 Troubleshooting

### Common Issues:

1. **Backend Won't Start**
   - Check environment variables are set correctly
   - Ensure MongoDB URI is valid
   - Check build logs in Render dashboard

2. **Frontend Can't Connect to Backend**
   - Verify `VITE_API_URL` is set to your backend URL
   - Check CORS settings in backend
   - Ensure backend is running

3. **Database Connection Issues**
   - Verify MongoDB Atlas cluster is running
   - Check IP whitelist in MongoDB Atlas (add 0.0.0.0/0 for Render)
   - Verify database user has correct permissions

4. **Audio Previews Not Working**
   - This is normal without Spotify API credentials
   - Users can still use "Open in Spotify" links

## 📊 Environment Variables Summary

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/spotifydb
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
NODE_ENV=production
```

### Frontend (Render Environment)
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## 🎉 Success!

Your Spotify Genre Segmentation app should now be live and accessible to users worldwide!

**Frontend URL**: `https://your-frontend-url.onrender.com`
**Backend URL**: `https://your-backend-url.onrender.com`

## 📈 Next Steps

1. **Monitor Performance**: Check Render dashboard for usage metrics
2. **Add Custom Domain**: Configure custom domain in Render
3. **Set up Monitoring**: Add error tracking and analytics
4. **Optimize**: Implement caching and performance optimizations
