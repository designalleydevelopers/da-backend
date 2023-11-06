import mongoose from "mongoose";

const S3SceneSchema = new mongoose.Schema({
    imageName:String,
    sceneName:String
})

const S3Scene = mongoose.model('S3Scene',S3SceneSchema);
export default S3Scene;