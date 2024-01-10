import { Document, InferSchemaType, Model, Schema, SchemaDefinition, Types, model } from "mongoose";

export interface IPhoto {
    image: string,
    title: string,
    likes: Types.Array<string>,
    comments: Types.Array<any>,
    userId: Types.ObjectId,
    userName: string,
}

export interface IPhotoDoc extends IPhoto, Document { }

export interface IPhotoModel extends Model<IPhotoDoc> { }

const PhotoSchemaFields: SchemaDefinition<Record<keyof IPhoto, any>> = {
    image: String,
    title: String,
    likes: Array<String>,
    comments: Array<any>,
    userId: Schema.Types.ObjectId,
    userName: String,
};


const PhotoSchema = new Schema<IPhotoDoc>(PhotoSchemaFields, {
    timestamps: true
});

export const Photo = model<IPhotoDoc, IPhotoModel>("Photo", PhotoSchema);



