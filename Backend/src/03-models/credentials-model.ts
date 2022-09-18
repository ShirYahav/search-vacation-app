import Joi from "joi";

class CredentialsModel {
    public username: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.username = credentials.username;
        this.password = credentials.password;
    }

    private static postSchema = Joi.object({
        username: Joi.string().required().max(50),
        password: Joi.string().required()
    });


    public validatePost(): string {
        const result = CredentialsModel.postSchema.validate(this);
        return result.error?.message;
    }

}

export default CredentialsModel;