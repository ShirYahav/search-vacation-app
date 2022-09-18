import express, { NextFunction, Request, Response } from "express";
import logic from "../05-logic/vacations-logic";
import followersLogic from "../05-logic/followers-logic";
import path from "path";
import VacationModel from "../03-models/vacation-model";
import verifyAdmin from "../02-middleware/verify-admin";
import verifyLoggedIn from "../02-middleware/verify-logged-in";
import cyber from "../01-utils/cyber";

const router = express.Router();

router.get("/vacations/", verifyLoggedIn , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = cyber.getUserFromToken(request.header("authorization")).id;
        const followedVacationsByUser = await followersLogic.getFollowerVacationsIdByUserId(userId);
        const vacations = await logic.getAllVacations();
        vacations.map((vacation) => {
            if (followedVacationsByUser.includes(vacation.id)) {
                vacation["isFollow"] = true;
            }
            else {
                vacation["isFollow"] = false;
            }
        });
        const newVacationArray = vacations.sort((a,b) => Number(b.isFollow) - Number(a.isFollow));
        response.json(newVacationArray);
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/vacations/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const vacation = await logic.getOneVacation(id);
        response.json(vacation);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/vacations", verifyAdmin,  async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addedVacation = await logic.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch(err: any) {
        next(err);
    }
});

router.put("/vacations/:id", verifyAdmin,  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        request.body.image = request.files?.image;
        request.body.id = id;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await logic.updateVacation(vacation);
        response.json(updatedVacation);
    }
    catch(err: any) {
        next(err);
    }
});

router.delete("/vacations/:id", verifyAdmin,  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await logic.deleteVacation(id);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "assets", "images", "vacations", imageName);
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;

