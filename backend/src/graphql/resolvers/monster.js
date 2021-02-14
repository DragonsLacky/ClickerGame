import { ApolloError } from "apollo-server-express";


export default {
    Query: {
        getMonster: async (_,{} , { Hero, user }) => {
            let hero = await Hero.findOne({owner: user.id});
            await hero.populate('zone').execPopulate();
            await hero.zone.populate('monster').execPopulate();
            return hero.zone.monster;
        }
    },
    Mutation: {
        createMonster: async (_, {}, { Monster }) => {
            let monster = await Monster.create({
                health: 1000000,
                image: 'http://localhost:8080/monster/monster.png',
                type: 'normal',
                drop_chance: 0,
                gold: 0
            })
            return monster;
        },
        createAndReplace : async (_, {}, { Monster, Zone, Hero, user }) => {
            let hero = await Hero.findOne({owner: user.id});
            let zone = await Zone.findOne({owner: hero._id});
            console.log(zone);
            await zone.populate('monster').execPopulate();

            let monster = await Monster.findOneAndDelete({_id: zone.monster.id});
            hero.balance += Math.ceil(monster.gold);
            if(zone.defeated < 10 && zone.defeated >= 0){
                ++zone.defeated;
                let health = 20 * (zone.level * (zone.defeated+1))
                monster = await Monster.create({
                    health: health,
                    image: 'http://localhost:8080/monster/monster.png',
                    type: 'normal',
                    gold: Math.ceil((zone.level * 5 * (zone.level + hero.resurection_bonus)) * hero.luck)
                })
            }else{
                zone.defeated = 0;
                zone.level = zone.level + 1;
                zone.award = zone.award * zone.level * 0.5;
                let health = 100 * (zone.level * ((zone.defeated+1)  + hero.level));
                monster = await Monster.create({
                    health: health,
                    image: 'http://localhost:8080/monster/monster.png',
                    type: 'boss',
                    gold: Math.ceil(((zone.level * 10 * (zone.level + hero.resurection_bonus)) * hero.luck) * hero.boss_gold)
                })
            }


            zone.monster = monster.id;
            await hero.save()
            await zone.save();
            await zone.populate('monster').execPopulate();
            await zone.populate('owner').execPopulate();
            
            return zone;
        }
    }
}



