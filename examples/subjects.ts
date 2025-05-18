import { createSubjects } from "@aryalabs/openauth/subject";
import { object, string } from "valibot";

export const subjects = createSubjects({
  user: object({
    id: string(),
  }),
});
