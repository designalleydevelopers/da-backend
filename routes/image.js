import express from "express";
import crypto from 'crypto'

import { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import upload from "../config/multer.config.js";
import s3 from "../config/s3.config.js";
import S3Scene from "../models/S3Scene.js";

const router = express.Router();

router.get('/',async (req,res)=>{
    try{
        const s3Scene = await S3Scene.find()
        var Urls = []
        for(var i=0;i<s3Scene.length;i++){
            var imageName = s3Scene[i].imageName
            const getObjectParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: imageName
            };
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

            Urls.push({'url':url,'imageId':s3Scene[i].imageName,'sceneName':s3Scene[i].sceneName});
        }
        return res.json(Urls)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
})
router.get('/:key',async (req,res) => {
    try{
        const key = req.params.key
        const getObjectParams = {
            Bucket: process.env.BUCKET_NAME,
            Key:key
        };
        const command = new GetObjectCommand(getObjectParams)
        const url = await getSignedUrl(s3,command,{expiresIn:3600})
        return res.json({url:url})
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
})
router.post("/upload",upload.single('image'), async (req,res)=>{
    try{
        const key = crypto.randomBytes(16).toString('hex')
        const sceneName = req.body.sceneName
        const params = {
            Bucket:process.env.BUCKET_NAME,
            Key:key,
            Body:req.file.buffer,
            ContentType:req.file.mimetype
        }
        const command = new PutObjectCommand(params)
        await s3.send(command)        

        const s3Image = new S3Scene({
            imageName:key,
            sceneName:sceneName
        })
        const savedS3Image = await s3Image.save()
        return res.status(200).json(savedS3Image)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
})

router.delete('/:id',async (req,res)=>{
    const id = req.params
    return res.json({"Deleted":"Yes"})
})
export default router;