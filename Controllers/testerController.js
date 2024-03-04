import Tester from "../Models/TesterSchema.js"


export const updateTester =async(req,res)=>{
    const id=req.params.id
    try {
        const updatedTester= await Tester.findByIdAndUpdate(id,{$set:req.body},{new:true})

        res.status(200).json({success:true, message:"Succesfully Updated", data:updatedTester})
    } catch (error) {
        res.status(500).json({success:false, message:"Failed to Update"})
    }
}



export const deleteTester =async(req,res)=>{
    const id=req.params.id
    try {
         await Tester.findByIdAndDelete(id)

        res.status(200).json({success:true, message:"Succesfully deleted"})
    } catch (error) {
        res.status(500).json({success:false, message:"Failed to Delete"})
    }
}



export const getSingleTester =async(req,res)=>{
    const id=req.params.id
    try {
        const tester= await Tester.findById(id).select('-password')

        res.status(200).json({success:true, message:"Tester Found", data:tester})
    } catch (error) {
        res.status(404).json({success:false, message:"No tester found!"})
    }
}


export const getAllTesters =async(req,res)=>{
    
    try {
        const testers= await Tester.find({}).select('-password')

        res.status(200).json({success:true, message:"Testers Found", data:testers})
    } catch (error) {
        res.status(404).json({success:false, message:"Not found!"})
    }
}
