const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

//regular middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//cookie middleware
app.use(cookieParser());

app.use('/api/v1',userRouter);
app.use("/api/v1",postRouter);

app.get("/",(req,res) => {
    res.send("Hi from youtube live")
})

app.listen(PORT,() => {
    console.log("server is running on port: ",PORT)
}) 