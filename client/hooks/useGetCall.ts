import axios from "axios";
import { toast } from "react-toastify";
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

export const getAxios = async ({callEndpoint, resultToatMessage, resultFunctions, errorToastMessage, errorFunctions, body} : PostProps) => {
    await axios.get(process.env.NEXT_PUBLIC_API_URL + callEndpoint, { headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` } })
    .then(res => {
        resultFunctions();
        if(resultToatMessage) toast.success(resultToatMessage);
    })
    .catch(error => {
        if(error.response.status === 401){
            Cookies.remove("accessToken")
        }
        if(errorToastMessage) toast.error(errorToastMessage)
        if(errorFunctions) errorFunctions();
    });
}

export const getAxiosWithReturn = async ({callEndpoint, resultToatMessage, resultFunctions, errorToastMessage, errorFunctions, body} : PostProps) => {
    await axios.get(process.env.NEXT_PUBLIC_API_URL + callEndpoint, { headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` } })
    .then(res => {
        if(resultToatMessage) toast.success(resultToatMessage);
        return resultFunctions();
    })
    .catch(error => {
        if(error.response.status === 401){
            Cookies.remove("accessToken")
        }
        if(errorToastMessage) toast.error(errorToastMessage)
        if(errorFunctions) return errorFunctions();
        return null;
    });
}

