'use client';

import "@saleor/macaw-ui/next/style";
import "../styles/globals.css";

import { AppBridge, AppBridgeProvider } from "@saleor/app-sdk/app-bridge";
import React from "react";

import { ThemeSynchronizer } from "../lib/theme-synchronizer";
import { GraphQLProvider } from "../providers/GraphQLProvider";
import { ThemeProvider } from "@saleor/macaw-ui/next";

/**
 * Ensure instance is a singleton.
 * TODO: This is React 18 issue, consider hiding this workaround inside app-sdk
 */
const appBridgeInstance = typeof window !== "undefined" ? new AppBridge() : undefined;

export default function RootLayout ({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <AppBridgeProvider appBridgeInstance={appBridgeInstance}>
            <GraphQLProvider>
                <ThemeProvider >
                    <ThemeSynchronizer />
                    {children}
                </ThemeProvider>
            </GraphQLProvider>
        </AppBridgeProvider>
    );
}