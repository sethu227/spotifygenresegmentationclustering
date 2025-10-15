import Song from "../models/Song.js";

export const getAllSongs = async (req,res)=>{
  try{res.json(await Song.find().limit(1000));}
  catch(e){res.status(500).json({message:e.message});}
};
export const getSongsByCluster = async (req,res)=>{
  try{res.json(await Song.find({cluster:parseInt(req.params.id)}).limit(500));}
  catch(e){res.status(500).json({message:e.message});}
};
export const getClusterCounts = async (req,res)=>{
  try{res.json(await Song.aggregate([{ $group:{_id:"$cluster",count:{ $sum:1}}},{ $sort:{_id:1}}]));}
  catch(e){res.status(500).json({message:e.message});}
};