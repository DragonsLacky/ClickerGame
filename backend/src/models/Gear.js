import { Schema, model } from 'mongoose';

const GearSchema = new Schema({
    image: { type: String, required: true },
    multilpier: { type: Number, required: true },
    type: { type: String, enum:['Helmet','Chestplate', 'Leggings', 'Shoes', 'Gauntlets', 'Sword'],required: true },
    rarity: {type: String, enum:['Legendary', 'Special', 'Rare', 'Uncommon', 'Common'], required: true},
    name: { type: String, required: true },
    equipped: {type: Boolean, default: false},
    owner: {ref: 'heroes', type: Schema.Types.ObjectId, required: false}
}, { timestamps: true });

const Gear = model('gearpieces', GearSchema);

export default Gear;