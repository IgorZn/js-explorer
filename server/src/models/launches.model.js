import {LaunchModel} from "../schemas/launches.mongo.js";
import PlanetModel from "../schemas/planets.mongo.js";


const DEFAULT_FLIGHT_NUMBER = 100


// export const addNewLaunch = (launch) => {
//     latestFlightNumber++
//     launches.set(latestFlightNumber, Object.assign(launch, {
//         customer: ['Zero to Mastery', 'SASA'],
//         upcoming: true,
//         success: true,
//         flightNumber: latestFlightNumber
//     }))
// }

const getLatestFlightNumber = async () => {
    const flightNumber = await LaunchModel
        .findOne()
        .sort({flightNumber: -1})
        .exec()
    return flightNumber?.flightNumber ? ++flightNumber.flightNumber : DEFAULT_FLIGHT_NUMBER
}

export const saveLaunch = async (launch) => {
    launch.flightNumber = await getLatestFlightNumber()

    const planet = await PlanetModel.findOneAndUpdate({
        keplerName: launch.target
    })

    if (!planet) {
        throw new Error('No matching planet found')
    }

    return LaunchModel.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {upsert: true, '__v': 0})

}

export const deleteLaunch = (id) => {
    return launches.delete(id)
}

export const existById = async (id) => {
    return LaunchModel.findOne({flightNumber: id}).exec()
}

export const abortLaunchById = (id) => {
    return LaunchModel
            .findOneAndUpdate(
                {flightNumber: id},
                {upcoming: false, success: false},
                {returnDocument: "after", '__v': 0, '_id': 0}
            )

}

export const getAllLaunches = async () => {
    return LaunchModel.find({}, {'__v': 0})
}