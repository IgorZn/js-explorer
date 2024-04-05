import fs from "node:fs"
import path from "node:path";
import https from "https"

import mongoose from "mongoose";
import dotenv from "dotenv"
import app from "./app.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import {getEnvPath, pathsEnv} from "../playwright.config.js";
import {loadLaunchesData} from "./models/launches.model.js";

const PORT = process.env.PORT || 8000
export const envPath = getEnvPath(pathsEnv)

dotenv.config({path: envPath})

// Security
const options = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pm')),
}
const server = https.createServer(options, app)
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
    await loadLaunchesData()
})
