const connectToMongoDB = require("./database");
const express = require("express");
require("dotenv").config();
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());
//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

const server = app.listen(process.env.PORT_NUMBER, () => {
  console.log(
    `Server is running on port http://localhost:${process.env.PORT_NUMBER}`
  );
  connectToMongoDB();
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err, origin) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});