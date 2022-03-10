const BASE_ENDPOINT = "https://www.localhost:8080/users"
const HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
}

export const getQuotes = () => {
    return (
        fetch(
            `${BASE_ENDPOINT}/quotes`
        ).then(
            result => result.ok? result.json() : {error: true}
        )
    )
}

export const createQuote = (data) => {
    return (
        fetch(
            `${BASE_ENDPOINT}/quotes`,
            {
                method: "POST",
                headers: HEADER,
                body: JSON.stringify(data)
            }
        ).then(
            result => result.ok ? result.json() : {error: true}
        )
    )
}