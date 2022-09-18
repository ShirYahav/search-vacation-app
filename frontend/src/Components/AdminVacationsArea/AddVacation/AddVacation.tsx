import { Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillCameraFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notify from "../../../Services/NotifyService";
import socketService from "../../../Services/SocketService";
import vacationService from "../../../Services/VacationsService";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<VacationModel>();

    const navigate = useNavigate();

    const [departure, setDeparture] = useState<string>('');

    async function submit(vacation: VacationModel) {
        try {
            const addedVacation = await vacationService.addNewVacation(vacation);
            socketService.sendAdd(addedVacation);
            notify.success("Vacation has been added!");
            navigate("/vacations-admin");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    function disablePastDates() {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2,"0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    }


    function setMinArrivalDate(args: SyntheticEvent): void {
        const date = (args.target as HTMLInputElement).value;
        setDeparture(date);
    }

    return (
        <div className="AddVacation">
            <form onSubmit={handleSubmit(submit)} className="Add">
            <Typography variant="h4" sx={{ fontWeight: 'bold' }} style={{ marginBottom: "20px" }}>Add Vacation</Typography>

                <label>description: </label>
                <span className="FormValidation">{formState.errors.description?.message}</span>
                <input type="text" {...register("description", {
                    required: { value: true, message: "Missing description " },
                    pattern: { value: /^(.|\s)*[a-zA-Z]+(.|\s)*$/, message: "invalid input"},
                    minLength: { value: 3, message: "description is too short"},
                    maxLength: { value: 300, message: "description is too long"},
                })} />

                <label>destination: </label>
                <span>{formState.errors.destination?.message}</span>
                <input type="text" {...register("destination", {
                    required: { value: true, message: "Missing destination " },
                    pattern: { value: /^(?!\s*$)[-a-zA-Z0-9\s]{1,100}$/, message: "invalid input"},
                    minLength: { value: 3, message: "destination name is too short"},
                    maxLength: { value: 15, message: "destination name is too long"}
                })} />

                <label>Departure:</label>
                <span className="FormValidation">{formState.errors.fromDate?.message}</span>
                <input type="date" min={disablePastDates()} {...register("fromDate", {
                    onChange: (e) => setMinArrivalDate(e),
                    required: { value: true, message: "Missing departure date " }
                })} />


                <label>Arrival:</label>
                <span className="FormValidation">{formState.errors.untilDate?.message}</span>
                <input type="date" min={departure} {...register("untilDate", {
                    required: { value: true, message: "Missing arrival date " }
                })} />

                <label>Price: </label>
                <span className="FormValidation">{formState.errors.price?.message}</span>
                <input type="number" step="0.01" {...register("price", {
                    required: { value: true, message: "Missing price" },
                    min: { value: 0, message: "Price can't be negative" },
                    max: { value: 100000, message: "Price can't exceed 100,000" },
                })} />

                <label className="ImageLabel">Image: <BsFillCameraFill style={{ width: "38px", height: "25px" }}></BsFillCameraFill>
                <span className="FormValidation">{formState.errors.image?.message}</span>
                    <input className="ImageInput" type="file" accept="image/*" {...register("image", {
                        required: { value: true, message: "Missing image" }
                    })} />
                </label>

                <div className="FormButton">
                    <NavLink to="/vacations-admin">
                        <button className="BackButton">Go Back</button>
                    </NavLink>
                    <button className="AddButtonSubmit">Add</button>
                </div>

            </form>
        </div>
    );
}

export default AddVacation;
