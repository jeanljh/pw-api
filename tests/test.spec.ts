import test, { expect } from "@playwright/test";
import data from '../fixtures/data.json'

test.afterEach(async () => {
    // due to free api rate limit of one request per second, add delay to each request
    await new Promise(resolve => setTimeout(resolve, 1500))
})

test.describe('Test suite - API endpoints', async () => {
    test('Test 1 - positive scenario: valid title', async ({request}) => {
        const response = await request.get('', {
            params: {
                title: data.validTitle,
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
            expect(e['title'], 'match').toMatch(new RegExp(`.*${data.validTitle}.*`, 'i'))
        })
    })

    test('Test 2 - negative scenario: endpoint without the required param title', async ({request}) => {
        const response = await request.get('', {
            params: {
                page: 1
            },
        })
        // verify response status is successful
        expect(response.ok()).toBeTruthy()
        const { message } = await response.json()
        // verify response returns a message that is not null, undefined or empty string
        expect(message ?? '').not.toHaveLength(0)
    })

    test('Test 3 - negative scenario: invalid title', async ({request}) => {
        const response = await request.get('', {
            params: {
                title: data.invalidTitle,
                page: 1
            }
        })
        // verify response status is successful
        expect(response.ok()).toBeTruthy()
        const {page, results} = await response.json()
        // verify page number is 1
        expect(page).toBe(1)
        // verify results is empty
        expect(results).toHaveLength(0)
    })
})