import JwtDecode from "jwt-decode";

export const CLIENT_ID = "dscatalog";
export const CLIENT_SECRET = "dscatalog123";

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: string;
  scope: string;
  firsName: string;
  userId: string;
};

export type Role = "ROLE_OPERATOR" | "ROLE_ADMIN";

type AccessToken = {
  exp: number;
  user_name: string;
  authorities: Role[];
};

export const SaveSessionData = (loginResponse: LoginResponse) => {
  localStorage.setItem("authData", JSON.stringify(loginResponse));
};

export const getSessionData = () => {
  const sessionData = localStorage.getItem("authData") ?? "{}";
  const parsedSessionData = JSON.parse(sessionData);
  return parsedSessionData as LoginResponse;
};

export const getAccessTokenDecoded = () => {
  const sessionData = getSessionData();
  const tokenDecoded = JwtDecode(sessionData.access_token);
  return tokenDecoded as AccessToken;
};

export const isTokenValid = () => {
  const { exp } = getAccessTokenDecoded();
 return Date.now() <= exp * 1000;

};

export const isAuthenticated = () => {
  const sessionData = getSessionData();
  return sessionData.access_token && isTokenValid();
};

export const isAllowedByRole=(routeRoles:Role[]=[])=>{
  if(routeRoles.length===0) return true;
  const {authorities}=getAccessTokenDecoded();
  return routeRoles.some(role=>authorities.includes(role));
}