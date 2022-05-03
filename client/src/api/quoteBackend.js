import { loginUser } from "./loginBackend"

const BASE_ENDPOINT = "http://localhost:8080/api"
const HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
}

export const getUser = async (key) => {
    return (
        await fetch(
            `${BASE_ENDPOINT}/profile/?userID=${key}`, 
        {
            method: 'GET',
            credentials: 'same-origin',
        }
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
    console.log("In create quote, data.userID = " + data.userID);
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

export const deleteRecentQuote = async (key) => {
    console.log("In delete quote, key = " + key);
    return (
        await fetch(
            `${BASE_ENDPOINT}/quotes/?userID=${key}`, 
        {
            method: 'DELETE',
            credentials: 'same-origin',
        }
        ).then(
            result => result.ok? result.json() : {error: true}
        )
    )
}