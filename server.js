import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import serverless from "serverless-http"
import authRoutes from "./routes/auth.js"
import imageRoutes from "./routes/image.js"
import tourRoutes from "./routes/tour.js"
// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.get('/test',(req,res)=>{
    res.send(200)
})

app.use("/auth",authRoutes)
app.use("/image",imageRoutes)
app.use("/tour",tourRoutes)
const PORT = process.env.PORT || 8081
mongoose.connect(process.env.MONGODB_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log(`DB Connected`)
})

if(process.env.ENVIRONMENT == 'lambda'){
    module.exports.handler = serverless(app);
} else {
    app.listen(PORT, () => {
        console.log(`Server on ${PORT}`)
    })
}
