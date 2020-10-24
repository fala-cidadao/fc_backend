import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Location, LocationSchema } from './location.schema';
import { Comment, CommentSchema } from './comment.schema';

@Schema({ timestamps: true })
export class Problem extends Document {
    @Prop({ type: Types.ObjectId, required: true })
    public owner: Types.ObjectId;

    @Prop({ type: String, required: true })
    public image: string;

    @Prop({ type: String, required: true })
    public title: string;

    @Prop({ type: String, required: true })
    public description: string;

    @Prop({ type: LocationSchema, required: true })
    public location: Location;

    @Prop({ type: String, required: true })
    public status: string;

    @Prop({ type: [CommentSchema], default: [] })
    public comments: Comment[];
};

export const ProblemSchemaProvide = Symbol('ProblemSchemaProvide').toString();

export const ProblemSchema = SchemaFactory.createForClass(Problem);