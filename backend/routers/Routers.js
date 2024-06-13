
import { Router } from "express"
import signupController from "../controllers/signupController.js";
import signincontroller from "../controllers/signincontroller.js";
import islogin from "../middlewares/islogin.js";
import createpost from "../controllers/createpost.js";

const route = Router();

route.post("/signup",signupController);
route.post("/signin",signincontroller);
route.post("/createpost",createpost);
route.get("/demo",(req,res)=>{
    res.json({
        message:"Hello"
    })
    
})

export default route;