import {test, expect} from '@playwright/test';
import { validateGetLaunches, validateLaunches} from "./schemas/getLauch.schema";
import { faker } from '@faker-js/faker';

test('Get launches', async ({request}) => {
    await request.get('/launches')
        .then(async result => {
            if (!validateGetLaunches(...await result.json())) {
                console.log(validateGetLaunches.errors)
            }
            expect(validateGetLaunches(...await result.json())).toBe(true)
        })
})

test('Post launch', async ({request}) => {
    await request.post('/launches', {
        data: {
            launchDate: new Date(),
            mission: "Test mission" + faker.number.int(100),
            rocket: "Test Rocket" + faker.number.int(100),
            target: "Test Target" + faker.number.int(100)
        }
    })
        .then(async result => {
            const body = await result.json()
            expect(validateLaunches(body.launch)).toBe(true)
        })
})