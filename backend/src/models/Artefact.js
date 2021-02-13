import { Schema, model } from 'mongoose';

const artefactSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    multilpier: { type: Number, required: true },
    stat: { type: String, required: true },
    rarity: {type: String, enum:['Legendary', 'Rare', 'Uncommon', 'Common'], required: true},
    cost: { type: Number, required:true },
}, { timestamps: true });

const Artefact = model('artefacts', artefactSchema);

export default Artefact;
