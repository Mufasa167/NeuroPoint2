
import User from "../Models/UserSchema.js"
import Doctor from "../Models/DoctorSchema.js"
import Tester from "../Models/TesterSchema.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const generateToken = user=>{
    return jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY,{
        expiresIn:'30d'
    })
}

export const register =async(req,res)=>{
    const {email,password,name,role,gender}=req.body;
    console.log(req.body)
    try{  
           let user=null
       if(role==='patient'){
        user=await User.findOne({email})
       }
       else if(role==='doctor'){
        user= await Doctor.findOne({email})
       }
       else if(role==='tester'){
        user= await Tester.findOne({email})
       }
       console.log(user)

       if(user){
        return res.status(400).json({message:'User already exist'})
       }

       const salt =await bcrypt.genSalt(10)
       const hashPassowrd= await bcrypt.hash(password,salt)

       if(role==='patient'){
        const newUser=await User.create({
            name,
            email,
            password:hashPassowrd,
            gender,
            role
        })
        res.status(200).json({success:true, message:"User successfully created", newUser})
       }


       if(role==='doctor'){
        const newUser=await Doctor.create({
            name,
            email,
            password:hashPassowrd,
            gender,
            role
        })
        res.status(200).json({success:true, message:"User successfully created", newUser})
       }


       if(role==='tester'){
        const newUser=await Tester.create({
            name,
            email,
            password:hashPassowrd,
            gender,
            role
        })
        res.status(200).json({success:true, message:"User successfully created", newUser})
       }


       

       
    }catch(error){
         res.status(500).json({success:false, message:'server error, please try again'})
    }
}

export const login =async(req,res)=>{

    const {email}=req.body
    try{
       let user=null

       const patient = await User.findOne({email})
       const doctor =await Doctor.findOne({email})
       const tester =await Tester.findOne({email})
    
       if(patient){
        user= patient
       }
       if(doctor){
        user= doctor
       }
       if(tester){
        user= tester
       }

       if(!user){
        return res.status(404).json({message:"User not found"})
       }

       const isPasswordMatch= await bcrypt.compare(req.body.password, user.password)

       if(!isPasswordMatch){
        return res.status(400).json({status: false, message:"Invalid password"})
       }
    
       const token =generateToken(user)



       const {password,role,appointment,...rest}=user._doc

       res
       .status(200)
       .json({
        status: true,
        message:"Logged In",
        token,
        data:{...rest},
        role
       })
    }catch(error){
        res.status(500).json({status: false, message:"Failed to Login"})
    }
}