const BASE_ENDPOINT = "http://localhost:8080/api"
const HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
}

export const getUser = async () => {
    try {
        let res = await fetch(`${BASE_ENDPOINT}/profile`);
        return res.json();
    } catch (error) {
        console.log(error)
    }
    // await fetch(
    //     `${BASE_ENDPOINT}/profile`
    // ).then(
    //     result => result.json()
    // ).catch((error) => {
    //     console.error('Error: ', error)
    // })
    
}

export const getQuotes = async () => {
    return (
        await fetch(
            `${BASE_ENDPOINT}/quotes`
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
                body: JSON.stringify(data)
            }
        ).then(
            result => result.ok ? result.json() : {error: true}
        )
    )
}