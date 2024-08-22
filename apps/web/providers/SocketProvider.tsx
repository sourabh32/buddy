"use client"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"
import {useSession} from "next-auth/react";
import {Providers} from "./provider";
const socketContext = React.createContext<SocketContext | null>(null)

interface SocketProviderProps {
    children?: React.ReactNode
}

interface SocketContext {
    sendMessage: ({ conversationId, message }: { conversationId: string, message: string,senderId:string }) => void;
    joinConversation: ({ conversationId }: { conversationId: string }) => void;
    messages: string[];
}

export const useSocket = () => {
    const state = useContext(socketContext)
    if (!state) throw new Error("Socket context error")
    return state
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    // const session = useSession()
    const [socket, setSocket] = useState<Socket | null>(null)
    const [messages, setMessages] = useState<string[]>([])

    useEffect(() => {
        const _socket = io("http://localhost:8000")
        _socket.on("message", onMessageRec)
        setSocket(_socket)

        return () => {
            _socket.disconnect()
            _socket.off("message")
            setSocket(null)
        }
    }, [])

    const joinConversation: SocketContext['joinConversation'] = useCallback(({ conversationId }) => {
        if (socket) {
            socket.emit("event:join", { conversationId })
        }
    }, [socket])

    const onMessageRec = useCallback((msg: string) => {
        console.log("From Server Msg Rec", msg)
        // const { message } = JSON.parse(msg) as { message: string,conversationId:string }
        setMessages((prev) => [...prev, msg])
    }, [])

    const sendMessage: SocketContext['sendMessage'] = useCallback(({ conversationId, message,senderId }) => {
        console.log(conversationId,message)
        if (socket) {
            socket.emit("event:message", { conversationId, message,senderId})
        }
    }, [socket])

    return (

        <socketContext.Provider value={{ sendMessage, joinConversation, messages }}>
            {children}
        </socketContext.Provider>

    )
}
