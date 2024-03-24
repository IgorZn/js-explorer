import express from "express";
import {httpAbortLaunch, httpAddNewLaunches, httpGetAllLaunches} from "./launches.controller.js";

const launchesRoute = express.Router()

launchesRoute.get('/', httpGetAllLaunches)
launchesRoute.post('/', httpAddNewLaunches)
launchesRoute.delete('/:id', httpAbortLaunch)

export default launchesRoute