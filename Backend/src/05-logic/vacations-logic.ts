import fs from "fs";
import { OkPacket } from "mysql";
import ErrorModel from "../03-models/error-model";
import dal from "../04-dal/dal";
import VacationModel from "../03-models/vacation-model";
import { v4 as uuid } from "uuid";
import path from "path";
import safeDelete from "../01-utils/safe-delete";


async function getAllVacations(): Promise<VacationModel[]> {
    const sql = `SELECT
                    id,
                    description,
                    destination,
                    imageName,
                    fromDate,
                    untilDate,
                    price
                        FROM vacations`;

    const vacations = await dal.execute(sql);
    return vacations;
}

async function getOneVacation(id: number): Promise<VacationModel> {
    const sql = `SELECT
                    id,
                    description,
                    destination,
                    imageName,
                    fromDate,
                    untilDate,
                    price        
                        FROM vacations
                        WHERE id = ?`;

    const vacations = await dal.execute(sql,[id]);

    const vacation = vacations[0];

    if(!vacation) throw new ErrorModel(404, `id ${id} not found`);
    return vacation;
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    const errors = vacation.validatePost();
    if (errors) throw new ErrorModel(400, errors);

    if (vacation.image) {
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
        vacation.imageName = uuid() + extension;
        await vacation.image.mv(path.join(__dirname, ".." , "assets", "images", "vacations", vacation.imageName));
        delete vacation.image;
    }
    
    const sql = `INSERT INTO vacations (id, description, destination, imageName, fromDate, untilDate, price)
                 VALUES(DEFAULT ,? ,? ,? ,? ,? ,?)`;

    const info: OkPacket = await dal.execute(sql,[vacation.description, vacation.destination, vacation.imageName, vacation.fromDate, vacation.untilDate, vacation.price]);
    vacation.id = info.insertId;

    return vacation;
}


async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    const errors = vacation.validatePut();
    if (errors) throw new ErrorModel(400, errors);

    const currentVacation = await getOneVacation(vacation.id);
    vacation.imageName = currentVacation.imageName;

    if (vacation.image) {
        safeDelete(path.join(__dirname, ".." , "assets", "images", "vacations", vacation.imageName));
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
        vacation.imageName = uuid() + extension;
        await vacation.image.mv(path.join(__dirname, ".." , "assets", "images", "vacations", vacation.imageName));
        delete vacation.image;
    }

    const sql = `UPDATE vacations SET
                    description = ?,
                    destination = ?,
                    imageName = ?,
                    fromDate = ?,
                    untilDate = ?,
                    price = ?
                    WHERE id = ?`;

    const info: OkPacket = await dal.execute(sql,[vacation.description,vacation.destination, vacation.imageName, vacation.fromDate, vacation.untilDate, vacation.price, vacation.id]);
    
    if(info.affectedRows === 0) throw new ErrorModel(404, `id ${vacation.id} not found`);

    return vacation;
}

async function deleteVacation(id: number): Promise<void> {

    const vacation = await getOneVacation(id);
    safeDelete(path.join(__dirname, ".." , "assets", "images", "vacations", vacation.imageName));

    const sql = `DELETE FROM vacations WHERE id = ? `;

    const info: OkPacket = await dal.execute(sql,[id]);

    if(info.affectedRows === 0) throw new ErrorModel(404, `id ${id} not found`);
}

export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation
};