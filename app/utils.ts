import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

// import type { User } from "~/models/user.server";
import type { User } from "./models/user.server";

export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  
  if (route?.data && typeof route.data === 'object' && route.data !== null) {
    return route.data as Record<string, unknown>;  // Ép kiểu nếu kiểm tra hợp lệ
  }

  return undefined;  // Trả về undefined nếu dữ liệu không hợp lệ
}

function isUser(user: any): user is User {
  return user && typeof user === "object" && typeof user.email === "string";
}

export function useOptionalUser(): User | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}