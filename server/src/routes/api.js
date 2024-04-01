import express from "express";
import planetsRouter from "./planets/planets.router.js";
import launchesRoute from "./launches/launches.route.js";

export const v1api = express.Router()

// Routers
v1api.use('/planets', planetsRouter)
v1api.use('/launches',launchesRoute)