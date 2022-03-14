const BASE_ENDPOINT = "http://localhost:8080/api";
const HEADER = {
    'Accept': 'application/json',
    'Content-type': 'application/json;charset=utf-8',
}

afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
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

    return (
        fetch(`${BASE_ENDPOINT}/profile`, {
            method:"GET",
            redirect:"follow",
        }).then(
            response => response.json()
        ).then(result => {
            expect(global.fetch).toHaveBeenCalledWith(
                `${BASE_ENDPOINT}/profile`,
                {"method": "GET", "redirect": "follow"}
            )
            expect(result).toEqual({user: [{name: 'MockUser'}]})
        })
    )
})

test('edit profile test', () => {
    const mockData = {firstName: "thename"}
    global.fetch = jest.fn().mockReturnValue(Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            profile: [mockData]
        })
    }))

    return (
        fetch(`${BASE_ENDPOINT}/profile`,
            {
                method: 'POST',
                header: HEADER,
                body: JSON.stringify(mockData)
            }
        ).then(
            response => response.json()
        ).then(result => {
            expect(global.fetch).toHaveBeenCalledWith(
                `${BASE_ENDPOINT}/profile`,
                {
                    method: 'POST',
                    header: HEADER,
                    body: JSON.stringify(mockData)
                }
            )
            expect(result).toEqual({profile: [mockData]})
        })
    )
})