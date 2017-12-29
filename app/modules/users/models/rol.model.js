import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const rolSchema = new Schema(
    {
        name: { type: String, unique: true, required: true},
        active: { type: Boolean, default: true },
        users: [{ type: Schema.Types.ObjectId, ref: 'user' }]
    },
    {
        collection: 'rols',
        timestamps: true
    }
);

export default mongoose.model('rol', rolSchema);