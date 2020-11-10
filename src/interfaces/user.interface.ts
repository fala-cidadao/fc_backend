import { Document } from 'mongoose';

export interface UserDto {
    name: string;
    email: string;
    password: string;
    role: string;
    phone: string;
}