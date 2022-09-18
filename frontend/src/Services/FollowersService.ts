import axios from "axios";
import FollowerModel from "../Models/FollowerModel";
import JoinedFollowersModel from "../Models/JoinedFollowersModel";
import { addFollowerAction, deleteFollowerAction, getAllFollowersByVacationsAction, getFollowersByVacationAction } from "../Redux/FollowersState";
import store from "../Redux/Store";
import config from "../Utils/Config";

class FollowersService {

    public async getFollowersByVacation(id: number): Promise<number> {
        const response = await axios.get<number>(config.followersUrl + id);
        const followers = response.data;
        store.dispatch(getFollowersByVacationAction(followers));
        return followers;
    }

    public async getAllFollowersByVacations(): Promise<JoinedFollowersModel[]> {
        const response = await axios.get<JoinedFollowersModel[]>(config.followersUrl);
        const allFollowers = response.data;
        store.dispatch(getAllFollowersByVacationsAction(allFollowers));
        return allFollowers;
    }

    public async addFollower(userId: string, vacationId: number): Promise<FollowerModel> {
        const response = await axios.post<FollowerModel>(config.followersUrl, {userId: userId, vacationId: vacationId});
        const addedFollower = response.data;
        store.dispatch(addFollowerAction(addedFollower));
        return addedFollower;
    }

    public async deleteFollower(vacationId: number): Promise<void> {
        await axios.delete(config.followersUrl + vacationId);
        store.dispatch(deleteFollowerAction(vacationId));
    }
}

const followersService = new FollowersService();

export default followersService;