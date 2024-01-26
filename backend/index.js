const express = require("express");
const testRoutes = require("./routes/testRoutes");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();
app.use(express.json());



app.use("/api/v1/test", testRoutes);




const PORT = process.env.PORT || 8000;
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`);
        })
    }).catch(()=>{
        console.log(`something is wrong`);
    })