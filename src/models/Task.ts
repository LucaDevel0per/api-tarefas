import mongoose, { Schema, Document } from "mongoose";

// interface que define como sera o obj task

export interface ITask extends Document {
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
}

// Schema Mongoose que define o formato da coleção
const TaskSchema: Schema = new Schema<ITask>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model<ITask>('Task', TaskSchema)