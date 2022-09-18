import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationsService";
import VacationsCard from "../VacationsCard/VacationsCard";
import "./VacationsList.css";

function VacationsList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    
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


    return (
        <div className="VacationsList">
            <h1 className="OurVacations">Our Vacations</h1>
            <div className="Vacations">
                {vacations.map(v => <VacationsCard key={v.id} vacation={v} />)}
            </div>
        </div>
    );
}

export default VacationsList;
