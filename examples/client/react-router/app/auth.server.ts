import { createClient } from "@aryalabs/openauth/client";
import { createCookie } from "react-router";
import { subjects } from "@aryalabs/openauth-shared";

export const client = createClient({
  clientID: "react-router",
  issuer: "http://localhost:3000",
});

export const accessCookie  = createCookie("access_token",  {
  httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 400,
});

export const refreshCookie = createCookie("refresh_token", {
  httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 400,
});

export async function setTokens(resHeaders: Headers, access: string, refresh: string) {
  resHeaders.append("Set-Cookie", await accessCookie.serialize(access));
  resHeaders.append("Set-Cookie", await refreshCookie.serialize(refresh));
}

export async function clearTokens(resHeaders: Headers) {
  resHeaders.append("Set-Cookie", await accessCookie.serialize("", { maxAge: 0 }));
  resHeaders.append("Set-Cookie", await refreshCookie.serialize("", { maxAge: 0 }));
}

export async function verifySubject(request: Request) {
  const cookieHdr = request.headers.get("cookie") ?? "";
  const access  = await accessCookie.parse(cookieHdr);
  const refresh = await refreshCookie.parse(cookieHdr);

  if (!access) return false;

  const verified = await client.verify(subjects, access, { refresh });
  if (verified.err) return false;

  // rotate tokens if server returned new ones
  if (verified.tokens) {
    const headers = new Headers();
    await setTokens(headers, verified.tokens.access, verified.tokens.refresh);
    return { subject: verified.subject, headers };
  }

  return { subject: verified.subject };
}
