const loginController = (req, res) => {
    res.status(200).send({
        message: "login route is working spiderman",
        success: true,
    });
};
const registerController = (req, res) => {
    res.status(200).send({
        message: "register route is working cap.",
        success: true,
    });
};



module.exports = { loginController, registerController }