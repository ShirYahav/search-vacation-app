import {  useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import { updateVacationAction } from "../../../Redux/VacationsState";
import followersService from "../../../Services/FollowersService";
import notify from "../../../Services/NotifyService";
import config from "../../../Utils/Config";
import "./VacationsCard.css";
import dayjs from 'dayjs'


interface VacationCardProps {
    vacation: VacationModel;
}

function VacationsCard(props: VacationCardProps): JSX.Element {

    const [followers, setFollowers] = useState<number>(0);

    useEffect(() => {
        
        followersService.getFollowersByVacation(props.vacation.id)
        .then(followers=> setFollowers(followers))
        .catch(err => notify.error(err));

    },[])


    async function follow(vacationId: number) {
        try {            
            const userId = store.getState().authState.user.id
            await followersService.addFollower(userId, vacationId);
            props.vacation.isFollow = true
            store.dispatch(updateVacationAction(props.vacation)); 
            
            followersService.getFollowersByVacation(props.vacation.id)
            .then(followers=> setFollowers(followers))
            .catch(err => notify.error(err));

            notify.success("followed");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    async function unfollow(vacationId: number) {
        try{
            props.vacation.isFollow = false
            await followersService.deleteFollower(vacationId);
            
            followersService.getFollowersByVacation(props.vacation.id)
            .then(followers=> setFollowers(followers))
            .catch(err => notify.error(err));

            notify.success("unfollowed");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="VacationsCard">
            <div className="Container">
                <img className="VacationImage" src={config.vacationImageUrl + props.vacation.imageName} />
                <label className="Switch">
                    <input type="checkbox" onChange={() => !props.vacation.isFollow ? follow(props.vacation.id) : unfollow(props.vacation.id)} checked = {props.vacation.isFollow} />
                    <span className="Slider">follow</span>
                </label>
                <div className="TextBox">
                    <h2 className="Destination">{props.vacation.destination}</h2>
                    <p className="Description">{props.vacation.description}</p>
                </div>
            </div>
            <div>
                <p className="Details">Dates: {dayjs(props.vacation.fromDate).format("DD/MM/YYYY")} - {dayjs(props.vacation.untilDate).format("DD/MM/YYYY")}</p>
                <p className="Details">Price: {props.vacation.price}$ </p>
                <div className="Followers">Followers: {followers} </div>
            </div>
        </div>
    );
}

export default VacationsCard;
