<template>
  <div class="companions">
      <div class="flex flex-row w-full m-0 text-sm font-bold md:font-normal lg:text-base">
            <div class="flex flex-wrap p-4 w-full select-none">
                <div v-for="companion in companions" class="flex flex-row w-full lg:w-1/2 border-gray-900 border-2 p-2 bg-gray-800 rounded-xl" :key="companion.level ? companion.companion.id : companion.id ">
                    <img :src="companion_image(companion)" class="w-16 h-16 rounded-full bg-gray-900 border-2 border-black" alt="geariimage">
                    <div class="flex flex-wrap w-full text-center text-sm md:text-lg font-bold justify-around">
                        <span class="w-1/2">{{ companion_name(companion) }}</span>
                        <span class="w-1/2"> Level: {{ companion_level(companion) }} </span>
                        <span class="w-1/2">Damage: {{ companion_dps(companion) }}</span>
                        <span class="w-1/2" >Cost: {{ companion_cost(companion) }}</span>
                    </div>
                    <t-button :variant="available[checkavailability(companion)]" @click="companion.level ? level_up_companion(companion) : buy_companion(companion)" class="rounded-full w-32">{{ companion_owned(companion) }}</t-button>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
import {BUY_COMPANION, GET_COMPANIONS, COMPANION_LEVEL_IP} from '@/gql'

export default {
    props: {
        allcompanions: {type: Array, required: false},
        herocompanions:{type: Array, required: true},
        hero: {type: Object, required: true},
        levels: {type: String, required: true}
    },
    data: () => {
        return{
            level_up_times: {
                x1: 1,
                x10: 10,
                x100: 100,
            },
            available:{
                'true': 'tabmenu',
                'false':'dissabled'
            }
        }
    },
    computed:{
        companions() {    
            if(this.herocompanions.length !== 0){
                let graycompanions = this.allcompanions.filter(doc => !this.hero.companions.some(doc2 => doc.id.toString() === doc2.companion.id.toString()))
                let companions = [];
                this.hero.companions.forEach( v => {
                    companions.push(v);
                });
                graycompanions.forEach( v => {
                    companions.push(v);
                });
                return companions;
            }else{
                return this.allcompanions;
            }
        },
        heroCompanionsComputed:{
            get(){
                return this.herocompanions;
            },
            set(val){
                this.$emit('input', val);
            }
        }
        
    },
    mounted(){
        this.setCompanions()
    },
    methods:{
        async buy_companion(companion){
            let result = await this.$apollo.mutate({
                mutation: BUY_COMPANION,
                variables: { id:companion.id }
            })
            this.herocompanions.push(result.data.createCompanion.HeroCompanion);
            this.hero.balance = result.data.createCompanion.balance;
        },
        async level_up_companion(companion){
            let result = await this.$apollo.mutate({
                mutation: COMPANION_LEVEL_IP,
                variables: { 
                    id: companion.companion.id,
                    levels: this.level_up_times[this.levels]
                }
            })
            this.hero.companions.filter(doc => doc.companion.id.toString() === result.data.level_up_companion.HeroCompanion.companion.id)[0].level = result.data.level_up_companion.HeroCompanion.level
            this.hero.balance = result.data.level_up_companion.balance;
        },
        checkavailability(companion){
            return this.hero.balance >= this.companion_cost(companion)
        },
        companion_owned(companion) {
            return companion.level ? 'Level up' : 'Buy';
        },
        companion_image(companion){
            return companion.level ? companion.companion.image : companion.image;
        },
        companion_dps(companion){
            return companion.level ?  companion.companion.dps * companion.level  : companion.dps;
        },
        companion_name(companion){
            return companion.level ? companion.companion.name : companion.name;
        },
        companion_level(companion){
            return companion.level ? companion.level : 0
        },
        companion_cost(companion){
            if(companion.level){
                let total_cost = Math.floor((companion.level * companion.companion.cost) - (companion.level * companion.companion.cost) * (this.hero.upgrade_cost/100));
                for(let i = companion.level + 1; i <  companion.level + this.level_up_times[this.levels]; ++i){
                    total_cost += Math.floor((i * companion.companion.cost) - (i * companion.companion.cost) * (this.hero.upgrade_cost/100))
                }
                return total_cost;
            }else{
                return companion.cost;
            }
        },
        async setCompanions(){
            this.allcompanions = (await this.$apollo.query({
                query: GET_COMPANIONS
            })).data.getCompanions;
        }
    }
}
</script>

<style>

</style>