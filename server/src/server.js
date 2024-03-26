import http from "http"
import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv"
import {getEnvPath, pathsEnv} from "../playwright.config.js";

const PORT = process.env.PORT || 8000
const envPath = getEnvPath(pathsEnv)

dotenv.config({path: envPath})

const server = http.createServer(app)
// await loadPlanetsData()

const mongooseOptions = {
/*
*   useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex
*   are no longer supported options. Mongoose 6 always behaves as if useNewUrlParser,
*   useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false.
*   Please remove these options from your code.
* */
}


server.listen(PORT, async () => {
    await mongoose.connect(process.env.MONGO_DB_URL)
        .then(result => {
            console.log('MongoDB connection ready!')
        })
    console.log(`Server running at port: ${PORT}`)
    console.log(`Server PID: ${process.pid}`)
})
