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

export const getAllLaunches = () => {
    return Array.from(launches.values())
}