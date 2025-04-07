import { object, string } from "valibot"
import { createSubjects } from "@aryalabs/openauth/subject"

export const subjects = createSubjects({
  user: object({
    id: string(),
  }),
})
