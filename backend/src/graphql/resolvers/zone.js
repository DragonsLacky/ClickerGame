import { ApolloError } from "apollo-server-express";




export default {
    Query: {
        getZone: async (_,{} , { Hero, user }) => {
            let hero = await Hero.findOne({owner: user.id});
            await hero.populate('zone').execPopulate();
            return hero.zone;
        }
    },
    Mutation: {
        createZone: async (_, {}, { Hero, Zone, Monster, user }) => {
            let hero = await Hero.findOne({owner: user.id});
            if(!hero){
                throw new ApolloError('Hero does not exist');
            } 
            
            let monster = await Monster.create({
                health: 20,
                image: 'http://localhost:8080/monster/monster.png',
                type: 'normal',
            });

            console.log(monster);

            let zone = await Zone.create({
                monster: monster.id
            })
            hero.zone = zone.id;
            await hero.save()
            return zone;
        }
    }
}



