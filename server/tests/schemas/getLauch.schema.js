import Ajv from "ajv"
import ajvKeywords from "ajv-keywords";
import addFormats from "ajv-formats"

export const ajv = new Ajv({strictTypes: true})
ajvKeywords(ajv)
addFormats(ajv)

const getLaunchesSchema = {
    type: "object",
    properties: {
        flightNumber: {type: "number"},
        mission: {type: "string"},
        rocket: {type: "string"},
        launchDate: {
            type: "string",
            format: "date-time"
        },
        target: {type: "string"}
    },
    allRequired: true,
}

export const validateGetLaunches = ajv.compile(getLaunchesSchema)

