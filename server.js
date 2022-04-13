const path = require("path")
const cors = require("cors");
const morgan = require("morgan");
const helmet  = require("helmet")
const express = require("express");

const connectDB = require("./config/connectDB");
const userRoute = require("./routers/userRoute");
const PORT = process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 9090;

connectDB();

const app = express();

app.use(cors());
// app.use(helmet.hidePoweredBy());
app.use(morgan("tiny"));
app.use(express.json());

app.use('/user', userRoute);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "./client/build")));
    app.get("*", function (request, response) {
        response.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
      });
}

app.listen(PORT, (err, res)=>{
    if(err) return err;
    else console.log(`Server is running on port number ${PORT}`);
})