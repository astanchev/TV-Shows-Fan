import { IBase } from './base';

export interface IUser  extends IBase{
    city: string;
    about: string;
    email: string;
    lastLogin: Date;
    country: string;
    username: string;
    fanGroups: string;
    likedShows: string;
    userStatus: string;
    blUserLocale: string;
    likedComments: string;
    socialAccount: string;
}