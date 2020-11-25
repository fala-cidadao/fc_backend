import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Location, LocationSchema } from './location.schema';
import { Comment, CommentSchema } from './comment.schema';

const StatusEnum = ["Em andamento", "Concluido", "Em Espera", "Em Analise"]
const CategoryEnum = ["safety", "energy", "education", "garbage", "health", "infrastruture", "garbage", "other"]

@Schema({ timestamps: true })
export class Problem extends Document {
    @Prop({ type: Types.ObjectId, required: true })
    public owner: Types.ObjectId;

    @Prop({ type: [String], required: true, default: [] })
    public userImages: string[];

    @Prop({ type: [String], required: true, default: [] })
    public adminImages: string[];

    @Prop({ type: String, required: true })
    public title: string;

    @Prop({ type: String, required: true })
    public description: string;

    @Prop({ type: LocationSchema, required: true })
    public location: Location;

    @Prop({ type: String, required: true, enum: StatusEnum, default: "Em andamento" })
    public status: string;

    @Prop({ type: [CommentSchema], default: [] })
    public comments: Comment[];

    @Prop({ type: String, required: true, enum: CategoryEnum })
    public category: string;
};

export const ProblemSchemaProvide = Symbol('ProblemSchemaProvide').toString();

export const ProblemSchema = SchemaFactory.createForClass(Problem);