require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDb = require("./utils/db");
const authRouter = require("./router/auth-router");
const errorMiddleware = require("./middlewares/error-middleware");
const contactRoute = require("./router/contact-router");
const serviceRoute = require ("./router/service-router.js")
const adminRoute =require("./router/admin-router.js")
// to get the json data in express app.
app.use(express.json());
app.use(errorMiddleware);
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));
app.use("/api/admin",adminRoute);
app.use("/api/auth", authRouter);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);


app.use(errorMiddleware);
// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix

const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
