import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationsService";
import VacationCardAdmin from "../VacationCardAdmin/VacationCardAdmin";
import "./AdminVacationList.css";
import { RiMapPinAddFill } from 'react-icons/ri';
import { BsFillBarChartLineFill } from "react-icons/bs";
import socketService from "../../../Services/SocketService";


function AdminVacationList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        
        vacationService.fetchVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => notify.error(err));
        
        const unSubscribeMe = store.subscribe(() => {
            vacationService.fetchVacations()
                .then(vacations => setVacations([...vacations]))
                .catch(err => notify.error(err));
        });

        return () => unSubscribeMe()

    }, []);

    async function deleteVacation(vacationId: number) {
        try {
            if (window.confirm('Are you sure you want to continue?')){
                await vacationService.deleteOneVacation(vacationId);
                socketService.sendDelete(vacationId);
                notify.success("Vacation has been deleted");
                const newVacations = [...vacations];
                const indexToDelete = newVacations.findIndex(v => v.id === vacationId);
                newVacations.splice(indexToDelete, 1);
                setVacations(newVacations);
            }else {
                navigate("/vacations-admin");
            }
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="VacationsList">
            <h1 className="OurVacations">Our Vacations</h1>

            <NavLink to="/vacations-admin/new">
                <button className="AddButton">Add Vacation <RiMapPinAddFill></RiMapPinAddFill> </button>
            </NavLink>

            <NavLink to="/report">
                <button className="ReportButton">See Report <BsFillBarChartLineFill style={{width: '20px', height: "15px"}}></BsFillBarChartLineFill> </button>
            </NavLink>

            <div className="Vacations">
                {vacations.map(v => <VacationCardAdmin key={v.id} vacation={v} deleteVacation = {deleteVacation} />)}
            </div>
        </div>
    );
}

export default AdminVacationList;
