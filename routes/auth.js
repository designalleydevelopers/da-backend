import express from "express";
import { login } from "../controllers/auth.js";
import { decodeToken, verifyToken } from "../middleware/index.js";
import { register } from "../controllers/auth.js";
import { checkContact } from "../controllers/auth.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/register",decodeToken,register)
router.post("/login",login)
router.post("/check/contact",checkContact)
router.get("/test",(req,res)=>{
    try{
        res.send(200)
    }
    catch{
        res.send(500)
    }
})
router.get("/users",decodeToken,async (req,res)=>{
    User.find().then((users)=>
    res.status(200).json({data:users}))
})

export default router;