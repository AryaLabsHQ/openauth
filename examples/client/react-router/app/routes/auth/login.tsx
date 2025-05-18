import { Form, redirect } from "react-router";
import { client, verifySubject } from "../../auth.server";
import type { Route } from "./+types/login";

export async function action({ request }: Route.ActionArgs) {
  const verified = await verifySubject(request);
  if (verified) return redirect("/");

  const host = request.headers.get("host")!;
  const protocol = host.includes("localhost") ? "http" : "https";
  const { url } = await client.authorize(`${protocol}://${host}/api/auth/callback`, "code");
  return redirect(url);
}

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Login to OpenAuth</h2>
      <p className="mb-4">Please login to access your dashboard.</p>
      <div className="mt-4">
        <Form method="post">
          <button type="submit">Login</button>
        </Form>
      </div>
    </div>
  );
}
