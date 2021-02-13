<template>
  <div class="game h-full">
      <ApolloQuery class="h-full" :query="(gql) => gql `${heroQuery}`">
    <template class="h-full" v-slot="{result : {data, error, loading}}">
        <div v-if="loading" class="h-full">
            loading...
        </div>
        <div v-else-if="data" class="h-full">
            <div class="flex flex-col h-full relative z-10">
                <zone class="h-full" :zone="data.getHero.zone" :balance="data.getHero.balance" :resurection_points="data.getHero.resurection_points"></zone>
                <div class="absolute left-0 bottom-0 w-full z-30">
                    <div class="select-none cursor-pointer flex flex-row justify-end border-b-4 border-gray-700" v-on:click="gameTab"> <span class="mr-16 font-bold text-lg rounded-t-2xl bg-gray-700 flex flex-row px-16 text-white"> <span :class="herotabClass">></span> </span></div>
                    <div v-if="tabState" class="bg-gray-700 text-white border-gray-900 border-t-8 border-b-2">
                        <div class="flex flex-row px-4 h-full w-full border-b-2 border-black shadow-xl">
                            <t-button variant="tabmenu" @click="changeTab"  class="mx-3 w-1/5 text-xs text-center font-bold h-full " activateTab="hero_tab">H</t-button>
                            <t-button variant="tabmenu" @click="changeTab"  class="mx-3 w-1/5 text-xs text-center font-bold h-full " activateTab="companions_tab">C</t-button>
                            <t-button variant="tabmenu" @click="changeTab"  class="mx-3 w-1/5 text-xs text-center font-bold h-full " activateTab="gear_tab">G</t-button>
                            <t-button variant="tabmenu" @click="changeTab"  class="mx-3 w-1/5 text-xs text-center font-bold h-full " activateTab="artefacts_tab">A</t-button>
                            <t-button variant="tabmenu"                     class="mx-3 w-1/5 text-xs text-center font-bold h-full ">Buy</t-button>
                        </div>
                        
                        <hero v-if="tabs.hero_tab" class="h-64 overflow-auto" :hero="data.getHero"></hero>
                        <companions v-else-if="tabs.companions_tab" class="h-64 overflow-auto" :allcompanions="data.getCompanions" :herocompanions="data.getHero"></companions>
                        <gear class="h-64 overflow-auto" v-if="tabs.gear_tab" :gear="data.getHero.gearpieces"></gear>
                        <artefacts class="h-64 overflow-auto" v-if="tabs.artefacts_tab" :artefacts="data.getHero.artefacts"></artefacts>
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
import { GET_COMPANIONS } from '@/gql'
import { apolloClient } from '@/vue-apollo'


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
            companionGetQuery:`
                query GET_COMPANIONS {
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
            herotabClass : 'transform -rotate-90',
            tabs: {
                hero_tab:true,
                companions_tab:false,
                gear_tab:false,
                artefacts_tab:false
            },
            current_tab:'hero_tab'
        }                   
    },
    components:{
        hero,
        zone,
        gear,
        artefacts,
        Companions,
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
        async getCompanions(){
            return (await apolloClient.query({query: GET_COMPANIONS})).data.getCompanions;
        }
    }
}
</script>

<style>

</style>