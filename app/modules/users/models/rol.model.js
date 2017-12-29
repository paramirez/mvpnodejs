import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const rolSchema = new Schema(
    {
        name: { type: String, unique: true, required: true},
        active: { type: Boolean, default: true }
    },
    {
        collection: 'rols',
        timestamps: true
    }
);

export default mongoose.model('rol', rolSchema);