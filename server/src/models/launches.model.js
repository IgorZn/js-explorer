import {LaunchModel} from "../schemas/launches.mongo.js";
import PlanetModel from "../schemas/planets.mongo.js";

const launches = new Map()
let latestFlightNumber = 100

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
}

launches.set(launch.flightNumber, launch)

export const addNewLaunch = (launch) => {
    latestFlightNumber++
    launches.set(latestFlightNumber, Object.assign(launch, {
        customer: ['Zero to Mastery', 'SASA'],
        upcoming: true,
        success: true,
        flightNumber: latestFlightNumber
    }))
}

export const saveLaunch = async (launch) => {
    const flightNumber = await LaunchModel.findOne().sort({flightNumber: -1}).exec()
    launch.flightNumber = ++flightNumber.flightNumber

    const planet = await PlanetModel.findOne({
        keplerName: launch.target
    },)

    if(!planet){
        throw new Error('No matching planet found')
    }

    return LaunchModel.updateOne({
        flightNumber: launch.flightNumber
    }, launch, {upsert: true, '__v': 0})

}

export const deleteLaunch = (id) => {
    return launches.delete(id)
}

export const existById = (id) => {
    return launches.has(id)
}

export const abortLaunchById = (id) => {
    const launch = launches.get(id)
    if(launch) {
        launch.upcoming = false;
        launch.success = false;
        return launch
    }
    return false

}

export const getAllLaunches = async () => {
    return LaunchModel.find({}, {'__v': 0})
}