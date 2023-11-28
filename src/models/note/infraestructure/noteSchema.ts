import mongoose from 'mongoose';
const {Schema} = mongoose;

const NoteSchema = new Schema({
    title: {type: String, required: true, trim: true},
    description: {type: String, required: true},
    done: {type: Boolean, default: false}
}, {
    timestamps: true
});

export default mongoose.model('Note', NoteSchema);