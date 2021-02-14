import { Schema, model } from 'mongoose';

const HeroSchema = new Schema({
    level: { type:Number, default: 1 },
    balance: { type:Number, default: 0 },
    damage: {type:Number, default:1},
    resurection_points: {type: Number, default: 0 },
    resurection_bonus: {type: Number, default: 0},
    critical_chance: { type: Number, default: 10 },
    critical_damage: { type: Number, default: 2 },
    all_damage: { type: Number, default: 1 },
    luck : { type: Number, default: 1 },
    companion_damage: {type: Number, default:1},
    hero_damage: {type: Number, default:1},
    boss_gold: {type: Number, default:1},
    upgrade_cost: {type: Number, default:1},
    level_up: {type: Number, default:1},
    zone : {ref: 'zones', type: Schema.Types.ObjectId, required: true},
    owner : { ref: 'users', type: Schema.Types.ObjectId, required:true },
    companions: [
        {
            companion: {ref: 'companions', type: Schema.Types.ObjectId, required: false},
            level: Number
        }
     ],
    gearpieces: [{ref: 'gearpieces', type: Schema.Types.ObjectId, required: false}],
    artefacts: [
        {
            artefact: {ref: 'artefacts', type: Schema.Types.ObjectId, required: false},
            level: Number
        }
    ]
}, { timestamps: true });

const Hero = model('heroes', HeroSchema);

export default Hero;



