import axios from "axios";
import cookies from "browser-cookies"
import Cookies from "js-cookie"

interface PostProps{
    callEndpoint: string
    resultToatMessage?: string
    resultFunctions: () => any
    errorToastMessage?: string
    errorFunctions?: () => any
    body: {}
}

export const postAxios = async ({callEndpoint, resultToatMessage, resultFunctions, errorToastMessage, errorFunctions, body} : PostProps) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL + callEndpoint, body, { headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` } })
    .then(res => {
        resultFunctions();
    })
    .catch(error => {
        if(error.response.status === 401){
            Cookies.remove("accessToken")
        }
        if(errorFunctions) errorFunctions();
    });
}

export const postAxiosWithReturn = async ({callEndpoint, resultToatMessage, resultFunctions, errorToastMessage, errorFunctions, body} : PostProps) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL + callEndpoint, body, { headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` } })
    .then(res => {
        return resultFunctions();
    })
    .catch(error => {
        if(error.response.status === 401){
            Cookies.remove("accessToken")
        }
        if(errorFunctions) return errorFunctions();
        return null
    });
}