import { redirect } from "react-router";
import { clearTokens } from "../../auth.server";

export async function loader() {
  const headers = new Headers();
  clearTokens(headers);
  return redirect("/", { headers });
}