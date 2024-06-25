import Cookies from "js-cookie";
import {getCookie} from "@/hooks/useCookie";

function useToken() {
  const getTokenEmail = () => {
    const accessToken = getCookie("accessToken");
    let Id;
    if(accessToken){
      Id = getDataFromToken(accessToken, "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress");
      return Id;
    }
    return null;
  }
  const getTokenId = () => {
    const accessToken = getCookie("accessToken");
    let Id;
    if(accessToken){
      Id = getDataFromToken(accessToken, "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");
      return Id;
    }
    return null;
  }
  const getDataFromToken = (token: string, key: string) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    let jsonPayload = JSON.parse(window.atob(base64));
    const value = jsonPayload[key];
    return value;
  }
  return [getTokenEmail, getTokenId];
}
export default useToken;