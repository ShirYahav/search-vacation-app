import { Box, Button, createTheme, TextField, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import notify from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {

    const formTheme = createTheme({
        palette: {
            primary: { main: '#9c9c9c' },
            secondary: { main: '#04173b' }
        }
    });

    const navigate = useNavigate();
    
    const [user, setUser] = useState<UserModel>(null);

    useEffect(() => {

        setUser(store.getState().authState.user);
        const unsubscribeMe = store.subscribe(() =>{
            setUser(store.getState().authState.user);
        });

        return () => unsubscribeMe();

    }, []);

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();

    async function submit(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notify.success("Great, Now look for your next vacation!");
            navigate("/");
        }
        catch(err: any) {
            notify.error(err);
        }
    }

    return (
        <ThemeProvider theme={formTheme}>
            <Box display="flex" alignItems="center" justifyContent="center">
                <div className="Login">
                    <form onSubmit={handleSubmit(submit)}>

                        <Typography variant="h3" sx={{ fontWeight: 'bold' }} style={{ height: "80px" }}>Login</Typography>

                        <span className="FormValidation">{formState.errors?.username?.message}</span>
                        <TextField label="Username" variant="outlined" color="secondary" style={{ height: "90px", width: "300px" }} {...register("username", { required: { value: true, message: "required " } })} />

                        <span className="FormValidation">{formState.errors?.password?.message}</span>
                        <TextField label="Password" variant="outlined" color="secondary" style={{ height: "90px", width: "300px" }} type="password" {...register("password", { required: { value: true, message: "required " } })} />

                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Button variant="contained" color="secondary" style={{ height: "40px", width: "150px" }} type="submit">Login</Button>
                        </Box>

                    </form>
                </div>
            </Box>
        </ThemeProvider>
    );
}

export default Login;
