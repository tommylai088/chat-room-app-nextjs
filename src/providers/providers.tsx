"use client";

import { MessagesProvider } from "@/contexts/messages/MessagesContext";
import { ChakraProviders } from "./chakraProviders";
import { NextAuthSessionProvider } from "./nextAuthSessionProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextAuthSessionProvider>
            <ChakraProviders>
                <MessagesProvider>
                    {children}
                </MessagesProvider>
            </ChakraProviders>
        </NextAuthSessionProvider>
    )
}