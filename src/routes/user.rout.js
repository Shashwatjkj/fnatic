import { Router } from "express";
import { loginUser, registerUser,logOut,otpverificaton } from "../controllers/user.controllers.js";
import { verifyJWTtoken } from "../middlewares/authcheck.js";

const router=Router();


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// secure routes...

router.route("/logout").post(verifyJWTtoken,logOut)






export default router