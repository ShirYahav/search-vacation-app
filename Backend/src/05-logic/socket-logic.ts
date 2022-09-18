import { Server as HttpServer } from "http";
import { Server as SocketIoServer, Socket } from "socket.io";

function socketLogic(httpServer: HttpServer): void {

    const socketIoServer = new SocketIoServer(httpServer, { cors: { origin: "http://localhost:3000" } });

    socketIoServer.sockets.on("connection", (socket: Socket) => {

        console.log("Client has been connected");

        socket.on("msg-from-client-add", (addedVacation) => {
            socket.broadcast.emit("msg-from-server-add", addedVacation);
        });

        socket.on("msg-from-client-update", (updatedVacation) => {
            socket.broadcast.emit("msg-from-server-update", updatedVacation);
        });

        socket.on("msg-from-client-delete", (id) => {
            socket.broadcast.emit("msg-from-server-delete", id);
        });

        socket.on("disconnect", () => {
            console.log("Client has been disconnect");
        });

    });

}

export default socketLogic;