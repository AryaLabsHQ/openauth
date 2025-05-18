/**
 * The UI that's displayed when loading the root page of the OpenAuth server. You can configure
 * which providers should be displayed in the select UI.
 *
 * ```ts
 * import { Select } from "@aryalabs/openauth/ui/select"
 *
 * export default issuer({
 *   select: Select({
 *     providers: {
 *       github: {
 *         hide: true
 *       },
 *       google: {
 *         display: "Google"
 *       }
 *     }
 *   })
 *   // ...
 * })
 * ```
 *
 * @packageDocumentation
 */
/** @jsxImportSource hono/jsx */

import { Layout } from "./base.js";
import {
  ICON_APPLE,
  ICON_CODE,
  ICON_GITHUB,
  ICON_GOOGLE,
  ICON_META,
  ICON_MICROSOFT,
  ICON_PASSWORD,
  ICON_SLACK,
  ICON_TWITCH,
  ICON_X,
} from "./icon.js";

export interface SelectProps {
  /**
   * An object with all the providers and their config; where the key is the provider name.
   *
   * @example
   * ```ts
   * {
   *   github: {
   *     hide: true
   *   },
   *   google: {
   *     display: "Google"
   *   }
   * }
   * ```
   */
  providers?: Record<
    string,
    {
      /**
       * Whether to hide the provider from the select UI.
       * @default false
       */
      hide?: boolean;
      /**
       * The display name of the provider.
       */
      display?: string;
    }
  >;
}

export function Select(props?: SelectProps) {
  return async (providers: Record<string, string>, _req: Request): Promise<Response> => {
    const jsx = (
      <Layout>
        <div data-component="form">
          {Object.entries(providers).map(([key, type]) => {
            const match = props?.providers?.[key];
            if (match?.hide) return;
            const icon = ICON[key];
            return (
              <a href={`/${key}/authorize`} data-component="button" data-color="ghost">
                {icon && <i data-slot="icon">{icon}</i>}
                Continue with {match?.display || DISPLAY[type] || type}
              </a>
            );
          })}
        </div>
      </Layout>
    );

    return new Response(jsx.toString(), {
      headers: {
        "Content-Type": "text/html",
      },
    });
  };
}

const DISPLAY: Record<string, string> = {
  twitch: "Twitch",
  google: "Google",
  github: "GitHub",
  apple: "Apple",
  x: "X",
  facebook: "Facebook",
  microsoft: "Microsoft",
  slack: "Slack",
};

const ICON: Record<string, any> = {
  code: ICON_CODE,
  password: ICON_PASSWORD,
  twitch: ICON_TWITCH,
  google: ICON_GOOGLE,
  github: ICON_GITHUB,
  apple: ICON_APPLE,
  x: ICON_X,
  microsoft: ICON_MICROSOFT,
  facebook: ICON_META,
  meta: ICON_META,
  slack: ICON_SLACK,
};
