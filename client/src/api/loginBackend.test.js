import { loginUser } from "./loginBackend";

const BASE_ENDPOINT = "http://localhost:8080/api";
const HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
}

afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
})

test('login user', () => {
    const mockData = {username: "username", password: "password"}
    global.fetch = jest.fn().mockReturnValue(Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            login: [mockData]
        })
    }))

    return loginUser(mockData).then(result => {
        expect(global.fetch).toHaveBeenCalledWith(
            `${BASE_ENDPOINT}/auth/login`,
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

test('login failed', () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: false,
        })
    )

    return loginUser().then(result => {
        expect(result).toEqual({error: true})
    })
})