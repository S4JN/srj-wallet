const express = require("express");
const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes")
const morgan = require("morgan")
const cors = require("cors")
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/user",userRoutes);


const PORT = process.env.PORT || 8000;
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`);
        })
    }).catch(()=>{
        console.log(`something is wrong`);
    })