import { getUser, getQuotes, createQuote, deleteRecentQuote } from "./quoteBackend";

const BASE_ENDPOINT = "http://localhost:8080/api"
const HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
}

afterEach(() => {
    global.fetch.mockClear()
    delete global.fetch
})

test('get user', () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                user: [{name: 'MockUser'}]
            })
        })
    )

    return getUser().then(result => {
        expect(global.fetch).toHaveBeenCalledWith(
            `${BASE_ENDPOINT}/profile/?userID=undefined`,
            {"credentials": "same-origin", "method": "GET"}
        )
        expect(result).toEqual({user: [{name: 'MockUser'}]})
    })
})

test('get user error', () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: false,
        })
    )

    return getUser().then(result => {
        expect(result).toEqual({error: true})
    })
})

test('get quote', () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                quote: [{gallons: 123}]
            })
        })
    )

    return getQuotes().then(result => {
        expect(global.fetch).toHaveBeenCalledWith(
            `${BASE_ENDPOINT}/quotes/?userID=undefined`,
            {"credentials": "same-origin", "method": "GET"}
        )
        expect(result).toEqual({quote: [{gallons: 123}]})
    })
})

test('get quote error', () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: false,
        })
    )

    return getQuotes().then(result => {
        expect(result).toEqual({error: true})
    })
})

test('create quote', () => {
    const mockData = {gallons: 123}
    global.fetch = jest.fn().mockReturnValue(Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            quotes: [mockData]
        })
    }))

    return createQuote(mockData).then(result => {
        expect(global.fetch).toHaveBeenCalledWith(
            `${BASE_ENDPOINT}/quotes`,
            {
                method: "POST",
                headers: HEADER,
                body: JSON.stringify(mockData),
                "credentials": "same-origin",
            }
        )
        expect(result).toEqual({quotes: [mockData]})
    })
})

test('create quote error', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false
      })
    )
  
    return createQuote({}).then(result => {
      expect(result).toEqual({error: true})
    })
  })

  test('delete quote', () => {
    const mockData = {key: 123}
    global.fetch = jest.fn().mockReturnValue(Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            userID: [mockData]
        })
    }))

    return deleteRecentQuote(mockData).then(result => {
        console.log(result)
        expect(global.fetch).toHaveBeenCalledWith(
            `${BASE_ENDPOINT}/quotes/?userID=${mockData}`,
            {
                method: 'DELETE',
                credentials: 'same-origin',
            }
        )
        expect(result).toEqual({userID: [mockData]})
    })
})

test('delete recent quote error',  () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false
      })
    )
  
    return deleteRecentQuote({}).then(result => {
      expect(result).toEqual({error: true})
    })
  })