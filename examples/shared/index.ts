import { createSubjects } from "@aryalabs/openauth";
import { SubjectPayload } from "@aryalabs/openauth/subject";
import { z } from "zod";

export const subjects = createSubjects({
  user: z.object({
    id: z.string(),
  }),
});
