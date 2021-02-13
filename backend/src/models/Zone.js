import { Schema, model } from 'mongoose';

const ZoneSchema = new Schema({
    monster: { ref:'monsters', type: Schema.Types.ObjectId, required: true },
    award: { type: Number, default: 100 },
    drop_chance: {type: Number, default: 10},
    level: { type: Number, default:1 },
    defeated: {type: Number, default: 0},
    owner: {ref: 'heroes', type: Schema.Types.ObjectId, required: false}
}, { timestamps: true });

const Zone = model('zones', ZoneSchema);

export default Zone;