import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address ,answer } = req.body;
        //validations
        if (!name) {
            return res.send({ message: 'Name is required' })
        }
        if (!email) {
            return res.send({ message: 'Email is required' })
        }
        if (!password) {
            return res.send({ message: 'Password is required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone No. is required' })
        }
        if (!address) {
            return res.send({ message: 'Address is required' })
        }
        if (!answer) {
            return res.send({ message: 'Answer is required' })
        }

        //check user
        const existingUser = await userModel.findOne({ email })
        //existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already register please Login."
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword ,answer}).save()

        res.status(201).send({
            success: true,
            message: 'User Register Successfully',
            user,
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
};

//LOGIN || POST
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered "
            })
        }

        //check Password
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            })
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d", })

        res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role, 
            }, 
            token,
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        })
    }
};


//Forgot Password controller
export const forgotPasswordController =async(req,res)=>{
 try{
    const {email , answer ,newPassword} = req.body
    if(!email){
        res.status(400).send({message:"Email is required"})
    }
    if(!answer){
        res.status(400).send({message:"answer is required"})
    }
    if(!newPassword){
        res.status(400).send({message:"New Password is required"})
    }

    //Check
    const user = await userModel.findOne({email ,answer})
    //validation
    if(!user){
        return res.status(404).send({
            success:false,
            message:"Wrong Email or Answer"
        })
    }
    const hashed = await hashPassword(newPassword)
    await userModel.findByIdAndUpdate(user._id ,{password:hashed})
    res.status(200).send({
        success:true,
        message:"Password Reset Successfully"
    })
 }
 catch(error){
    console.log(error);
    res.status(500).send({
        success:false ,
        message:"Something went wrong",
        error
    })
 }

 };

// update Profile
export const updateProfileController = async(req,res)=>{
    try{
        const { name ,email,password, address , phone} = req.body
        const user = await userModel.findById(req.user._id)
        //password
        if(password && password.length<6){
            return res.json({error:"Password is required and must be 6 characters long"})
        }
        const hashedPassword = password?await hashPassword(password):undefined
       const updatedUser= await userModel.findByIdAndUpdate(req.user._id,{
        name:name||user?.name,
        email:email||user?.email,
        password:hashedPassword||user?.password,
        phone:phone||user?.phone,
        address:address||user?.address
       },{new:true})

       res.status(200).send({
        success:true,
        message:'Profile Updated Successfully',
        updatedUser
       })

    }
    catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            message : 'Error while updating profile',
            error
        })
    }
    

};


