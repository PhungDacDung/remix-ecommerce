import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { getUserById } from "~/models/user.server";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
    cookie: {
        name: "my_session", // Tên cookie
        secure: process.env.NODE_ENV === "production", // Chỉ HTTPS trong production
        secrets: [sessionSecret],
        sameSite: "lax",
        path: "/",
        httpOnly: true,
    },
});

export const getSession = (request: Request) => {
    return storage.getSession(request.headers.get("Cookie"));
};

export const commitSession = (session: any) => {
    return storage.commitSession(session);
};

/* export const destroySession = (session: any) => {
    return storage.destroySession(session);
}; */


export async function logout(request: Request) {
    const session = await getSession(request);
    return redirect("/", {
        headers: {
            "Set-Cookie": await storage.destroySession(session),
        },
    });
}


const USER_SESSION_KEY = "userId";

export async function createUserSession({
    request,
    userId,
}: {
    request: Request;
    userId: string;
}) {
    const session = await getSession(request);
    session.set(USER_SESSION_KEY, userId);

    return redirect("/", {
        headers: {
            "Set-Cookie": await storage.commitSession(session, {
                maxAge: 60 * 60 * 24 * 7 // 7 days,
            }),
        },
    });
}



export async function getUserId(
    request: Request
): Promise<string | undefined> {
    const session = await getSession(request);
    const userId = session.get(USER_SESSION_KEY);
    return userId;
}


export async function getUser(request: Request) {
    const userId = await getUserId(request);
    if (userId === undefined) return null;

    const userIdAsNumber: number = Number(userId);
    if (isNaN(userIdAsNumber)) {
        throw new Error("Invalid user ID");
    }

    const user = await getUserById(userIdAsNumber);
    if (user) return user;

    throw await logout(request);
}


export async function requireUserId(
    request: Request,
  ) {
    const userId = await getUserId(request);
    if (!userId) {
      throw redirect('/login');
    }
    return userId;
  }