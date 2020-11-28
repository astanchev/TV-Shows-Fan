import { IBase } from './base';

export interface ITvShow extends IBase {
    name: string;
    description: string;
    imageUrl: string;
    likes: number;
    dislikes: number;
    category: string;
    period: string;
}