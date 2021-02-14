import { ApolloError } from "apollo-server-express";

export default {
    Query: {
        getCompanions: async (_,{} , { Companion }) => {
            let companions = await Companion.find();
            return companions;
        },
        getHeroCompanions: async (_,{} , { Hero, user }) => {
            let hero = await Hero.findOne({owner: user.id});
            await hero.populate('companions.companion').execPopulate();
            return hero.companions;
        },
    },
    Mutation :{
        createCompanion: async (_, {id}, { Companion, Hero, user }) => {
            let hero = await Hero.findOne({owner: user.id});
            let companion = await Companion.findOne({_id:id});
            await hero.populate('companions.companion').execPopulate();

            let exist = hero.companions.some(doc => doc.companion._id.toString() === id.toString());
            
            if(exist) {
                throw new ApolloError('The companion already exists');
            }

            if(hero.balance < companion.cost){
                throw new ApolloError('Not enough gold');
            }

            hero.balance -= companion.cost;

            hero.companions.push({
                companion: companion.id,
                level:1
            })
            

            await hero.save()
            await hero.populate('companions.companion').execPopulate();

            companion = hero.companions.filter(doc => doc.companion._id.toString() === id.toString())[0];

            return {
                HeroCompanion: companion,
                balance: hero.balance
            };
        },
        level_up_companion: async (_, {id, levels}, { Hero, user }) => {
            let hero = await Hero.findOne({owner: user.id});
            let companion = hero.companions.filter(doc => doc.companion._id.toString() === id.toString())[0];
            await hero.populate('companions.companion').execPopulate();
            
            let total_cost = Math.floor((companion.level * companion.companion.cost) - (companion.level * companion.companion.cost) * (hero.upgrade_cost/100))
            for(let i = companion.level + 1; i <  companion.level + levels; ++i){
                total_cost += Math.floor((i * companion.companion.cost) - (i * companion.companion.cost) * (hero.upgrade_cost/100))
            }

            if(hero.balance < total_cost){
                throw new ApolloError('Not enough funds')
            }

            hero.balance -= total_cost;
            companion.level += levels;
            await hero.save()
            
            return {
                HeroCompanion: companion,
                balance: hero.balance
            };
        }
    }
}



