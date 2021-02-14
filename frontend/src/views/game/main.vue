<template>
  <div class="game h-full">
      <ApolloQuery class="h-full" :query="(gql) => gql `${heroQuery}`">
    <template class="h-full" v-slot="{result : {data, error, loading}}">
        <div v-if="loading" class="h-full">
            loading...
        </div>
        <div v-else-if="data" class="h-full">
            <div class="flex flex-col h-full relative z-10">
                <zone class="h-full" :zone="data.getHero.zone" :hero="data.getHero" :resurection_points="data.getHero.resurection_points"></zone>
                <div class="absolute left-0 bottom-0 w-full z-30">
                    <div class="select-none cursor-pointer flex flex-row justify-end border-b-4 border-gray-700" v-on:click="gameTab"> <span class="mr-16 font-bold text-lg rounded-t-2xl bg-gray-700 flex flex-row px-16 text-white"> <span :class="herotabClass">></span> </span></div>
                    <div v-if="tabState" class="bg-gray-700 text-white border-gray-900 border-t-8 border-b-2">
                        <div class="flex flex-row items-center px-4 h-full w-full border-b-2 border-black shadow-xl">
                            <t-button variant="tabmenu" @click="changeTab"  class="mx-3 w-13 md:w-32 text-xs text-center font-bold h-10 " activateTab="hero_tab">H</t-button>
                            <t-button variant="tabmenu" @click="changeTab"  class="mx-3 w-13 md:w-32 text-xs text-center font-bold h-10 " activateTab="companions_tab">C</t-button>
                            <t-button variant="tabmenu" @click="changeTab"  class="mx-3 w-13 md:w-32 text-xs text-center font-bold h-10 " activateTab="gear_tab">G</t-button>
                            <t-button variant="tabmenu" @click="changeTab"  class="mx-3 w-13 md:w-32 text-xs text-center font-bold h-10 " activateTab="artefacts_tab">A</t-button>
                            <t-button v-if="tabs.artefacts_tab" variant="tabmenu" class="mx-3 w-13 text-xs  text-center font-bold  h-10"  @click="buyArtefact" >Buy {{ artefactCostComputed }}</t-button>
                            <t-button v-if="tabs.companions_tab" variant="tabmenu" class="mx-3 w-13 text-xs  text-center font-bold h-10 "  @click="level_toggle" > {{ levels }}</t-button>
                            <t-button v-if="data.getHero.level >= 100 " variant="tabmenu" class="mx-3 w-13 md:w-32 text-sm text-center font-bold h-10"  @click="resurect" > Reset </t-button>
                        </div>
                        <hero v-if="tabs.hero_tab" class="h-64 overflow-auto" :hero="data.getHero"></hero>
                        <companions v-else-if="tabs.companions_tab" class="h-64 overflow-auto" :allcompanions="data.getCompanions" :herocompanions="data.getHero.companions" :hero="data.getHero" :levels="levels" ></companions>
                        <gear class="h-64 overflow-auto" v-if="tabs.gear_tab" :gear="data.getHero.gearpieces" :hero="data.getHero"></gear>
                        <artefacts class="h-64 overflow-auto" v-if="tabs.artefacts_tab" :artefacts="data.getHero.artefacts" :hero="data.getHero"></artefacts>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="error">
            <pre>{{ error }}</pre>
        </div>
    </template>
    </ApolloQuery>
  </div>
</template>




<script>
import hero from '@/components/gametab/hero'
import gear from '@/components/gametab/gear'
import artefacts from '@/components/gametab/artefacts'
import { GET_HERO, BUY_ARTEFACT, RESURECT_HERO } from '@/gql'
import zone from '@/components/zone';
import Companions from '@/components/gametab/companions'

export default {
    data: () => {
        return {
            heroQuery: `
                query GET_HERO {
                    getHero{
                        id
                        level
                        balance
                        damage
                        level_up
                        resurection_points
                        resurection_bonus
                        critical_chance
                        critical_damage
                        all_damage
                        companion_damage
                        hero_damage
                        boss_gold
                        upgrade_cost
                        luck
                        companions{
                            id
                            companion{
                                id
                                name
                                dps
                                image
                                cost
                            }
                            level
                        }
                        artefacts{
                            id
                            artefact{
                                id
                                name
                                image
                                multilpier
                                stat
                                rarity
                                cost
                            }
                            level
                        }
                        gearpieces{
                            id
                            image
                            multilpier
                            type
                            rarity
                            name
                            equipped
                        }
                        zone{
                            monster{
                                health
                                image
                                type
                                drop_chance
                                gold
                            }
                            award
                            drop_chance
                            level
                            defeated
                        }
                        owner{
                            id
                            username
                            email
                        }
                    }
                    getCompanions{
                        id
                        name
                        image
                        cost
                        dps
                    }
                }
            `,
            tabState: false,
            heroTabButtonClasses: {
                opened:'transform -rotate-90',
                closed: 'transform rotate-90'
            },
            heroval: {},
            herotabClass : 'transform -rotate-90',
            tabs: {
                hero_tab:true,
                companions_tab:false,
                gear_tab:false,
                artefacts_tab:false
            },
            current_tab:'hero_tab',
            artefactCost : 0,
            level_up_toggle: {
                x1: 'x10',
                x10: 'x100',
                x100: 'x1',
            },
            levels: 'x1',
        }                   
    },
    apollo:{
        getHero: {
            query: GET_HERO
        }
    },
    computed: {
         heroprop : {
             get(){
                 return this.heroval
             },
             set(val){
                 this.$emit('input', val);
             }
         },
         artefactCostComputed:{
             get() {
                 return this.artefactCost;
             },
             set(val){
                 this.$emit('input', val)
             }
         }
    },
    components:{
        hero,
        zone,
        gear,
        artefacts,
        Companions,
    },
    mounted(){
        this.newArtefactCost();
    },
    methods:{
        gameTab(){
            this.tabState = !this.tabState;
            this.herotabClass = this.herotabClass !== this.heroTabButtonClasses.opened ? this.heroTabButtonClasses.opened : this.heroTabButtonClasses.closed;
        },

        changeTab(e){
            this.tabs[this.current_tab] = false;
            this.tabs[e.target.getAttribute('activateTab')]= true;
            this.current_tab = e.target.getAttribute('activateTab');
        },

        async newArtefactCost() {
            let data = await this.$apollo.queries.getHero.refetch();
            data = data.data.getHero; 
            this.heroval = data;
            this.artefactCost = this.isNumber(data.artefacts.length) ? (data.artefacts.length + 1) * 100 : 100;
        },

        async buyArtefact() {
            await this.$apollo.mutate({
                mutation: BUY_ARTEFACT
            });
            this.newArtefactCost();
        },
        async resurect(){
            let result = await this.$apollo.mutate({
                mutation: RESURECT_HERO
            })
            this.hero.zone.defeated = result.data.resetHero.zone.defeated;
        },
        isNumberValue(value) {
            return typeof value === 'number' && isFinite(value);
        },
        
        isNumberObject(n) {
            return (Object.prototype.toString.apply(n) === '[object Number]');
        },
        
        isNumber(n) {
            return this.isNumberValue(n) || this.isNumberObject(n);
        },

        level_toggle(){
            this.levels = this.level_up_toggle[this.levels];
        }

    }
}
</script>

<style>

</style>