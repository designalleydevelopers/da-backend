import jwt from "jsonwebtoken";
import User from "../models/User.js"

export const register = async (req, res) => {
    try {
       const { 
            fullName,
            phoneNumber,
            email
        } = req.body;
        const user = new User({
            fullName,
            phoneNumber,
            email
        })
        const saveduser = await user.save()
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn : '7d'})
        res.status(200).json({token,user})
    }
    catch (err){
        res.status(500).json({error:err.message});
    }
}
export const login = async (req,res) => {
    try {
        const {phoneNumber} = req.body;
        const user = await User.findOne({phoneNumber:phoneNumber})
        if(!user){
            return res.status(400).json({message:"User Not Found"})
        }
        else{
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn : '7d'})
            res.status(200).json({
                token,user
            })
        }
    } catch (error) {
        res.status(500).json({error})
    }
}
export const checkContact = async (req,res) => {
	try {
		const {phoneNumber} = req.body;
		const user = await User.findOne({phoneNumber:phoneNumber});
		if(!user){
			res.status(400).json({message:"User Not Registered"})
		}
		else{
            res.status(200).json({message:"User Found"})
		}
	} catch (err){
		console.log(err)
	}
}
