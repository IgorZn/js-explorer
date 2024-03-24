const PORT = process.env.PORT || 8000
const API_URL = `http://localhost:${PORT}`

async function httpGetPlanets() {
    // Load planets and return as JSON.
    const response = await fetch(`${API_URL}/planets`)
    return await response.json()
}

async function httpGetLaunches() {
    // Load launches, sort by flight number, and return as JSON.
    const response = await fetch(`${API_URL}/launches`)
    const fetchedLaunches = await response.json()
    return fetchedLaunches.sort((a, b) => {
        return a.flightNumber - b.flightNumber
    })
}

async function httpSubmitLaunch(launch) {
    // Submit given launch data to launch system.
    return await fetch(`${API_URL}/launches`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(launch)
    }).catch(e => {
        return {ok: false, error: e}
    })
}

async function httpAbortLaunch(id) {
    // Delete launch with given ID.
    return await fetch(`${API_URL}/launches/${id}`, {
        method: 'DELETE',
    }).catch(e => {
        return {ok: false, error: e}
    })
}

export {
    httpGetPlanets,
    httpGetLaunches,
    httpSubmitLaunch,
    httpAbortLaunch,
};