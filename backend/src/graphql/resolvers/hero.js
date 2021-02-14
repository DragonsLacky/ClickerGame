import { ApolloError } from "apollo-server-express";




export default {
    Query: {
        getHero: async (_,{} , { Hero, user }) => {
            let hero = await Hero.findOne({owner: user.id});
            await hero.populate('owner').execPopulate();
            await hero.populate('gearpieces').execPopulate()
            await hero.populate('companions.companion').execPopulate()
            await hero.populate('artefacts.artefact').execPopulate()
            await hero.populate('zone').execPopulate()
            await hero.populate('zone.monster').execPopulate()
            await hero.populate('zone.owner').execPopulate()
            return hero;
        }
    },
    Mutation: {

        createHero: async (_, {}, { Hero, Zone, Monster, user }) => {
            let hero = await Hero.findOne({owner: user.id});
            if(hero){
                throw new ApolloError('Hero already exists');
            }
            let monster = await Monster.create({
                health: 20,
                image: 'http://localhost:8080/monster/monster.png',
                type: 'normal'
            });

            let zone = await Zone.create({
                monster: monster.id
            })
            
            hero = await Hero.create({owner: user.id, zone: zone.id})
            zone.owner = hero.id;
            await zone.save();
            await hero.populate('owner').execPopulate();
            await hero.populate('gearpieces').execPopulate()
            await hero.populate('companions.companion').execPopulate()
            await hero.populate('artefacts.artefact').execPopulate()
            await hero.populate('zone').execPopulate()
            await hero.populate('zone.monster').execPopulate()
            await hero.populate('zone.owner').execPopulate()
            return hero;
        },

        level_up: async (_, {levels}, {Hero, user}) => {
            let hero = await Hero.findOne({owner: user.id});

            let total_cost = hero.level_up;

            for(let i = hero.level + 1; i < hero.level + levels; ++i){
                total_cost += Math.floor((Math.pow((i*1.5),2.16)/21.7009)*0.3+1)
            }

            if(hero.balance < total_cost){
                throw new ApolloError('Not enoguh gold');
            }
            hero.balance -= total_cost;            
            
            hero.level += levels;
            hero.damage += Math.ceil((0.15 * Math.pow((hero.level+4),2.18) - 5.3)/(Math.sqrt(2*hero.level+8)-2)-hero.level+2.22) * 3;
            hero.level_up = Math.floor((Math.pow((hero.level*1.5),2.16)/21.7009)*0.3+1);
            
            await hero.save()

            await hero.populate('owner').execPopulate();
            await hero.populate('gearpieces').execPopulate()
            await hero.populate('companions.companion').execPopulate()
            await hero.populate('artefacts.artefact').execPopulate()
            await hero.populate('zone').execPopulate()
            await hero.populate('zone.monster').execPopulate()
            await hero.populate('zone.owner').execPopulate()

            return hero;
        },

        resetHero: async (_, {}, {Monster, Zone, Hero, user}) => {
            let hero = await Hero.findOne({owner: user._id});
            hero.populate('companions.companion').execPopulate();
            hero.populate('zone').execPopulate();
            hero.populate('zone.monster').execPopulate();
            await Monster.findOneAndDelete(hero.zone.monster);
            let monster = await Monster.create({
                health: 20,
                type: "normal",
                gold: 1,
                image: "http://localhost:8080/monster/monster.png",
                drop_chance: 4
            });
            hero.damage = 1;
            hero.level_up = 1;
            hero.companions = [];
            hero.resurection_points += Math.ceil( hero.level * hero.zone.level + (hero.balance * 0.3))
            hero.resurection_bonus += hero.zone.level*hero.level;
            hero.level = 1;
            hero.zone.monster = monster.id;
            hero.zone.level = 1;
            hero.zone.defeated = 0;
            hero.zone.award = 100;
            hero.balance = 0;

            await hero.zone.save()
            await hero.save()

            await hero.populate('owner').execPopulate();
            await hero.populate('gearpieces').execPopulate()
            await hero.populate('companions.companion').execPopulate()
            await hero.populate('artefacts.artefact').execPopulate()
            await hero.populate('zone').execPopulate()
            await hero.populate('zone.monster').execPopulate()
            await hero.populate('zone.owner').execPopulate()

            return hero;
        }   
    }
}



