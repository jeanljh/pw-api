import test, { expect } from '@playwright/test'
import data from '../fixtures/data.json'

test.afterEach(async () => {
  // due to free api rate limit of one request per second, add delay to each request
  await new Promise((resolve) => setTimeout(resolve, 1500))
})

test.describe('Test suite - API endpoints', async () => {
  test('Positive scenario: valid title', async ({ request }) => {
    const response = await request.get('', {
      params: {
        title: data.validTitle,
        page: data.pageNumber,
      },
    })
    // verify response status is successful
    expect(response.status()).toBe(200)
    const { page, results } = await response.json()
    // verify page number matches input page
    expect(page).toBe(data.pageNumber)
    results.forEach(e => {
      // verify title matches / contains the input title
      expect(e['title'], 'match').toMatch(new RegExp(`.*${data.validTitle}.*`, 'i'))
    })
  })

  test('Negative scenario: invalid title', async ({ request }) => {
    const response = await request.get('', {
      params: {
        title: data.invalidTitle,
        page: data.pageNumber,
      },
    })
    // verify response status is successful
    expect(response.ok()).toBeTruthy()
    const { page, results } = await response.json()
    // verify page number matches input page
    expect(page).toBe(data.pageNumber)
    // verify results is empty
    expect(results).toHaveLength(0)
  })

  test('Negative scenario: endpoint without the required param title', async ({ request }) => {
    const response = await request.get('', {
      params: {
        page: data.pageNumber,
      },
    })
    // verify response status is successful
    expect(response.ok()).toBeTruthy()
    const { message } = await response.json()
    // verify response returns a message that is not null, undefined or empty string
    expect(message ?? '').not.toHaveLength(0)
  })
})
