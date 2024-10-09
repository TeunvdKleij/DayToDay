import axios from "axios";
import cookies from "browser-cookies"
import Cookies from "js-cookie"

interface PostProps{
    callEndpoint: string
    resultFunctions: () => any
    errorFunctions?: () => any
    body: {}
}

export const getAxios = async ({callEndpoint, resultFunctions, errorFunctions, body} : PostProps) => {
    await axios.get(process.env.NEXT_PUBLIC_API_URL + callEndpoint, { headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` } })
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

export const getAxiosWithReturn = async ({callEndpoint, resultFunctions, errorFunctions, body} : PostProps) => {
    await axios.get(process.env.NEXT_PUBLIC_API_URL + callEndpoint, { headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` } })
    .then(res => {
        return resultFunctions();
    })
    .catch(error => {
        if(error.response.status === 401){
            Cookies.remove("accessToken")
        }
        if(errorFunctions) return errorFunctions();
        return null;
    });
}

