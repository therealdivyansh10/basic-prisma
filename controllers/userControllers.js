// bring in prisma and cookie

const prisma = require("../prisma/index");
const cookieToken = require("../utils/cookieToken");
const bcrypt = require("bcrypt")

// user signup

exports.signup = async(req,res) => {
    try{
        const {name,email,password} = req.body;

        // check
        if([name,email,password].some((value)=>value==="")){
            res.status(500).json({
                success:false,
                message: "no field must be empty",
            })
        }

        const securePassword = await bcrypt.hash(password,10);

        const user = await prisma.user.create({
            data:{
                name,
                email,
                password:securePassword,
            }
        })

        //  send user a token
        cookieToken(user, res)

    } catch (error){
        throw new Error(error);
    }
}

exports.login = async(req,res,next) => {
    try{
        // take info from the user
        const {email,password} = req.body;

        if(!email || !password){
            throw new Error("Please provide email and password");
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        // if there is no user
        if(!user){
            throw new Error("user not found");
        }

        // password mismatch
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error("Password is incorrect");
        }
        res.status(200).json({
            success: true,
            message:"user logged in",
            data: user,
        })

    } catch (error){
        res.status(500).json({
            success:false, 
            message:error.message,
        })
    }
}

exports.logout = async(req,res,next) => {
    try{
        res.clearCookie("token");
        return res.status(200).json({
            message:"successfully logged out",
        })
    } catch (error){
        throw new Error(error);
    }
}