import { OkPacket } from 'mysql';
import cyber from '../01-utils/cyber';
import CredentialsModel from '../03-models/credentials-model';
import ErrorModel from "../03-models/error-model";
import UserModel from '../03-models/user-model';
import dal from "../04-dal/dal";
import {v4 as uuid} from "uuid";
import RoleModel from '../03-models/role-model';

async function register(user: UserModel): Promise<string> {

    const errors = user.validatePost();
    if (errors) throw new ErrorModel(400, errors);

    const isTaken = await isUsernameTaken(user.username);
    if (isTaken) {
        throw new ErrorModel(400, `username ${user.username} already taken`);

    }

    user.password = cyber.hash(user.password);

    user.id = uuid();

    user.role = RoleModel.User;

    const sql = `INSERT INTO users VALUES(?, ? ,?, ?, ?, ?)`;

    const info: OkPacket = await dal.execute(sql, [user.id, user.firstName, user.lastName, user.username, user.password, user.role]);
    
    delete user.password;

    const token = cyber.getNewToken(user);

    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {

    const errors = credentials.validatePost();
    if (errors) throw new ErrorModel(400, errors);

    credentials.password = cyber.hash(credentials.password);

    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

    const users = await dal.execute(sql, [credentials.username, credentials.password]);

    if(users.length === 0) {
        throw new ErrorModel(401, "Incorrect username or password");
    }

    const user = users[0];

    delete user.password;

    const token = cyber.getNewToken(user);

    return token;
}


async function isUsernameTaken(username: string): Promise<boolean> {
    const sql = `SELECT COUNT(*) AS count FROM users WHERE username = ?`;
    const table = await dal.execute(sql, [username]);
    const row = table[0];
    const count = row.count;
    return count > 0;
}

export default {
    register,
    login
}
