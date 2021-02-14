<template>
  <div class="artefacts">
      <div class="flex flex-row w-full m-0 text-xm font-bold md:font-normal lg:text-md">
            <div class="flex flex-wrap p-4 w-full select-none">
                <div v-for="artefact in hero.artefacts" class="flex flex-row w-full lg:w-1/2 border-gray-900 border-2 p-2 mb-1 lg:m-0 bg-gray-800 rounded-xl" :key="artefact.id">
                    <img :src="artefact.artefact.image" class="w-16 h-16 rounded-full bg-gray-900 border-2 border-black" alt="geariimage">
                    <div class="flex flex-wrap w-full text-center text-sm md:text-lg font-bold justify-around">
                        <span class="w-1/2">{{ artefact.artefact.name }}</span>
                        <span class="w-1/2"> Level: {{ artefact.level }} </span>
                        <span class="w-1/2" :class="raritycolor[artefact.artefact.rarity]">{{ artefact.artefact.rarity }}</span>
                        <span class="w-1/2">{{ artefactMultiplier(artefact)  }}</span>
                    </div>
                    <t-button :variant="available[checkavailability(artefact)]" @click="level_up(artefact)" class="text-xs lg:text-base text-bold rounded-full w-32">Level up {{artefactCost(artefact)}}</t-button>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
import { ARTEFACT_LEVEL_UP,GET_HERO } from '@/gql'

export default {
    props: {
        artefacts: {type: Array, required: true},
        hero: {type: Object, required: true}
    },
    data: () => {
        return {
            raritycolor: {
                    Legendary: 'text-purple-500',
                    Special: 'text-red-500',
                    Rare: 'text-yellow-300',
                    Uncommon: 'text-blue-500',
                    Common: 'text=gray-400'
            },
            available:{
                'true': 'tabmenu',
                'false':'dissabled'
            }
        }
    },
    computed:{
        resurection_points:{
            get(){
                return this.hero.resurection_points
            },
            set(val){
                this.$emit('input', val);
            }
        }
    },
    methods:{
        async level_up(artefact) {
            let result = await this.$apollo.mutate({
                mutation: ARTEFACT_LEVEL_UP,
                variables: {id: artefact.id}
            })
            artefact.level = result.data.level_up_artefact.HeroArtefact.level;
            this.hero.resurection_points = result.data.level_up_artefact.resurection_points;
            this.hero[result.data.level_up_artefact.playerstat] = result.data.level_up_artefact.multilpier;
        },
        artefactCost(artefact){
            return Math.floor((artefact.level * artefact.artefact.cost) - (artefact.level * artefact.artefact.cost) * (this.hero.upgrade_cost/100))
        },
        artefactMultiplier(artefact){
            return artefact.artefact.stat.replace('_',' ') + ': ' + (Math.round(artefact.artefact.multilpier * artefact.level * 100)/100).toString()+'x'
        },
        checkavailability(artefact){
            return this.hero.resurection_points >= this.artefactCost(artefact);
        },
        async updateHero() {
            let result = await this.$apollo.query({
                query: GET_HERO
            })
            this.hero.resurection_points = result.data.getHero.resurection_points;
        }
    }
}
</script>

<style>

</style>