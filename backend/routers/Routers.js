
import { Router } from "express"
import signupController from "../controllers/signupController.js";
import signincontroller from "../controllers/signincontroller.js";
import islogin from "../middlewares/islogin.js";
import createpost from "../controllers/createpost.js";
import getposts from "../controllers/getposts.js";

const route = Router();

route.post("/signup",signupController);
route.post("/signin",signincontroller);
route.post("/createpost",islogin,createpost);
route.get("/posts",getposts)

export default route;