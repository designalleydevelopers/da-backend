import express from "express";
import VirtualTour from "../models/VirtualTour.js";

const router = express.Router()


router.post('/create',async (req,res)=>{
    try{
        const {tourName,scenes} = req.body
        const tour = new VirtualTour({
            tourName,
            scenes
        })
        const savedTour = await tour.save()
        return res.status(200).json(savedTour)
    } catch (err) {
        return res.status(400).json({err:err})
    }
})

router.get("/",async (req,res)=>{
    try {
        const allTours = await VirtualTour.find()
        return res.status(200).json(allTours)
    } catch (error) {
        return res.status(400).json({error:error})
    }
})

router.get("/:id",async (req,res)=>{
    try{
        const tour = await VirtualTour.findById({_id : req.params.id})
        if(!tour){
            return res.status(400).json({message:"Tour Id not found"})
        }
        return res.status(200).json(tour)
    } catch (error) {
        return res.status(400).json({error:error})
    }
})
router.delete("/:id", async (req,res) => {
    try{
        const tour = await VirtualTour.deleteOne({_id : req.params.id})
        if(!tour){
            return res.status(400).json({message:"Tour Id not found"})
        }
        return res.status(200).json({message:"Deleted successfully"})
    } catch (error) {
        return res.status(400).json({error:error})
    }
})

router.put("/:id",async (req,res)=>{
    try{
        const id = req.params.id
        const updatedTourBody = req.body

        const updatedTour = await VirtualTour.findByIdAndUpdate(id,updatedTourBody,{new:true})
        if (!updatedTour) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        return res.status(200).json(updatedTour);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating resource',err:error });
    }
})
export default router