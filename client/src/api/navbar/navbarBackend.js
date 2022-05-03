const BASE_ENDPOINT = "http://localhost:8080/api"
const HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
}

export const logoutUser = async () => {
    return (
        await fetch(
            `${BASE_ENDPOINT}/auth/logout`, 
        {
            method: 'POST',
            redirect: 'follow',
            headers: HEADER,
            credentials: 'same-origin'
        }
        ).then(
            result => result.ok ? result.json() : {error: true}
        )
    )
}