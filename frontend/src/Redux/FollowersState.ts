import FollowerModel from "../Models/FollowerModel";
import JoinedFollowersModel from "../Models/JoinedFollowersModel";

export class FollowersState {
    public followers: FollowerModel[] = [];
    public followersNumber: number;
    public allFollowers: JoinedFollowersModel[] = [];
}

export enum FollowersActionType {
    getFollowersByVacation = "getFollowersByVacation",
    getAllFollowersByVacations = "getAllFollowersByVacations",
    addFollower = "addFollower",
    deleteFollower = "deleteFollower"
}

export interface FollowersAction {
    type: FollowersActionType;
    payload: any;
}

export function getFollowersByVacationAction(vacationId: number): FollowersAction {
    return { type: FollowersActionType.getFollowersByVacation, payload: vacationId };
}

export function getAllFollowersByVacationsAction(allFollowers: JoinedFollowersModel[]): FollowersAction {
    return { type: FollowersActionType.getAllFollowersByVacations, payload: allFollowers };
}

export function addFollowerAction(follower: FollowerModel): FollowersAction {
    return { type: FollowersActionType.addFollower, payload: follower};
}

export function deleteFollowerAction(vacationId: number): FollowersAction {
    return { type: FollowersActionType.deleteFollower, payload: vacationId};
}

export function followersReducer(currentState: FollowersState = new FollowersState(), action: FollowersAction): FollowersState {
    const newState = {...currentState};

    switch(action.type) {

        case FollowersActionType.getFollowersByVacation:
            newState.followersNumber = action.payload
            break;
        
        case FollowersActionType.getAllFollowersByVacations:
            newState.allFollowers = action.payload
            break;

        case FollowersActionType.addFollower:
            newState.followers.push(action.payload);
            break;
        
        case FollowersActionType.deleteFollower:
            const indexToDelete = newState.followers.findIndex(f => f.followerId === action.payload);
            console.log(indexToDelete);
            if(indexToDelete >= 0) {
                newState.followers.splice(indexToDelete, 1);
            }
            break;
    }

    return newState;
}