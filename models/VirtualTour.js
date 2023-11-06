import mongoose from "mongoose";
const hotspotSchema = new mongoose.Schema({
    type:String,
    link:String,
    hoverText:String,
    x:Number,
    y:Number,
    z:Number
})
const sceneSchema = new mongoose.Schema({
    imageName:String,
    sceneName:String,
    hotspots:[hotspotSchema]
})
const VirtualTourSchema = new mongoose.Schema(
    {
        tourName:{
            type:String,
            required:true,
            unique:true
        },
        scenes:[sceneSchema]
    }
)

const VirtualTour = mongoose.model('VirtualTour',VirtualTourSchema);
export default VirtualTour;