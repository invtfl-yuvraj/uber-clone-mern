import express from "express";
import {body} from "express-validator";
import {registerUser} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", (req, res)=>{
    res.send("This is user route");
})

router.post("/register", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname").isLength({min: 3}).withMessage("First name must be at least 3 characters long"),
    body("password").isLength({min : 6}).withMessage("Password must be at least 6 characters long")
], registerUser);

export default router;