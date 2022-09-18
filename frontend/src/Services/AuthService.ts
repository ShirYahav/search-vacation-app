import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { loginAction, logoutAction, registerAction } from "../Redux/AuthState";
import store from "../Redux/Store";
import { fetchVacationsAction } from "../Redux/VacationsState";
import config from "../Utils/Config";

class AuthService {
    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(config.userRegisterUrl, user);
        const token = response.data;
        store.dispatch(registerAction(token));
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(config.userLoginUrl, credentials);
        const token = response.data;
        store.dispatch(loginAction(token));
    }

    public logout(): void {
        store.dispatch(logoutAction());
        store.dispatch(fetchVacationsAction([]));
    }

}

const authService = new AuthService();

export default authService; 