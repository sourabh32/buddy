import http from "http"
import SocketService from "./services/socket"
import { startMessageConsumer } from "./services/kafka"
async function init(){
    startMessageConsumer()
    const socketService = new SocketService()
    const httpServer = http.createServer()
    socketService.io.attach(httpServer)
    const PORT = 8000

    

    httpServer.listen(PORT,()=>console.log(`server listening on ${PORT}`))
    socketService.initListeners()

}

// "dev": "tsc-watch --onSuccess \"node dist/index.js\"",


init()