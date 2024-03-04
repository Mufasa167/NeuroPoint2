import Review from "../Models/ReviewSchema.js"
import Doctor from "../Models/DoctorSchema.js"
import Tester from "../Models/TesterSchema.js"


//All reviews
export const getAllReviews = async(req,res)=>{
    try {
        const reviews= await Review.find({})
        res.status(200).json({success:true, message:"Successful", data:reviews})
    } catch (error) {
        res.status(404).json({success:false, message:"Not Found"})

    }
}


//Doctor's reviews
export const createReviewDoctor = async(req,res)=>{

    if(!req.body.doctor) req.body.doctor= req.params.doctorId
   
    if(!req.body.user) req.body.user= req.params.userId

    const newReview= new Review(req.body)

    try {
        const savedReview= await newReview.save()
        await Doctor.findByIdAndUpdate(req.body.doctor,{
            $push:{reviews:savedReview._id}
        })
      res.status(200).json({success:true, message:'Review has been added successfully!',data:savedReview})  
    } catch (error) {
        res.status(500).json({success:false,message:"Failed to create review"})
    }
}


//Tester's reviews
export const createReviewTester = async(req,res)=>{

    if(!req.body.tester) req.body.tester= req.params.testerId

    if(!req.body.user) req.body.user= req.params.userId

    const newReview= new Review(req.body)

    try {
        const savedReview= await newReview.save()
        await Tester.findByIdAndUpdate(req.body.doctor,{
            $push:{reviews:savedReview._id}
    })

       res.status(200).json({success:true, message:'Review has been added successfully!',data:savedReview})  
    
    } catch (error) {
        res.status(500).json({success:false,message:"Failed to create review"})
    }
}

