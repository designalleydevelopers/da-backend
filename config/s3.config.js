import { S3Client } from "@aws-sdk/client-s3";
import dotenv from 'dotenv'
dotenv.config()
const s3 = new S3Client({
    credentials:{
        accessKeyId:process.env.ACCESS_KEY,
        secretAccessKey:process.env.SECTET_ACCESS_KEY
    },
    region:process.env.REGION_NAME
})

export default s3;