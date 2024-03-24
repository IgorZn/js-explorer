import express from "express";
import {httpAddNewLaunches, httpGetAllLaunches} from "./launches.controller.js";

const launchesRoute = express.Router()

launchesRoute.get('/', httpGetAllLaunches)
launchesRoute.post('/', httpAddNewLaunches)

export default launchesRoute