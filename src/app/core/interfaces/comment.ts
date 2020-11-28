import { IBase } from './base';

export interface IComment extends IBase {
    text: string;
    fromUser: string;
    likes: number;
    dislikes: number;
}