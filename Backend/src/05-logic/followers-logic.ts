import { OkPacket } from "mysql";
import FollowerModel from "../03-models/follower-model";
import JoinedFollowersModel from "../03-models/joined-followers-model";
import dal from "../04-dal/dal";

async function getFollowersByVacation(id: number): Promise<number> {

    const sql = `SELECT COUNT(followers.userId) AS count
                    FROM followers
                    WHERE followers.vacationId = ?`;

    const followers = await dal.execute(sql,[id]);

    const count = followers[0].count;
    return +count;
}

async function getFollowerVacationsIdByUserId(id: string): Promise<number[]> {
    const sql =`SELECT followers.vacationId 
                    FROM followers 
                    WHERE followers.userId = ?`;
    const vacationsId = await dal.execute(sql,[id]);
    const vacationsIdArray:number[] =  [];
    vacationsId.map((vacationId) => {
        vacationsIdArray.push(vacationId.vacationId);
    })
    return vacationsIdArray;
}

async function getAllFollowersByVacations(): Promise<JoinedFollowersModel[]> {
    const sql = `SELECT V.id , V.destination AS destination, 
                    COUNT(F.vacationId) AS amountOfFollowers
                    FROM vacations V JOIN followers F ON V.id = F.vacationId 
                    GROUP BY V.destination 
                    ORDER BY F.vacationId ASC;`

    const allFollowers = await dal.execute(sql);
    return allFollowers;
}

async function addFollower(follower: FollowerModel): Promise<FollowerModel> {

    const sql = `INSERT INTO followers VALUES (DEFAULT, ?, ?)`;

    const info: OkPacket = await dal.execute(sql,[follower.vacationId, follower.userId]);

    return follower;
}

async function deleteFollower(follower: FollowerModel): Promise<void> {

    const sql = `DELETE FROM followers WHERE vacationId = ? AND userId = ?`;

    const info: OkPacket = await dal.execute(sql,[follower.vacationId, follower.userId]);

}


export default {
    getFollowersByVacation,
    getAllFollowersByVacations,
    getFollowerVacationsIdByUserId,
    addFollower,
    deleteFollower
};