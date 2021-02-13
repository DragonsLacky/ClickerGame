import { Schema, model } from 'mongoose';

const MonsterSchema = new Schema({
    health: { type: Number, default:20 },
    image: {type: String, required: true},
    type: { type: String, enum: ['normal', 'boss'], default: 'normal' },
    drop_chance: {type: Number, default: 4},
    gold: { type: String, default:1 }
}, { timestamps: true });

const Monster = model('monsters', MonsterSchema);

export default Monster;