import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      username?: string | null;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    username?: string | null;
    role: string;
  }
}

//export type Session["user"];

export type UserType = Session["user"];
