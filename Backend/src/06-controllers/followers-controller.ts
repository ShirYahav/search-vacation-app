import express, { NextFunction, Request, Response } from "express";
import logic from "../05-logic/followers-logic";
import FollowerModel from "../03-models/follower-model";
import verifyLoggedIn from "../02-middleware/verify-logged-in";
import cyber from "../01-utils/cyber";

const router = express.Router();

router.get("/followers/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const followers = await logic.getFollowersByVacation(id);
        response.json(followers);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/followers", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const allFollowers = await logic.getAllFollowersByVacations();
        response.json(allFollowers);
    }
    catch (err: any) {
        next(err);
    }
});


router.post("/followers", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const follower = new FollowerModel(request.body);
        const addedFollower = await logic.addFollower(follower);
        response.status(201).json(addedFollower);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/followers/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = cyber.getUserFromToken(request.header("authorization")).id;

        const vacationId = +request.params.vacationId;

        await logic.deleteFollower({vacationId, userId});

        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});


export default router;
