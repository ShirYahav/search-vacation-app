import { Box, Button, createTheme, TextField, ThemeProvider, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

    const formTheme = createTheme({
        palette: {
            primary: { main: '#9c9c9c' },
            secondary: { main: '#04173b' }
        }
    });

    const navigate = useNavigate();

    const {register, handleSubmit, formState} = useForm<UserModel>();

    async function submit(user: UserModel) {
        try {
            await authService.register(user);
            notify.success("You are Registered!");
            navigate("/vacations");
        }
        catch(err: any) {
            notify.error(err);
        }
    }
    
    return (
        <ThemeProvider theme={formTheme}>
            <Box display="flex" alignItems="center" justifyContent="center">
                <div className="Register">

                    <form onSubmit={handleSubmit(submit)}>
                        <Typography variant="h3" sx={{ fontWeight: 'bold' }} style={{ height: "80px" }}>Register</Typography>

                        <span className="FormValidation">{formState.errors?.firstName?.message}</span>
                        <TextField label="First Name" variant="outlined" color="secondary" style={{ height: "80px" , width: "300px"}} {...register("firstName", { 
                            required: { value: true, message: "Required "},
                            pattern: { value: /^[A-Za-z]+$/, message: "invalid input"}, 
                            minLength: {value: 2, message: "First Name is too short"}, 
                            maxLength: {value: 10, message: "First Name is too long"}} )} />

                        <span className="FormValidation">{formState.errors?.lastName?.message}</span>
                        <TextField label="Last Name" variant="outlined" color="secondary" style={{ height: "80px" , width: "300px"}} type="text" {...register("lastName", { 
                            required: { value: true, message: "Required"}, 
                            pattern: { value: /^[A-Za-z]+$/, message: "invalid input"},
                            minLength: {value: 2, message: "Last Name is too short"}, 
                            maxLength: {value: 10, message: "Last Name is too long"} })} />

                        <span className="FormValidation">{formState.errors?.username?.message}</span>
                        <TextField label="Username" variant="outlined" color="secondary" style={{ height: "80px" , width: "300px"}} {...register("username", { 
                            required: { value: true, message: "Required"},
                            pattern: { value: /^\S*$/, message: "invalid input"},
                            minLength: {value: 2, message: "Username is too short"}, 
                            maxLength: {value: 10, message: "Username is too long"} })} />

                        <span className="FormValidation">{formState.errors?.password?.message}</span>
                        <TextField label="Password" variant="outlined" color="secondary" type="password" style={{ height: "80px" , width: "300px"}} {...register("password", { 
                            required: { value: true, message: "Required"}, 
                            pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: "Missing at least one letter or number"},
                            minLength: {value: 8, message: "Password is too short"}, 
                            maxLength: {value: 20, message: "Password is too long"} })} />

                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Button variant="contained" color="secondary" style={{ height: "40px", width: "150px" }} type="submit" size="large">Register</Button>
                        </Box>

                    </form>
                </div>
            </Box>
        </ThemeProvider>
    );
}

export default Register;
