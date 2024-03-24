import {abortLaunchById, addNewLaunch, deleteLaunch, existById, getAllLaunches} from "../../models/launches.model.js";
import { validate, ajv } from "../../schemas/launches.schema.js";

export const httpGetAllLaunches = (req, res) => {
    return res.status(200).json(getAllLaunches())
}

export const httpAddNewLaunches = (req, res) => {
    const { body } = req
    const isValidated = validate(body)
    if (!isValidated) {
        return res.status(400).json({status: false, error: ajv.errorsText(validate.errors)})
    }

    body.launchDate = new Date(body.launchDate)
    addNewLaunch(body)
    const allLaunches = getAllLaunches()
    return res.status(202).json({status: true, count: allLaunches.length, launch: body})
}

export const httpAbortLaunch = (req, res) => {
    const id = +req.params.id
    if(existById(id)){
        const abortedLaunch = abortLaunchById(id)
        return res.status(200).json({status: true, launch: abortedLaunch})
    }
    return res.status(400).json({status: false, error: "Launch not found"})

}