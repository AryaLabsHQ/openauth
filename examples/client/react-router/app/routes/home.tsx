import type { subjects } from "@aryalabs/openauth-shared";
import type { SubjectPayload } from "@aryalabs/openauth/subject";
import { useRouteLoaderData } from "react-router";
import type { loader } from "~/root";
import { Welcome } from "../welcome/welcome";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function Home() {
  const data = useRouteLoaderData<typeof loader>("root");
  const subject = data?.subject as SubjectPayload<typeof subjects>;

  return <Welcome subject={subject} />;
}
