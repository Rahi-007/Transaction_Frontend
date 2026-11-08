"use client";

import Providers from "./storeProvider";
import { Toaster } from "react-hot-toast";
// import { ThemeProvider } from "./themeProvider";

export default function ProviderConfig({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      {/* <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange> */}
      {children}
      <Toaster
        position="top-right"
        // reverseOrder={false}
        // gutter={8}
        containerStyle={{
          top: "65px",
          left: 0,
        }}
        toastOptions={{
          className: "slide-toast",
          duration: 3000,
        }}
      />
      {/* </ThemeProvider> */}
    </Providers>
  );
}
