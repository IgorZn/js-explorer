import { test, expect } from '@playwright/test';
import {validateGetLaunches} from "./schemas/getLauch.schema";

test('Get launches', async ({ request }) => {
    await request.get('/launches')
        .then(async result => {
            if(!validateGetLaunches(...await result.json())){
                console.log(validateGetLaunches.errors)
            }
            expect(validateGetLaunches(...await result.json())).toBe(true)
        })
})