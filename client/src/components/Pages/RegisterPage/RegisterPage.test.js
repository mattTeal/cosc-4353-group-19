const BASE_ENDPOINT = "https://localhost:8080/api"
const HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
}

afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
})