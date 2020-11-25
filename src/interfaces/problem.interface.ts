import { Document } from 'mongoose';
import { Location } from './location.interface';
import { Comment } from './comment.interface';

export interface Problem extends Document {
    owner: string;
    userImages: string[];
    adminImages: string[];
    location: Location;
    comments: Comment[];
    description: string;
    title: string;
    status: string;
    category: string;
}