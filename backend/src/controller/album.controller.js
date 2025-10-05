import Album from "../model/album.model.js";
export const getAllAlbums=async(req,res,next)=>{
    try {
        const albums = await Album.find(); // Assuming you have an Album model
        res.status(200).json(albums);
    }
    catch (error) {
        console.error("Error fetching albums:", error);
        res.status(500).json({ message: "Error fetching albums" });
    }
}
export const getAlbumById=async(req,res,next)=>{
    try{
        const {id}= req.params;
        console.log("id    ",id);
        const album= await Album.findById(id).populate("songs")// Assuming you have an Album model
    
        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }  
        res.status(200).json(album);
    }
    
    catch (error) {
        console.error("Error fetching album:", error);
        res.status(500).json({ message: "Error fetching album" }); 
    }
}