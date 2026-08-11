import { jwtDecode } from "jwt-decode";

const NAME_IDENTIFIER_CLAIM =
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";

const EMAIL_CLAIM =
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";

const NAME_CLAIM =
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";

const ROLE_CLAIM =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

interface JwtPayload {
  [key: string]: unknown;
  exp?: number;
  iss?: string;
  aud?: string;
}

export const decodeJwt = (token: string): JwtPayload => {
  return jwtDecode<JwtPayload>(token);
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = decodeJwt(token);

    if (typeof payload.exp !== "number") {
      return true;
    }

    return payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
};

export const getUserFromToken = (token: string) => {
  const payload = decodeJwt(token);

  const roleClaim = payload[ROLE_CLAIM];

  const roles =
    typeof roleClaim === "string"
      ? [roleClaim]
      : Array.isArray(roleClaim)
        ? roleClaim.filter(
            (role): role is string => typeof role === "string"
          )
        : [];

  return {
    identityUserId:
      typeof payload[NAME_IDENTIFIER_CLAIM] === "string"
        ? payload[NAME_IDENTIFIER_CLAIM]
        : "",

    email:
      typeof payload[EMAIL_CLAIM] === "string"
        ? payload[EMAIL_CLAIM]
        : "",

    username:
      typeof payload[NAME_CLAIM] === "string"
        ? payload[NAME_CLAIM]
        : "",

    roles,
  };
};