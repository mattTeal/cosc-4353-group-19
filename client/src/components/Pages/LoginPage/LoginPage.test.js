const BASE_ENDPOINT = "http://localhost:8080/api";
const HEADER = {
    'Accept': 'application/json',
    'Content-type': 'application/json;charset=utf-8',
}

afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
})

test('test login post', () => {
    const mockData = {username: "username", password: "password"}
    global.fetch = jest.fn().mockReturnValue(Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            login: [mockData]
        })
    }))

    return (
        fetch(
            `${BASE_ENDPOINT}/login`,
            {
                method: 'POST',
                header: HEADER,
                body: JSON.stringify(mockData)
            }
        ).then(
            response => response.json()
        ).then(result => {
            expect(global.fetch).toHaveBeenCalledWith(
                `${BASE_ENDPOINT}/login`,
                {
                    method: 'POST',
                    header: HEADER,
                    body: JSON.stringify(mockData)
                }
            )
            expect(result).toEqual({login: [mockData]})
        })
    )
})