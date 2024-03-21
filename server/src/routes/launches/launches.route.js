import express from "express";
import {httpGetAllLaunches} from "./launches.controller.js";

const launchesRoute = express.Router()

launchesRoute.get('/launches', httpGetAllLaunches)

export default launchesRoute