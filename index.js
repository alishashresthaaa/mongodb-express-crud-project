const express = require("express")
const app = express()
const tasks = require("./routes/tasks")
const connectDB = require("./db/connect")
const notFound = require("./middlewares/notFound")
const errorHandlerMiddleware = require("./middlewares/errorHandler")
require("dotenv").config();

// middlewares
app.use(express.static("./public"))
app.use(express.json())

// routes
app.use("/api/v1/tasks", tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3000

// Server and database doesnot work in sync - first server is run and then database is connected

const startDB = async () => {
   try{
      // First the database is connected
      await connectDB(process.env.MONGO_URI)
      // then the server is running
      app.listen(port, console.log(`Server is listening on port ${port}`))
   }catch(err){
      console.log(err)
   }
}

startDB()
