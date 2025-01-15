
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { requireUserId } from "./session.server";

export async function loaderAuth({ request}: LoaderFunctionArgs) {
    await requireUserId(request);
  
    return json({});
}