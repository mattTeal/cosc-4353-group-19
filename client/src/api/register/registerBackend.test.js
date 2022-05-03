import { createUser } from "./registerBackend";

const BASE_ENDPOINT = "http://localhost:8080/api";
const HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
}

afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
})

test('register user', () => {
    const mockData = {username: "username", password: "password", confirmpass: "password"}
    global.fetch = jest.fn().mockReturnValue(Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            login: [mockData]
        })
    }))

    return createUser(mockData).then(result => {
        expect(global.fetch).toHaveBeenCalledWith(
            `${BASE_ENDPOINT}/auth/register`,
            {
                method: "POST",
                headers: HEADER,
                body: JSON.stringify(mockData),
                "credentials": "same-origin",
            }
        )
        expect(result).toEqual({login: [mockData]})
    })
})

test('register failed', () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: false,
        })
    )

    return createUser().then(result => {
        expect(result).toEqual({error: true})
    })
})