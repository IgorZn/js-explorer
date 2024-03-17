import * as fs from 'node:fs/promises';
import {parse} from "csv-parse";

export const result = []

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
    .on('data', (data) => {
        if (habitablePlanets(data)) {
            result.push(data)
        }
    })
    .on('end', () => {
        console.log('End of reading...')
    })
