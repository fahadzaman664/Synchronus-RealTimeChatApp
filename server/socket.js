import { Server as SocketIOServer } from "socket.io";
const setUpSocket = (server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ["GET", "POST"],
            credentials: true
        }
    })

    const userSocketMap = new Map();

    // when user disconnect from, removing from userSocketMap
  const disconnect = (socket)=>{
      console.log("user disconnected", socket.id);

      for(const [userId, socketId] of userSocketMap.entries()){
        if(socketId === socket.id){
            userSocketMap.delete(userId);
            break;
        }
      }
  }
    // whenver we will be connecting with sockets we will be sending userID from frontend
    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;
        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`user connected: ${userId} with socket ID: ${socket.id}`)
        }
        else {
            console.log("user id is not provided during connection...")
        }

        socket.on("disconnect", ()=>disconnect(socket));
    })
}
export default setUpSocket;