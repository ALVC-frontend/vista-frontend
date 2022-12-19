"use client";

import { ReactNode } from "react";

import "../styles/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head />
      <body className="font-poppins overflow-x-hidden max-w-[100vw]">
        {children}
      </body>
    </html>
  );
}
