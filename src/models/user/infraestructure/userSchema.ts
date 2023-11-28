import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const UserSchema = new Schema({
    name: {type: String, required: true},
    pass: {type: String, required: true}
}, {
    timestamps: true
});

export default mongoose.model('User', UserSchema);