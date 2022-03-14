const BASE_ENDPOINT = "https://localhost:8080/api"
const HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
}

afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
})

test('test register post', () => {
    const mockData = {username: "username", password: "password", confirmpassword: "password"}
    global.fetch = jest.fn().mockReturnValue(Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            register: [mockData]
        })
    }))

    return (
        fetch(
            `${BASE_ENDPOINT}/register`,
            {
                method: 'POST',
                header: HEADER,
                body: JSON.stringify(mockData)
            }
        ).then(
            response => response.json()
        ).then(result => {
            expect(global.fetch).toHaveBeenCalledWith(
                `${BASE_ENDPOINT}/register`,
                {
                    method: 'POST',
                    header: HEADER,
                    body: JSON.stringify(mockData)
                }
            )
            expect(result).toEqual({register: [mockData]})
        })
    )
})