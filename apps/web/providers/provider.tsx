"use client"
// import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import { SocketProvider } from "./SocketProvider";

export const Providers = ({children}: {children: React.ReactNode}) => {
    return (





        <SessionProvider>
            <SocketProvider>

            {children}
            </SocketProvider>
        </SessionProvider>



    )
   
}