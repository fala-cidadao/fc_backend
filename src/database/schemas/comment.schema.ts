import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: false })
export class Comment extends Document {
    @Prop({ type: Types.ObjectId, required: true })
    public owner: Types.ObjectId;

    @Prop({ type: String, required: true })
    public text: string;

    @Prop({ type: String, required: true })
    public role: string;

    @Prop({ type: String })
    public image: string;
};

export const CommentSchema = SchemaFactory.createForClass(Comment);