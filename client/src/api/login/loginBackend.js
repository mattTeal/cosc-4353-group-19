const BASE_ENDPOINT = "http://localhost:8080/api"
const HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
}

export const loginUser = async (data) => {
    return (
        await fetch(
            `${BASE_ENDPOINT}/auth/login`, 
        {
            method: 'POST',
            headers: HEADER,
            body: JSON.stringify(data),
            credentials: 'same-origin'
        }
        ).then(
            result => result.ok ? result.json() : {error: true}
        )
    )
}