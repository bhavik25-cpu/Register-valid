// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const router = require("./routes/user-routes");
const cors = require('cors');
const cookieParser = require("cookie-parser");

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors({
  origin: "http://127.0.0.1:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);


mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
