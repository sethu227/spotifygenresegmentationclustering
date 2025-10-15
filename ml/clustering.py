import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
import json, os

INPUT_CSV = os.path.join("..", "spotify.csv")
OUTPUT_JSON = os.path.join("..", "server", "data", "clustered_songs.json")
FEATURES = ["danceability","energy","loudness","speechiness","acousticness",
"instrumentalness","liveness","valence","tempo"]

df = pd.read_csv(INPUT_CSV).dropna(subset=FEATURES)
X_scaled = StandardScaler().fit_transform(df[FEATURES])
kmeans = KMeans(n_clusters=5, random_state=42, n_init=10)
df["cluster"] = kmeans.fit_predict(X_scaled)

out = [{
    "track_id": row.get("track_id", ""),
    "track_name": row.get("track_name", row.get("name", "")),
    "artist_name": row.get("track_artist", row.get("artist_name", row.get("artist", ""))),
    "playlist_genre": row.get("playlist_genre", None),
    "playlist_name": row.get("playlist_name", None),
    "features": {f: float(row[f]) for f in FEATURES},
    "cluster": int(row["cluster"])
} for _, row in df.iterrows()]

os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)
json.dump({"clusters": out}, open(OUTPUT_JSON,"w"), indent=2)
print(f"[+] Wrote {len(out)} clustered songs to {OUTPUT_JSON}")