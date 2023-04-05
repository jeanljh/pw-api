import test, { expect } from "@playwright/test";
import data from '../fixtures/data.json'

test.describe('Test suite - API endpoints', async () => {
    test('Test 1 - positive scenario: valid endpoint', async ({request}) => {
        const response = await request.get('', {
            params: {
                title: data.searchValue,
                page: 1
            },
        })
        // verify response status is successful
        expect(response.status()).toBe(200)
        const {page, results} = await response.json()
        // verify page number is 1
        expect(page).toBe(1)
        results.forEach(e => {
            // verify title contains the search value
            expect(e['title'], 'match').toMatch(new RegExp(`.*${data.searchValue}.*`, 'i'))
        })
    })

    test('Test 2 - negative scenario: endpoint without the required param title', async ({request}) => {
        const response = await request.get('', {
            params: {
                page: 1
            },
        })
        // verify response status is unsuccessful
        expect(response.ok()).toBeFalsy()
        const { message } = await response.json()
        // verify response returns a message that is not null, undefined or empty string
        expect(message ?? '').not.toHaveLength(0)
    })

    test('Test 3 - negative scenario: endpoint with page number > 10', async ({request}) => {
        const response = await request.get('', {
            params: {
                title: data.searchValue,
                page: 11
            }
        })
        // verify response status is unsuccessful
        expect(response.ok()).toBeFalsy()
        // verify response returns undefined
        const { page } = await response.json()
        expect(page).toBeUndefined()
    })
})