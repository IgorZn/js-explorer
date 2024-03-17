import {result} from "../../models/planets.model.js";

export const getAllPlanets = (req, res) => {
    return res.status(200).json(result)
}