const mongoose = require("mongoose");


// username: String,
//     password: String,
//     firstName: String,
//     lastName: String

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    username: { type: String, required: true, unique: true},
    password: { type: String, required: true },
   
},
    { timestamps: true }

)

const User = mongoose.model('User', userSchema);

module.exports = User;