import express from "express";
import { registerController , loginController ,forgotPasswordController} from "../controllers/authController.js"
import { requireSignIn  ,isAdmin} from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post('/register' , registerController)

router.post('/login' , loginController)

// Forgot Password || Post
router.post('/forgot-password' , forgotPasswordController)



//protected  user route auth
router.get("/user-auth" ,requireSignIn , (req , res)=>{
    res.status(200).send({ok:true})
});
//protected  admin route auth
router.get("/admin-auth" ,requireSignIn ,isAdmin ,(req , res)=>{
    res.status(200).send({ok:true})
});

export default router;