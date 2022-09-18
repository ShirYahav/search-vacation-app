import { Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notify from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationsService";
import "./UpdateVacation.css";
import { BsFillCameraFill } from 'react-icons/bs';
import socketService from "../../../Services/SocketService";
import { NavLink } from "react-router-dom";

function UpdateVacation(): JSX.Element {

    const params = useParams();
    const id = +params.id

    const navigate = useNavigate();

    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();

    const [departure, setDeparture] = useState<string>('');

    function adjustDate(date: string) {
        const d = new Date(date);
        return d.toISOString().slice(0, 10);
    }

    useEffect(() => {
        vacationService.getOneVacation(id)
           .then(vacation => {
               setValue("description", vacation.description);
               setValue("destination", vacation.destination);
               setValue("fromDate", adjustDate(vacation.fromDate));
               setValue("untilDate", adjustDate(vacation.untilDate));
               setValue("price", vacation.price);
           })
           .catch(err => notify.error(err));
    },[]);

    async function submit(vacation: VacationModel) {
        try{
            vacation.id = id;
            const updatedVacation = await vacationService.updateVacation(vacation);
            socketService.sendUpdate(updatedVacation);
            notify.success("Updated Successfully")
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
        <div className="UpdateVacation">

            <form onSubmit={handleSubmit(submit)} className="Update"  >
                <Typography variant="h4" sx={{ fontWeight: 'bold' }} style={{ marginBottom: "20px" }}>Update Vacation</Typography>

                <label>description: </label>
                <span className="FormValidation">{formState.errors.description?.message}</span>
                <input type="text" name="description" {...register("description", {
                    required: { value: true, message: "Missing description " },
                    pattern: { value: /^(.|\s)*[a-zA-Z]+(.|\s)*$/, message: "invalid input"},
                    minLength: { value: 3, message: "description is too short" },
                    maxLength: { value: 300, message: "description is too long" }
                })} />

                <label>destination: </label>
                <span className="FormValidation">{formState.errors.destination?.message}</span>
                <input type="text" name="destination" {...register("destination", {
                    required: { value: true, message: "Missing destination " },
                    pattern: { value: /^(?!\s*$)[-a-zA-Z0-9\s]{1,100}$/, message: "invalid input"},
                    minLength: { value: 3, message: "destination name is too short" },
                    maxLength: { value: 15, message: "destination name is too long" }
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
                    <button className="UpdateButton">Update</button>
                </div>

            </form>
        </div>
    );
}

export default UpdateVacation;
