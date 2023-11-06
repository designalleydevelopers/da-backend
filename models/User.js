import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullName:{
            type: String,
            required: true,
            min:2,
            max:50
        },
        phoneNumber:{
            type: String,
            unique:true,
            required: true,
            min:10,
            max:13
        },
        email:{
            type: String,
            unique:true,
            required: true,
            min:10,
            max:13
        }
    },{
        timestamps: true
    }
)

const User = mongoose.model("User",UserSchema);
export default User;