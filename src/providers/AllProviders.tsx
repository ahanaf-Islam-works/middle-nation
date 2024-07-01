"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { FC, ReactNode } from "react";

interface AllProvidersProps {
  children: ReactNode;
}

const AllProviders: FC<AllProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};

export default AllProviders;
