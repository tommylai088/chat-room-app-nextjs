import config from "@/libs/config/app.config";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";


async function refreshToken(token: JWT): Promise<JWT> {
    const res = await fetch(config.API_HOST + "/auth/refresh", {
        method: "POST",
        headers: {
            authorization: `Refresh ${token.refreshToken}`,
        },
    });

    const response = await res.json();
    return {
        ...token,
        ...response,
    };
}


const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;
                const { username, password } = credentials;
                const res = await fetch(config.API_HOST + "/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (res.status == 401) {
                    return null;
                }
                const user = await res.json();
                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) return { ...token, ...user };
            if (new Date().getTime() < token?.expiresIn)
                return token;

            return await refreshToken(token);
        },

        async session({ token, session }) {
            session.user = token.user;
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.expiresIn = token.expiresIn;

            return session;
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl;
        }
    }
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
