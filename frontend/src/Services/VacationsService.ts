import axios from "axios";
import VacationModel from "../Models/VacationModel";
import store from "../Redux/Store";
import { addVacationAction, deleteVacationAction, fetchVacationsAction, updateVacationAction } from "../Redux/VacationsState";
import config from "../Utils/Config";

class VacationsService {

    public async fetchVacations(): Promise<VacationModel[]> {
        if(store.getState().vacationsState.vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(config.vacationsUrl);
            const vacations = response.data;
            store.dispatch(fetchVacationsAction(vacations));
        }
        return store.getState().vacationsState.vacations;
    }

    public async getOneVacation(id: number): Promise<VacationModel> {
        let vacation = store.getState().vacationsState.vacations.find(v => v.id === id);
        if(!vacation) {
            const response = await axios.get<VacationModel>(config.vacationsUrl + id);
            vacation = response.data;
        }
        return vacation;
    }

    public async addNewVacation(vacation: VacationModel): Promise<VacationModel> {
        
        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("image", vacation.image.item(0));
        formData.append("fromDate", vacation.fromDate);
        formData.append("untilDate", vacation.untilDate);
        formData.append("price", vacation.price?.toString());

        const response = await axios.post<VacationModel>(config.vacationsUrl, formData);
        const addedVacation = response.data;
        store.dispatch(addVacationAction(addedVacation));

        return addedVacation;
    }

    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        
        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("image", vacation.image.item(0));
        formData.append("fromDate", vacation.fromDate);
        formData.append("untilDate", vacation.untilDate);
        formData.append("price", vacation.price?.toString());

        const response = await axios.put<VacationModel>(config.vacationsUrl + vacation.id, formData);
        const updatedVacation = response.data;

        store.dispatch(updateVacationAction(updatedVacation));

        return updatedVacation;
    }

    public async deleteOneVacation(id: number): Promise<void> {
        await axios.delete(config.vacationsUrl + id);
        store.dispatch(deleteVacationAction(id));
    }

}

const vacationService = new VacationsService();

export default vacationService;