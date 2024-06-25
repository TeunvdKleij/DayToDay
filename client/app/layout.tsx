import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TaskProvider from "@/providers/TaskProvider";
import NoteProvider from "@/providers/NoteProvider";
import GroupProvider from "@/providers/GroupProvider";
import { ToastContainer } from "react-toastify";
import MainProvider from "@/providers/MainProvider";
import UserProvider, {UserContext} from "@/providers/UserProvider";
import Login from "@/components/Account/Login/Login";
import Navbar from "@/components/Navigation/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DayToDay",
  description: "App to organize daily tasks",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode; }>) {
  return (
      <html lang="en" id="htmlTag" className="bg-dark-mode">
      <head>
            <link rel="manifest" href="/manifest.json"/>
      </head>
      <body>
      <MainProvider>
        <GroupProvider>
          <TaskProvider>
            <NoteProvider>
              <UserProvider>
                <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="colored"/>
                  <Navbar/>
                  {children}
              </UserProvider>
            </NoteProvider>
          </TaskProvider>
        </GroupProvider>
      </MainProvider>
      </body>
      </html>
  );
}
