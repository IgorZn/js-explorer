import * as fs from 'node:fs/promises';
import {parse} from "csv-parse";
import PlanetModel from "../schemas/planets.mongo.js";

const result = []

const habitablePlanets = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36
        && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6
}

const fd = await fs.open('./src/data/kepler_data.csv')

fd.createReadStream()
    .pipe(parse({
        comment: '#',
        columns: true
    }))
    .on('data', async (data) => {
        if (habitablePlanets(data)) {
            await savePlaten(data)
                .catch(e => console.log(`Error while loading planets data: ${e}`))
        }
    })
    .on('error', (err) => {
        console.log(err)
    })
    .on('end', async () => {
        const countPlanetsFound = await getAllPlanets()
        console.log('End of reading - Planets Data...')
        console.log('Total habitable planets: ' + countPlanetsFound.length)
    })

const savePlaten = async (data) => {
    const filter = {keplerName: data.kepler_name}
    const update = {keplerName: data.kepler_name}
    return  PlanetModel.findOneAndUpdate(filter, update, {new: true, upsert: true})
}

export const loadPlanetsData = () => {
    /*
    * эта функция -- просто пример.
    * начиная с 15й версии NodeJs появились
    * асинхронные fs функции, которые автоматически
    * преобразуют все операции в Promise
    * */
    return new Promise((resolve, reject) => {
        fd.createReadStream()
            .pipe(parse({
                comment: '#',
                columns: true
            }))
            .on('data', (data) => {
                if (habitablePlanets(data)) {
                    result.push(data)
                }
            })
            .on('error', (err) => reject(err))
            .on('end', () => {
                console.log('End of reading...')
                resolve()
            })
    })
}

export const getAllPlanets = async () => {
    return PlanetModel.find({});
}
