import { NextFunction, Request, Response } from "express";
import cyber from "../01-utils/cyber";
import ErrorModel from "../03-models/error-model";
import RoleModel from "../03-models/role-model";


async function verifyAdmin(request: Request, response: Response, next: NextFunction): Promise<void> {

    const authorizationHeader = request.header("authorization"); 

    const isValid = await cyber.verifyToken(authorizationHeader);

    if(!isValid) {
        next(new ErrorModel(401, "You are not logged in"));
        return;
    }

    const user = cyber.getUserFromToken(authorizationHeader);

    if(user.role !== RoleModel.Admin) {
        next(new ErrorModel(403, "You are not authorized"));
        return;
    }

    next();
}

export default verifyAdmin