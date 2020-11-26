import { IBase } from './base';

export interface IUser  extends IBase{
    city: string;
    about: string;
    email: string;
    country: string;
    lastLogin: Date;
    username: string;
    likedShows: string;
    userStatus: string;
    blUserLocale: string;
    likedComments: string;
    socialAccount: string;
}