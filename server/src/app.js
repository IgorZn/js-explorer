import * as path from "path";
import { fileURLToPath } from 'node:url';

import helmet from "helmet"
import express from "express";
import cors from "cors"
import cookieSession from "cookie-session"
import morgan from "morgan";
import {v1api} from "./routes/api.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

// Security
app.use(helmet())

// Logging
app.use(morgan('combined'))

// Session
app.use(cookieSession({
  name: 'session',
  keys: ['secret key1', 'secret key2'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }))

// Routers
app.use('/v1', v1api)

// Static
app.use(express.static(path.join(__dirname, '..', 'public')))

export default app