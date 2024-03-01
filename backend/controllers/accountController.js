const zod = require("zod");

const Account = require("../models/accountSchema");
const { default: mongoose } = require("mongoose");

const balanceController = async (req, res) => {

    try {
        console.log(req.userId);
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

const transferController = async (req, res) => {
    try {
        const session = await mongoose.startSession();

        session.startTransaction();
        const { amount, to } = req.body;

        // Fetch the accounts within the transaction
        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        // Perform the transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        // Commit the transaction
        await session.commitTransaction();
        res.json({
            message: "Transfer successful",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "error in transferring",
            error
        });
    }
}


module.exports = { balanceController, transferController }