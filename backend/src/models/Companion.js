import { Schema, model } from 'mongoose';

const CompanionSchema = new Schema({
    dps: { type:Number, required: true },
    image: { type: String, required: true },
    cost: { type: Number, required: true },
    name: { type: String, required: true },
}, { timestamps: true });

const Companion = model('companions', CompanionSchema);

export default Companion;

