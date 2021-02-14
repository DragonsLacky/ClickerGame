import { ApolloError } from "apollo-server-express";
import { GenerateRandomRarity, GenerateRandomArmorPiece, GenerateRandomItem } from '../../functions'



export default {
    Query: {
        getEquippedGear: async (_,{} , { Hero, user }) => {
            let hero = await Hero.findOne({owner: user.id, equipped:true});
            await hero.populate('gearpieces').execPopulate();
            return hero.gearpieces;
        },
        getAllGear: async (_, {}, { Hero, user}) => {
            let hero = await Hero.findOne({owner: user.id})
            await hero.populate('gearpieces').execPopulate();
            return hero.gearpieces;
        }
    },
    Mutation: {
        createGear: async (_, {}, { Hero, Gear, user }) => {
            let hero = await Hero.findOne({owner: user._id});
            await hero.populate('zone').execPopulate();
            await hero.populate('zone.monster').execPopulate();
            let items = {
                drop: {
                    probability: hero.zone.monster.drop_chance/100,
                    value:true
                },
                not_drop: {
                    probability: hero.zone.monster.drop_chance/100,
                    value: true
                }
            };
            let drop = GenerateRandomItem(items);
            if(!drop.value.value){
                throw new ApolloError('No item');
            }
            let rarity = GenerateRandomRarity();
            let gearType = GenerateRandomArmorPiece();
            let gear = await Gear.create({
                image: `http://localhost:8080/Gear/${rarity.key}/${gearType.key}.png`,
                name: gearType.key,
                type: gearType.key,
                rarity: rarity.key,
                multilpier: rarity.value.value,
                owner: hero.id
            });
            hero.gearpieces.push(gear._id);
            await hero.save();
            return gear;
        },

        equipGear: async (_, {id}, {Hero, Gear, user}) => {
            let hero = await Hero.findOne({owner: user._id});
            await hero.populate('gearpieces').execPopulate();
            let gearPiece = hero.gearpieces.filter(doc => doc._id.toString() === id.toString())[0];
            if(!gearPiece){
                throw new ApolloError('Gear does not exist')
            }

            const stat =  {
                Helmet : 'boss_gold',
                Chestplate: 'companion_damage',
                Leggings: 'critical_chance',
                Shoes: 'critical_damage',
                Gauntlets: 'luck',
                Sword: 'hero_damage'
            }

            const Rarity = {
                'Legendary': 5,
                'Special': 4, 
                'Rare': 3,
                'Uncommon': 2,
                'Common' : 1
            }

            let equipedGear = hero.gearpieces.filter(doc => doc.type === gearPiece.type && doc.equipped)[0];
            
            if(equipedGear){
                equipedGear.equipped = false;
                hero[stat[equipedGear.type]] -= Rarity[equipedGear.rarity] * equipedGear.multilpier;
                await equipedGear.save();
            }
            
            gearPiece.equipped=true;

            hero[stat[gearPiece.type]] += Rarity[gearPiece.rarity] * gearPiece.multilpier;

            await gearPiece.save();
            await hero.save();

            await hero.populate('gearpieces').execPopulate();
            await hero.populate('gearpieces.owner').execPopulate()

            return hero.gearpieces;
        },

        unEquipGear: async (_, {id}, {Hero, Gear, user}) => {
            let hero = await Hero.findOne({owner: user._id});
            await hero.populate('gearpieces').execPopulate();
            let gearPiece = hero.gearpieces.filter(doc => doc._id.toString() === id.toString() && doc.equipped)[0];
            if(!gearPiece){
                throw new ApolloError('Gear does not exist or is not equiped')
            }
            gearPiece.equipped=false;

            const stat =  {
                Helmet : 'boss_gold',
                Chestplate: 'companion_damage',
                Leggings: 'critical_chance',
                Shoes: 'critical_damage',
                Gauntlets: 'luck',
                Sword: 'hero_damage'
            }

            const Rarity = {
                'Legendary': 5,
                'Special': 4, 
                'Rare': 3,
                'Uncommon': 2,
                'Common' : 1
            }

            hero[stat[gearPiece.type]] -= Rarity[gearPiece.rarity] * gearPiece.multilpier;

            await gearPiece.save();
            await hero.save();
            await hero.populate('gearpieces').execPopulate();
            await hero.populate('gearpieces.owner').execPopulate()
            return hero.gearpieces;
        }
    }
}



