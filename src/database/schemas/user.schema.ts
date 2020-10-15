import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
    public id: string;
    
    @Prop({ type: String, required: true })
    public name: string;

    @Prop({ type: String, unique: true, required: true })
    public email: string;

    @Prop({ type: String, required: true })
    public password: string;
    
    @Prop({ type: String, required: true })
    public phone: string;

    @Prop({ type: String, required: true })
    public role: string;
};

export const UserSchemaProvide = Symbol('UserSchemaProvide').toString();

export const UserSchema = SchemaFactory.createForClass(User);