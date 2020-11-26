import { IBase } from './base';

export interface IUser  extends IBase{
    city:string;
    about:string;
    email: string;
    country:string;
    lastLogin: Date;
    username: string;
    userStatus: string;
    blUserLocale: string;
    socialAccount: string;
}