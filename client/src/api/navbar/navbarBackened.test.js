import { logoutUser } from './navbarBackend'

const BASE_ENDPOINT = "http://localhost:8080/api";
const HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
}

afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
})

test('logout user', () => {
    global.fetch = jest.fn().mockReturnValue(Promise.resolve({
        ok: true,
        json: () => Promise.resolve()
    }))

    return logoutUser().then(result => {
        expect(global.fetch).toHaveBeenCalledWith(
            `${BASE_ENDPOINT}/auth/logout`,
            {
                method: "POST",
                headers: HEADER,
                "redirect": "follow",
                "credentials": "same-origin",
            }
        )
    })
})

test('login failed', () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: false,
        })
    )

    return logoutUser().then(result => {
        expect(result).toEqual({error: true})
    })
})