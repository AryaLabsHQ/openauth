export {
  /**
   * @deprecated
   * Use `import { createClient } from "@aryalabs/openauth/client"` instead - it will tree shake better
   */
  createClient,
} from "./client.js";

export {
  /**
   * @deprecated
   * Use `import { createSubjects } from "@aryalabs/openauth/subject"` instead - it will tree shake better
   */
  createSubjects,
} from "./subject.js";

import { issuer } from "./issuer.js";

export {
  /**
   * @deprecated
   * Use `import { issuer } from "@aryalabs/openauth"` instead, it was renamed
   */
  issuer as authorizer,
  issuer,
};
