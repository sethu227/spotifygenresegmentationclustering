import axios from "axios";
const API="http://localhost:5000";
export const fetchCounts=()=>axios.get(API+"/api/songs/counts").then(r=>r.data);
export const fetchCluster=(id)=>axios.get(API+"/api/songs/cluster/"+id).then(r=>r.data);
export const fetchTrackPreview=(trackId)=>axios.get(API+"/api/spotify/track/"+trackId).then(r=>r.data);
export const fetchMultipleTrackPreviews=(trackIds)=>axios.post(API+"/api/spotify/tracks",{trackIds}).then(r=>r.data);