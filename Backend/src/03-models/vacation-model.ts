import { UploadedFile } from 'express-fileupload';
import Joi from "joi";

class VacationModel {
    public id: number;
    public description: string;
    public destination: string;
    public image: UploadedFile;
    public imageName: string;
    public fromDate: string;
    public untilDate: string;
    public price: number;
    public isFollow: boolean;

    public constructor(vacation: VacationModel) {
        this.id = vacation.id;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.image = vacation.image;
        this.imageName = vacation.imageName;
        this.fromDate = vacation.fromDate;
        this.untilDate = vacation.untilDate;
        this.price = vacation.price;
    }

    private static postSchema = Joi.object({
        id: Joi.number(),
        description: Joi.string().required().max(550),
        destination: Joi.string().required().max(50),
        image: Joi.object().optional(),
        imageName: Joi.string().max(150),
        fromDate: Joi.string().required(),
        untilDate: Joi.string().required(),
        price: Joi.number().required()
    });

    private static putSchema = Joi.object({
        id: Joi.number(),
        description: Joi.string().required().max(550),
        destination: Joi.string().required().max(50),
        image: Joi.object().optional(),
        imageName: Joi.string().max(150),
        fromDate: Joi.string().required(),
        untilDate: Joi.string().required(),
        price: Joi.number().required()
    });


    public validatePost(): string {
        const result = VacationModel.postSchema.validate(this);
        return result.error?.message;
    }

    public validatePut(): string {
        const result = VacationModel.putSchema.validate(this);
        return result.error?.message;
    }
}

export default VacationModel;