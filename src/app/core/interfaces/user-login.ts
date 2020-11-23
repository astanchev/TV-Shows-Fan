import { IUser } from './user';

export interface IUserLogin extends IUser {
    "user-token": string;
}