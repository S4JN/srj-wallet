const User = require("../models/userSchema");
const zod = require("zod");

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

const userController = async (req, res) => {
    try {
        const { success } = updateBody.safeParse(req.body)
        if (!success) {
            res.status(411).json({
                message: "Error while updating information"
            })
        }

        const user = await User.updateOne({ _id: req.userId }, req.body);
        console.log(user);

        res.status(200).json({
            message: "Updated successfully",
            success: true,
        });
    } catch (error) {
        res.status(200).json({
            message: "error",
            success: false,
            error
        });
    }



};


///api/v1/user/bulk
// params ?filter=harkirat
// only based on first name and last name
const filterUser = async (req, res) => {
    try {
        const filter = req.query.filter || "";
        const users = await User.find({
            $or: [{
                firstName: {
                    "$regex": filter
                }
            }, {
                lastName: {
                    "$regex": filter
                }
            }]
        })

        res.status(200).json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })

    } catch (error) {
        res.status(400).json({
            message: "error",
            success: false,
        });
    }
}

module.exports = { userController, filterUser }