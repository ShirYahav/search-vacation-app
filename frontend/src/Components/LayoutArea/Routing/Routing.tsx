import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import AddVacation from "../../AdminVacationsArea/AddVacation/AddVacation";
import AdminVacationList from "../../AdminVacationsArea/AdminVacationList/AdminVacationList";
import UpdateVacation from "../../AdminVacationsArea/UpdateVacation/UpdateVacation";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import ReportChart from "../../ChartArea/ReportChart/ReportChart";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {

    const [user, setUser] = useState<UserModel>(null);

    
    useEffect(() => {

        setUser(store.getState().authState.user);
        const unsubscribeMe = store.subscribe(() => {
            setUser(store.getState().authState.user);
        });
        return () => unsubscribeMe();

    }, []);

    return (
        <div className="Routing">
			<Routes>

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                {user?.role === "User" &&
                <>
                <Route path="/vacations" element={<VacationsList />} />
                <Route path="/" element={<Navigate to="/vacations" />} />
                </>
                }

                {user?.role === "Admin" &&
                <>
                <Route path="/vacations-admin" element={<AdminVacationList />} />
                <Route path="/vacations-admin/new" element={<AddVacation />} />
                <Route path="/update-vacation/:id" element={<UpdateVacation />} />
                <Route path="/report" element={<ReportChart />} />
                <Route path="/" element={<Navigate to="/vacations-admin" />} />
                </>
                }

                {user === null &&
                <Route path="/" element={<Navigate to="/login" />} />
                }

                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </div>
    );
}

export default Routing;
