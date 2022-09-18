import VacationModel from "../../../Models/VacationModel";
import config from "../../../Utils/Config";
import "./VacationCardAdmin.css";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from 'react-icons/fa';
import { useEffect, useState } from "react";
import followersService from "../../../Services/FollowersService";
import notify from "../../../Services/NotifyService";
import { NavLink } from "react-router-dom";
import dayjs from 'dayjs'

interface VacationCardProps {
    vacation: VacationModel;
    deleteVacation: (vacationId: number) => void;
}

function VacationCardAdmin(props: VacationCardProps): JSX.Element {

    const [followers, setFollowers] = useState<number>(0);

    useEffect(() => {
        followersService.getFollowersByVacation(props.vacation.id)
        .then(followers=> setFollowers(followers))
        .catch(err => notify.error(err));
        
    },[])


    return (
        <div className="VacationsCardAdmin">
            <div className="Container">
			<img className="VacationImage" src={config.vacationImageUrl + props.vacation.imageName} />
            <NavLink to={"/update-vacation/" + props.vacation.id}><button className="Edit">Edit <AiFillEdit /></button></NavLink>
            <div className="TextBox">
                <h2 className="Destination">{props.vacation.destination}</h2>
                <p className="Description">{props.vacation.description}</p>
            </div>
            </div>
            <div>
                <p className="Details">Dates: {dayjs(props.vacation.fromDate).format("DD/MM/YYYY")} - {dayjs(props.vacation.untilDate).format("DD/MM/YYYY")} </p>
                <p className="Details">Price: {props.vacation.price}$</p>
                <div className="BottomCard">
                    <div className="FollowersAdmin">Followers: {followers} </div>
                    <div className="Trash" onClick={() => props.deleteVacation(props.vacation.id)}>Delete<FaTrash style={{ width: "28px", height: "15px" }} /></div>
                </div>
            </div>
        </div>
    );
}

export default VacationCardAdmin;
