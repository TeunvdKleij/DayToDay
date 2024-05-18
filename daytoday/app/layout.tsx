import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TaskProvider from "@/providers/TaskProvider";
import NoteProvider from "@/providers/NoteProvider";
import GroupProvider from "@/providers/GroupProvider";
import { ToastContainer } from "react-toastify";
import MainProvider from "@/providers/MainProvider";

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
        <MainProvider>
          <GroupProvider>
            <TaskProvider>
              <NoteProvider>
                <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable
                  pauseOnHover
                  theme="colored"/>
                {children}
              </NoteProvider>
            </TaskProvider>
          </GroupProvider>
        </MainProvider>
      </body>
    </html>
  );
}
