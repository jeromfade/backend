const express = require("express");
const app = express();
let config = require("./config.json");
let PORT = config.PORT;

var bodyParser = require('body-parser');
app.use(bodyParser.json())

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:4200', 
};
app.use(cors(corsOptions));

//routes-------------------------
let authRouter = require("./router/authRoutes");
app.use("/", authRouter);

let adminRouter=require("./router/adminRoutes");
app.use("/admin",adminRouter);

let userRouter=require("./router/userRoutes");
app.use("/user",userRouter);

//error middleware----------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ result: false, message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
