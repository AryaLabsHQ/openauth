import { redirect } from "react-router";
import { client, setTokens } from "../../auth.server";
import type { Route } from "./+types/callback";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) return { error: "Missing code" };

  const exchanged = await client.exchange(code, `${url.origin}/api/auth/callback`);
  if (exchanged.err) return { error: exchanged.err };

  const headers = new Headers();
  await setTokens(headers, exchanged.tokens.access, exchanged.tokens.refresh);

  return redirect("/", { headers });
}
