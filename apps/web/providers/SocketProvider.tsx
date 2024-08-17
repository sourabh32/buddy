"use client"
import React, { useCallback, useContext, useEffect, useState } from "react"
import {io, Socket} from "socket.io-client"
const socketContext = React.createContext<SocketContext | null>(null)
interface SocketProviderProps {
    children? :React.ReactNode
}

interface SocketContext {
    sendMessage:(msg: string) => any;
    messages: string[];
}

export const useSocket = ()=>{
    const state = useContext(socketContext)
    if (!state) throw new Error("Socket context error")
    return state
}

export const SocketProvider : React.FC<SocketProviderProps> = ({ children }) => {
    const [socket,setSocket] = useState<Socket>()
    const [messages, setMessages] = useState<string[]>([]);
    useEffect(()=>{
        // const _socket = io("http://localhost:8000")
        // _socket.on("message", onMessageRec);
        // setSocket(_socket)
        // _socket.on("message", sendMessage)
        // return ()=>{_socket.disconnect()
        //     _socket.off("message")
        //     setSocket(undefined)
        // }

    },[])
    const onMessageRec = useCallback((msg: string) => {
        console.log("From Server Msg Rec", msg);
        const { message } = JSON.parse(msg) as { message: string };
        setMessages((prev) => [...prev, message]);
      }, []);
    const sendMessage:SocketContext['sendMessage'] = useCallback((msg)=>{ 
        if (socket){
            socket.emit("event:message",{message:msg})
            
        }
        
        console.log("message recived ",msg)},[socket])
    return (<socketContext.Provider value={{sendMessage,messages}}>
        { children }
    </socketContext.Provider>)
}