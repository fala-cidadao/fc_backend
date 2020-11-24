import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Location extends Document {
    @Prop({ type: String, required: true })
    public latitude: string;

    @Prop({ type: String, required: true })
    public longitude: string;
};

export const LocationSchema = SchemaFactory.createForClass(Location);