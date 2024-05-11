import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TaskProvider from "@/providers/TaskProvider";
import NoteProvider from "@/providers/NoteProvider";
import GroupProvider from "@/providers/GroupProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DayToDay",
  description: "App to organize daily tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-dark-mode">
      <GroupProvider>
        <TaskProvider>
          <NoteProvider>
            {children}
          </NoteProvider>
        </TaskProvider>
      </GroupProvider>
      </body>
    </html>
  );
}
