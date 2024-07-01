import db from "@/db/db";
import { nanoid } from "nanoid";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Please enter your email and password.");
        }

        const user = await db.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Please enter an existing email.");
        }

        if (!user.password) {
          throw new Error("Please enter a password.");
        }

        if (user.password !== credentials.password) {
          throw new Error("Please verify your password.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.image,
          username: user.username,
          role: user.role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
          username: token.username,
          image: token.picture,
        },
      };
    },

    async jwt({ token, user, account }) {
      if (account?.provider === "github" || account?.provider === "google") {
        const name = token.name;
        const email = token.email;
        const picture = token.picture;

        let dbUser = await db.user.findUnique({
          where: { email: token.email as string },
        });

        if (!dbUser) {
          dbUser = await db.user.create({
            data: {
              name,
              email,
              provider: account.provider,
              emailVerified: true,
              image: picture,
              role: account.provider === "google" ? "USER" : undefined,
            },
          });
        }

        return {
          ...token,
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
          role: dbUser.role,
        };
      }

      // Credentials provider
      const dbUser = await db.user.findFirst({
        where: { email: token.email },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      if (!dbUser.username) {
        await db.user.update({
          where: { id: dbUser.id },
          data: { username: nanoid(10) },
        });
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image,
        username: dbUser.username,
        role: dbUser.role,
      };
    },
  },
};

export const userServerSession = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  return session;
};
