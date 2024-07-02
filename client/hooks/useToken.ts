import cookies from "browser-cookies";

export const getTokenEmail = () => {
  const accessToken = cookies.get("accessToken");
  if(accessToken){
    let email = getDataFromToken(accessToken, "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress");
    return email;
  }
  return null;
}
export const getTokenId = () => {
  const accessToken = cookies.get("accessToken");
  let Id;
  if(accessToken){
    Id = getDataFromToken(accessToken, "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");
    return Id;
  }
  return null;
}
export const getDataFromToken = (token: string, key: string) => {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace('-', '+').replace('_', '/');
  let jsonPayload = JSON.parse(window.atob(base64));
  const value = jsonPayload[key];
  return value;
}
