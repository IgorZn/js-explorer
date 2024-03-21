import {getAllLaunches} from "../../models/launches.model.js";

export const httpGetAllLaunches = (req, res) => {
    return res.status(200).json(getAllLaunches())
}