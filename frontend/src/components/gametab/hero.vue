<template>
  <div class="hero">
      <t-modal v-model="heroInfoshow" class="text-black" header="Hero info">
            <div class="flex flex-wrap">
                <div class="w-1/2 flex flex-col">
                    <div class="flex flex-row justify-between px-3">
                        <span>Level:</span><span>{{ hero.level }}</span>
                    </div>
                    <div class="flex flex-row justify-between px-3">
                        <span>Gold: </span><span>{{ hero.balance }}</span>
                    </div>
                    <div class="flex flex-row justify-between px-3">
                        <span>Damage: </span><span>{{ round(hero.damage) }}</span>
                    </div> 
                    <div class="flex flex-row justify-between px-3">
                        <span>Resurection Points: </span><span>{{ hero.resurection_points }}</span>
                    </div>
                    <div class="flex flex-row justify-between px-3">
                        <span>Resurection Bonus: </span><span>{{ round(hero.resurection_bonus) }}</span>
                    </div> 
                    <div class="flex flex-row justify-between px-3">
                        <span> Luck: </span><span>{{ round(hero.luck) }}</span>
                    </div>
                    <div class="flex flex-row justify-between px-3">
                        <span> Upgrade cost reduction: </span><span>{{ round(hero.upgrade_cost) }}%</span>
                    </div>
                </div>
                <div class="w-1/2 flex flex-col">
                    <div class="flex flex-row justify-between px-3">
                        <span> Critical Chance:  </span> <span> {{ round(hero.critical_chance) }}% </span>
                    </div>
                    <div class="flex flex-row justify-between px-3">
                        <span> Critical multilpier:  </span> <span> {{ round(hero.critical_damage) }}x </span>
                    </div>
                    <div class="flex flex-row justify-between px-3">
                        <span> All Damage:  </span> <span> {{ round(hero.all_damage) }}x </span>
                    </div>
                    <div class="flex flex-row justify-between px-3">
                        <span> Hero Damage:  </span> <span> {{ round(hero.hero_damage) }}x </span>
                    </div>
                    <div class="flex flex-row justify-between px-3">
                        <span> Companion Damage:  </span> <span> {{ round(hero.companion_damage) }}x </span>
                    </div>
                    <div class="flex flex-row justify-between px-3">
                        <span> Boss Gold: </span><span>{{ round(hero.boss_gold) }}x</span>
                    </div>
                    <div class="flex flex-row justify-between px-3">
                        <span> Level Up cost: </span><span>{{ round(hero.level_up) }}</span>
                    </div>
                </div>
            </div>
        </t-modal>
        <div class="flex flex-row w-full m-0 text-sm font-bold md:font-normal lg:text-base">
            <div class="flex flex-wrap p-4 w-full select-none">
                <div class="flex flex-row my-3 p-1 md:p-2 w-full md:w-1/2 justify-between"> <span>Hero Damage:</span> <pre>{{ hero.damage }}</pre> </div>
                <div class="flex flex-row my-3 p-1 md:p-2 w-full md:w-1/2 justify-between"> <span>Companion Damage:</span> <pre>{{ companionDamage }}</pre> </div>
                <div class="flex flex-row my-3 p-1 md:p-2 w-full md:w-1/2 justify-between"> <span>Hero Level:</span> <pre>{{ hero.level }}</pre> </div>
                <div class="flex flex-row my-3 p-1 md:p-2 w-full md:w-1/2 justify-between"> <span>Level up cost:</span> <pre>{{ level_cost }}</pre> </div>
            </div>
            <div class="flex flex-col justify-around w-1/3 p-4">
                <div class="flex flex-row">
                    <t-button :variant="available[checkavailability]" @click="level_up" class="p-2 w-3/4 m-2 text-xs lg:text-lg twxt-center font-bold">Level up</t-button>
                    <t-button variant="tabmenu" @click="toggle_times" class="p-2 w-16 text-xs  lg:text-lg twxt-center font-bold m-2">{{ level_times }}</t-button>
                </div>
                <t-button variant="tabmenu" @click="heroInfo" class="p-4 text-xs  lg:text-lg twxt-center font-bold m-2">Hero Info</t-button>
            </div>
        </div>
        
  </div>
</template>

<script>
import {HERO_LEVEL_UP} from '@/gql'

export default {
    props:{
        hero:{
            type: Object,
            required: true
        }
    },
    data: () => {
        return{
            heroInfoshow: false,
            level_up_times: {
                x1: 1,
                x10: 10,
                x100: 100,
            },
            level_up_toggle: {
                x1: 'x10',
                x10: 'x100',
                x100: 'x1',
            },
            available:{
                'true': 'tabmenu',
                'false':'dissabled'
            },
            level_times: 'x1',
            level_cost: 0
        }
    },
    mounted(){
        this.level_cost = this.hero.level_up
    },
    computed: {
        companionDamage() {
            if(this.hero.companions.length > 1){
                return this.hero.companions.map(HeroCompanion => HeroCompanion.companion.dps * HeroCompanion.level).reduce((a,b) => a+b) * this.hero.companion_damage;
            }else{
                let dmg = this.hero.companions.map(HeroCompanion => HeroCompanion.companion.dps * HeroCompanion.level)[0];
                return  dmg ? dmg*this.hero.companion_damage : 0;
            }
        },
        checkavailability(){
            return this.hero.balance >= this.level_cost;
        },
        
    },
    methods: {
        heroInfo() {
            this.heroInfoshow = !this.heroInfoshow;
        },
        round(number){
            return Math.round(number * 100) / 100
        },
        async level_up(){
            let result = await this.$apollo.mutate({
                mutation: HERO_LEVEL_UP,
                variables:{
                    levels: this.level_up_times[this.level_times]
                }
            })
            console.log(result)
            //this.hero.level_up = result.data.level_up.level_up;
            this.update_cost()
        },
        toggle_times(){
            this.level_times = this.level_up_toggle[this.level_times];
            this.update_cost()
        },
        update_cost(){
            this.level_cost = this.hero.level_up;
            for(let i = this.hero.level+1; i < this.hero.level + this.level_up_times[this.level_times]; ++i){
                this.level_cost += Math.floor((Math.pow((i*1.5),2.16)/21.7009)*0.3+1)
            }
        }
    },

}
</script>

<style>

</style>