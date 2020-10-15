import { Document } from 'mongoose';
import { Location } from './location.interface';

export interface Problem extends Document {
    owner: string;
    image: string;
    location: Location;
}