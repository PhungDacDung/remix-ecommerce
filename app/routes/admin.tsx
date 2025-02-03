
import { requireUserId } from "~/services/session.server";
import { json, LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request}: LoaderFunctionArgs) {
    await requireUserId(request);
    console.log("check admin login");
    
    return json({});
}