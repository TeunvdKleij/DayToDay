import axios from "axios";
import { toast } from "react-toastify";
import cookies from "browser-cookies"

interface PostProps{
    callEndpoint: string
    resultToatMessage?: string
    resultFunctions: () => any
    errorToastMessage?: string
    errorFunctions?: () => any
    body: {}
}

export const postAxios = async ({callEndpoint, resultToatMessage, resultFunctions, errorToastMessage, errorFunctions, body} : PostProps) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL + callEndpoint, body, { headers: { Authorization: `Bearer ${cookies.get("accessToken")}` } })
    .then(res => {
        resultFunctions();
        if(resultToatMessage) toast.success(resultToatMessage);
    })
    .catch(error => {
        if(error.response.status === 401){
            cookies.erase("accessToken")
        }
        if(errorToastMessage) toast.error(errorToastMessage)
        if(errorFunctions) errorFunctions();
    });
}

export const postAxiosWithReturn = async ({callEndpoint, resultToatMessage, resultFunctions, errorToastMessage, errorFunctions, body} : PostProps) => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL + callEndpoint, body, { headers: { Authorization: `Bearer ${cookies.get("accessToken")}` } })
    .then(res => {
        if(resultToatMessage) toast.success(resultToatMessage);
        return resultFunctions();
    })
    .catch(error => {
        if(error.response.status === 401){
            cookies.erase("accessToken")
        }
        if(errorToastMessage) toast.error(errorToastMessage)
        if(errorFunctions) return errorFunctions();
        return null
    });
}