import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Location extends Document {
    @Prop({ type: String, required: true })
    public address: string;

    @Prop({ type: String, required: true })
    public district: string;

    @Prop({ type: String, required: true })
    public city: string;

    @Prop({ type: String, required: true })
    public state: string;
};

export const LocationSchema = SchemaFactory.createForClass(Location);