import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullname : {
        firstname : {
            type : String,
            required : true,
            minlength : [3, "First name must be atleast 3 characters long"],

        },
        lastname : {
            type : String,
            minlength : [3, "Last name must be atleast 3 characters long"],
        }, 
        email : {
            type : String,
            required : true,
            unique : true,
            minlength : [3, "Last name must be atleast 3 characters long"],
        },
        password : {
            type : String,
            required : true,
            select : false,
        },
        socketId : {
            type : String
        }
    }
});

userSchema.methods.generateAuthToken = ()=> {
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET_KEY);
    return token;
}

userSchema.methods.comparePassword = async (password)=>{
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async (password)=>{
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model("user", userSchema);

export default userModel;