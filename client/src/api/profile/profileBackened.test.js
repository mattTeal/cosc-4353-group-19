import { editUser } from "./profileBackend";

const BASE_ENDPOINT = "http://localhost:8080/api";
const HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
}

afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
})

test('edit profile', () => {
    const mockData = {firstName: "thename"}
    global.fetch = jest.fn().mockReturnValue(Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            profile: [mockData]
        })
    }))

    return (
        editUser(mockData).then(result => {
            expect(global.fetch).toHaveBeenCalledWith(
                `${BASE_ENDPOINT}/profile`,
                {
                    method: 'POST',
                    headers: HEADER,
                    body: JSON.stringify(mockData),
                    credentials: 'same-origin'
                }
            )
            expect(result).toEqual({profile: [mockData]})
        })
    )
})

test('edit profile failed', () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: false,
        })
    )

    return editUser().then(result => {
        expect(result).toEqual({error: true})
    })
})