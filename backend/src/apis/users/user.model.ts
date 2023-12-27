import { Document, Model, Schema, model, SchemaDefinition } from 'mongoose';

export interface IUser {
    name: string,
    email: string,
    password: string,
    profileImage: string,
    bio: string
}

export interface IUserDoc extends IUser, Document { };

export interface IUserModel extends Model<IUserDoc> { };

const UserSchemaFields: SchemaDefinition<Record<keyof IUser, any>> = {
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String
};

const UserSchema = new Schema<IUserDoc>(UserSchemaFields, {
    timestamps: true
});

export const User = model<IUserDoc, IUserModel>('User', UserSchema);

