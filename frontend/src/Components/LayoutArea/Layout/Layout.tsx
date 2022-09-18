import { useEffect } from "react";
import socketService from "../../../Services/SocketService";
import Routing from "../../LayoutArea/Routing/Routing";
import Header from "../Header/Header";
import "./Layout.css";

function Layout(): JSX.Element {
    
    useEffect(() => {
        window.document.title = "vacations";

        socketService.connect();
        return () => { 
            socketService.disconnect();
        }
    },[]);  

    return (
        <div className="Layout">
            <header>
                <Header />
            </header>
            <main>
			    <Routing />
            </main>
        </div>
    );
}

export default Layout;
