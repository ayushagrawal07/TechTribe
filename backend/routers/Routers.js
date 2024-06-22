
import { Router } from "express"
import signupController from "../controllers/signupController.js";
import signincontroller from "../controllers/signincontroller.js";
import islogin from "../middlewares/islogin.js";
import createpost from "../controllers/createpost.js";
import getposts from "../controllers/getposts.js";
import profileposts from "../controllers/profileposts.js";
import like from "../controllers/like.js";
import unlike from "../controllers/unlike.js";
import comment from "../controllers/comment.js";
import deletepost from "../controllers/deletepost.js";

const route = Router();

route.post("/signup",signupController);
route.post("/signin",signincontroller);
route.post("/createpost",islogin,createpost);
route.get("/posts",getposts)
route.get("/profileposts",islogin,profileposts);
route.put("/like",islogin,like)
route.put("/unlike",islogin,unlike)
route.put("/comment",islogin,comment)
route.delete("/deletepost/:postId",islogin,deletepost)

export default route;