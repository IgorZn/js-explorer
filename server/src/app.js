import * as path from "path";
import { fileURLToPath } from 'node:url';

import express from "express"
import cors from "cors"
import morgan from "morgan";
import planetsRouter from "./routes/planets/planets.router.js";
import launchesRoute from "./routes/launches/launches.route.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

// Logging
app.use(morgan('combined'))

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }))

// Routers
app.use(planetsRouter)
app.use('/launches',launchesRoute)

// Static
app.use(express.static(path.join(__dirname, '..', 'public')))

export default app