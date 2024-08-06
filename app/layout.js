"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { PantryProvider } from "./context/PantryContext";
import { AuthContextProvider } from "./context/AuthContext";
import NavBar from "./components/navbar";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Pantry</title>
        <meta name='description' content='Description' />
      </head>
      <body className={inter.className}>
        <AuthContextProvider>
          <PantryProvider>
            <NavBar />
            {children}
          </PantryProvider>
        </AuthContextProvider>

      </body>
    </html>
  );
}