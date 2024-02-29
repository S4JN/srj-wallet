const zod = require("zod");

const Account = require("../models/accountSchema");

const balanceController = async (req, res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId
        });
        res.status(200).json({
            success: true,
            balance: account.balance,
            message: "Balance fetched"
        })

    } catch (error) {
        res.status(400).json({
            message: "error in fetching balance",
            success: false,
        });
    }
}

const transferController = async(req,res) =>{
    try {
        
    } catch (error) {
        
    }
}


module.exports = { balanceController }