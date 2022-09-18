import { NextFunction, Request, Response } from "express";
import config from "../01-utils/config";
import logger from "../01-utils/logger";

function errorsHandler(err: any, request: Request, response: Response, next: NextFunction): void {

    const status = err.status || 500; 

    if(status === 500) {
        logger.log(err.message, err);
    }

    let msg;
    if(config.isDevelopment) {
        msg = err.message;
    }
    else if(status !== 500) {
        msg = err.message;
    }
    else { 
        msg = "some error, please try again..." 
    }

    response.status(err.status || 500).send(msg);
}

export default errorsHandler;