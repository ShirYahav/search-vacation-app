import { io, Socket } from "socket.io-client";
import store from "../Redux/Store";
import { addVacationAction, deleteVacationAction, updateVacationAction } from "../Redux/VacationsState";
import config from "../Utils/Config";

class SocketService {
    private socket: Socket;

    public connect(): void {
        this.socket = io(config.appUrl);

        this.socket.on("msg-from-server-add", (addedVacation: any) => {
            store.dispatch(addVacationAction(addedVacation));
        });
        
        this.socket.on("msg-from-server-update", (updatedVacation: any) => {
            store.dispatch(updateVacationAction(updatedVacation));
        });

        this.socket.on("msg-from-server-delete", (id: number) => {
            store.dispatch(deleteVacationAction(id));
        });

    }

    public sendAdd(addedVacation: any): void {
        this.socket.emit("msg-from-client-add", addedVacation);
    }

    public sendUpdate(updatedVacation: any): void {
        this.socket.emit("msg-from-client-update", updatedVacation);
    }
    public sendDelete(id: number): void {
        this.socket.emit("msg-from-client-delete", id);
    }

    public disconnect(): void {
        this.socket.disconnect();
    }

}

const socketService = new SocketService();

export default socketService;