
import { Router } from "express"
import signupController from "../controllers/signupController.js";

const route = Router();
route.post("/signup",signupController);
route.get("/demo",(req,res)=>{
    res.json({
        message:"Hello"
    })
})

export default route;