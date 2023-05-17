// dependencies
import cors from "cors";
import dotenv from 'dotenv';
import express from "express";

// config dotenv
dotenv.config()


// app initialization
const app = express()

// initialize middleware
app.use(express.json())
app.use(cors())


// set up the default route and health routes
app.get("/", (req, res) => {
  res.send(200).json({message: "Hello From Toy-Troppers Server, developed by Ujjal Kumar Roy"})
})


app.get("/health", (req, res) => {
  res.send(200).json({message: "This server Health is now 100%"})
})


// PORT and listen the app
const PORT = process.env.PORT || 8080;

// listen the port
app.listen(PORT, () => {
  console.log(`Server is running at PORT 8080`);
})