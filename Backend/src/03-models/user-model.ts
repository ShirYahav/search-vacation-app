import Joi from "joi";
import RoleModel from "./role-model";

class UserModel {
    public id: string;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public role: RoleModel;

    public constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.role= user.role;
    }

    private static postSchema = Joi.object({
        id: Joi.string(),
        firstName: Joi.string().required().max(50),
        lastName: Joi.string().required().max(50),
        username: Joi.string().required().max(50),
        password: Joi.string(),
        role: Joi.string()
    });

    private static putSchema = Joi.object({
        id: Joi.string(),
        firstName: Joi.string().required().max(50),
        lastName: Joi.string().required().max(50),
        username: Joi.string().required().max(50),
        password: Joi.string().required(),
        role: Joi.string()
    });


    public validatePost(): string {
        const result = UserModel.postSchema.validate(this);
        return result.error?.message;
    }

    public validatePut(): string {
        const result = UserModel.putSchema.validate(this);
        return result.error?.message;
    }

}

export default UserModel;