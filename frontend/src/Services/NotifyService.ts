import { Notyf } from "notyf";
import 'notyf/notyf.min.css';

class NotifyService {

    private notification = new Notyf({
        duration: 3000,
        position: { x: "center", y: "top" },
        types: [{type: 'error', background: '#363430'}, {type: 'success', background: '#04173b'}]
    });

    public success(message: string): void {
        this.notification.success(message);
    }
    
    public error(err: any): void {
        const message = this.extractErrorMessage(err);
        this.notification.error(message);
    }

    private extractErrorMessage(err: any): string {

        if(typeof err === "string") return err;

        if(typeof err.response?.data === "string") return err.response.data;

        if(Array.isArray(err.response?.data)) return err.response.data[0];

        if(typeof err.message === "string") return err.message; 

        return "Something went wrong, please try again...";
    }
}

const notify = new NotifyService();

export default notify;