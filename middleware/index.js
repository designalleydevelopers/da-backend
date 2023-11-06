import firebase from "../config/firebase.config.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
export const decodeToken = async (req, res, next) => {
	try {
		let token = req.header("Authorization");
		if(!token) {
			return res.status(403).send("No token")
		}
		token = token.split(' ')[1]
		const decodeValue = await firebase.auth().verifyIdToken(token);
		if (decodeValue) {
			console.log(decodeValue);
			return next();
		}
		return res.status(401).json({ message: 'Unauthorized' });
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: 'Firebase Token Server Error',error:e });
	}
}
export const verifyToken = (req,res,next) => {
	try{
		let token = req.header("Authorization");
		if(!token) {
			return res.status(403).send("Access Denied")
		}
		token = token.split(' ')[1]
		jwt.verify(token,process.env.JWT_SECRET,function(err,decoded){
			if(err){
				res.status(401).json({err})
			}
			else{
				decoded.exp = new Date(decoded.exp*1000);
				res.json({decoded})
				next();
			}
		});
	} catch(err) {
		res.status(500).send("Token Verification Server Error")
	}
}