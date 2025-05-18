import { issuer } from "@aryalabs/openauth";
import { PasswordProvider } from "@aryalabs/openauth/provider/password";
import { CloudflareStorage } from "@aryalabs/openauth/storage/cloudflare";
import { PasswordUI } from "@aryalabs/openauth/ui/password";
import type { ExecutionContext, KVNamespace } from "@cloudflare/workers-types";
import { subjects } from "../../subjects.js";

interface Env {
  CloudflareAuthKV: KVNamespace;
}

async function getUser(email: string) {
  // Get user from database
  // Return user ID
  return "123";
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return issuer({
      storage: CloudflareStorage({
        namespace: env.CloudflareAuthKV,
      }),
      subjects,
      providers: {
        password: PasswordProvider(
          PasswordUI({
            sendCode: async (email, code) => {
              console.log(email, code);
            },
          }),
        ),
      },
      success: async (ctx, value) => {
        if (value.provider === "password") {
          return ctx.subject("user", {
            id: await getUser(value.email),
          });
        }
        throw new Error("Invalid provider");
      },
    }).fetch(request, env, ctx);
  },
};
