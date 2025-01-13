import { ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import { createUserSession } from "../../services/session.server"
import prisma from "~/client";



export default async function ActionLogin({ request, context }: ActionFunctionArgs) {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;


    const user = await verifyLogin(email, password);

    if (user) {
        return createUserSession({
            request,
            userId: user.id.toString(),
        });
    }
    else {
        return undefined;
    }


}

async function verifyLogin(email: string, password: string) {
    const user = await prisma.user.findFirst({ where: { email } })

    if (user) {
        if (user.password === password) {
            return user;
        }
    }
    else {
        throw new Error("User not exist!");

    }
}

export async function getUserById(userId:number) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    // Kiểm tra nếu không tìm thấy người dùng
    if (!user) {
        throw new Error("User not found");
    }

    return user;
}