const zod = require("zod");
const User = require("../models/userSchema")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const signupBody = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})


const registerController = async (req, res) => {
    try {
        const { success } = signupBody.safeParse(req.body);
        console.log(req.body);
        if (!success) {
            return res.status(411).json({
                message: "Incorrect inputs",
                success: false
            })
        }

        const existingUser = await User.findOne({
            username: req.body.username
        })
        if (existingUser) {
            res.status(411).send({
                message: "User with this email already exists",
                success: false,
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        // const user = new User(req.body);
        // await user.save();

        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })

        const userId = user._id;

        const token = jwt.sign({
            userId
        }, process.env.JWT_SECRET);

        res.status(200).send({
            token: token,
            user,
            message: "register route is working cap.",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal Serval Error in registering in the user"
        });
    }
};

const signinBody = zod.object({
    username: zod.string(),
    password: zod.string()
})


const loginController = async (req, res) => {
    try {


        const { success } = signinBody.safeParse(req.body)
        if (!success) {
            return res.status(411).json({
                message: "Email already taken / Incorrect inputs"
            })
        }

        const user = await User.findOne({
            username: req.body.username,
        });
        if (!user) {
            return res.status(400).json({
                message: "User with this username not found"
            })
        }


        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparePassword) {
            console.log("Enterd password is wrong");
            return res.status(200).send({
                success: false,
                message: "Wrong Password"
            });
        }
        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET);

        return res.status(301).json({
            success: true,
            token: token,
            user
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal Serval Error in logging in the user"
        });
    }

};




module.exports = { loginController, registerController }