import express from "express";
import {getAllLaunches} from "./launches.controller.js";

const launchesRoute = express.Router()

launchesRoute.get('/launches', getAllLaunches)

export default launchesRoute