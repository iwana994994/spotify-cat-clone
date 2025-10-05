import Song from "../model/song.model.js"
export const getAllSongs= async(req, res) => {
    try{
        const songs= await Song.find();
        res.status(200).json(songs);
    }
    catch (error) {
        console.error("Error fetching songs:", error);
        res.status(500).json({ message: "Error fetching songs" });
    }
}

export const getFeaturedSongs = async(req, res) => {
    try{
 const songs = await Song.aggregate([
  { $sample: { size: 6 } }, 
  { $project: {              
      title: 1,
      artist: 1,
      imageUrl: 1,
      audioUrl: 1
  }}
]);

    res.status(200).json(songs);}
    catch (error) {

        console.error("Error fetching featured songs:", error);
        res.status(500).json({ message: "Error fetching featured songs" });
    }
}

export const getMadeForYouSongs =async (req, res) => {
  try{
     const songs = await Song.aggregate([
  { $sample: { size: 4 } }, 
  { $project: {              
      title: 1,
      artist: 1,
      imageUrl: 1,
      audioUrl: 1
  }}
]);

    res.status(200).json(songs);     }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching trending songs" });
    }      
}

export const getTrendingSongs = async(req, res) => {
    try{
     const songs = await Song.aggregate([
  { $sample: { size: 4 } }, 
  { $project: {              
      title: 1,
      artist: 1,
      imageUrl: 1,
      audioUrl: 1
  }}
]);

    res.status(200).json(songs);     }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching trending songs" });
    }      

}
