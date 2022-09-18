import dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./01-utils/config";
import errorsHandler from "./02-middleware/errors-handlers";
import sanitize from "./02-middleware/sanitize";
import preventGarbage from "./02-middleware/prevent-garbage";
import ErrorModel from "./03-models/error-model";
import socketLogic from "./05-logic/socket-logic";
import vacationsController from "./06-controllers/vacations-controller";
import authController from './06-controllers/auth-controller';
import followersController from './06-controllers/followers-controller';
import expressRateLimit from "express-rate-limit";
import fileUpload from "express-fileupload";
import path from "path";


const server = express();

server.use("/", expressRateLimit({
    windowMs: 1000,
    max: 10000,
    message: "Are you a hacker?"
}));

if (config.isDevelopment) {
    server.use(cors()); 
}


server.use(express.json());
server.use(preventGarbage);
server.use(fileUpload());
server.use(sanitize);

server.use(express.static(path.join(__dirname, "07-frontend")));

server.use("/api", vacationsController);
server.use("/api", authController);
server.use("/api", followersController);


server.use("*", (request: Request, response: Response, next: NextFunction) => {
    if(config.isDevelopment) {
        next(new ErrorModel(404, "Route not found."));
    }
    else {
        const indexHtmlFile = path.join(__dirname, "07-frontend", "index.html");
        response.sendFile(indexHtmlFile);
    }
});

server.use(errorsHandler);

const httpServer = server.listen(process.env.PORT, () => console.log("Listening..."));
socketLogic(httpServer);
