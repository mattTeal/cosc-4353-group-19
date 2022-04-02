const BASE_ENDPOINT = "http://localhost:8080/api"
const HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
}

export const getUser = async () => {
    return (
        await fetch(
            `${BASE_ENDPOINT}/profile`
        ).then(
            result => result.ok? result.json() : {error: true}
        )
    )
}

export const getQuotes = async (key) => {
    return (
        await fetch(
            `${BASE_ENDPOINT}/quotes/?userID=${key}`,
            {
                method: 'GET',
                credentials: 'same-origin',
                //headers: HEADER
            }
        ).then(
            result => result.ok? result.json() : {error: true}
        )
    )
}

export const createQuote = async (data) => {
    return (
        await fetch(
            `${BASE_ENDPOINT}/quotes`,
            {
                method: "POST",
                headers: HEADER,
                body: JSON.stringify(data),
                credentials: 'same-origin'
            }
        ).then(
            result => result.ok ? result.json() : {error: true}
        )
    )
}