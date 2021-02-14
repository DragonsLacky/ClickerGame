<template>
    <div class="monster relative h-full">
        <div class="w-full flex flex-row justify-center text-lg font-bold">
            <div class="w-64 p-1 m-4 text-center bg-gray-400 rounded-full relative"><div class="bg-red-400 rounded-full h-7" :style="{width:healthPercentage}"><div class="absolute w-full">{{ monster.health }}</div></div></div>
        </div>
        <img :src="monster.image" @click="damageMonster" class="h-86 md:h-1/2 absolute right-1/6  md:right-1/3 lg:w-1/2 lg:h-auto lg:bottom-28 xl:bottom-12 bottom-64" alt="">
    </div>
</template>

<script>

import { KILL_MONSTER, ROLL_GEAR } from '@/gql'

export default {
    props:{
        monster: {type: Object, required:true},
        zone: {type: Object, required: true},
        hero: {type: Object, required: true}
    },
    data: ()=> {
        return {
            maxHealth: 0,
            interval: ''
        }
    },
    mounted() {
        this.maxHealth = this.monster.health;
    },
    computed:{
        healthPercentage(){
            return (this.monster.health/this.maxHealth * 100).toString() + '%';
        },
        currentHealth:{
            get(){
                return this.monster.health;
            },
            set(val){
                this.$emit('input', val);
            }
        },
        totalCompanionDamage() {
            if(this.hero.companions.length > 1){
                return this.hero.companions.map(HeroCompanion => HeroCompanion.companion.dps * HeroCompanion.level).reduce((a,b) => a+b) * this.hero.companion_damage;
            }else{
                let dmg = this.hero.companions.map(HeroCompanion => HeroCompanion.companion.dps * HeroCompanion.level)[0];
                return  dmg ? dmg*this.hero.companion_damage : 0;
            }
        }
    },
    beforeDestroy () {
       clearInterval(this.interval)
    },
    created() {
        this.interval = setInterval(() => { this.companionDamage()}, 4000);
    },
    methods:{
        damageMonster() {
            const critical_hit = {
                'crit_hit': {
                    probability: this.hero.critical_chance/100,
                    value: true
                },
                'normal_hit':{
                    probability: 1-(this.hero.critical_chance/100),
                    value: false
                }
            }
            let hit = this.GenerateRandomItem(critical_hit);
            hit = hit.value.value ? this.hero.critical_damage : 1;
            let damage = Math.ceil(this.hero.damage * this.hero.all_damage * this.hero.hero_damage * hit );
            this.monster.health -=  damage;
        },
        companionDamage(){
            this.monster.health -= this.totalCompanionDamage * this.hero.all_damage * this.hero.companion_damage;
        },
        updateZone(monster){
            this.zone.defeated = monster.data.createAndReplace.defeated;
            this.zone.level = monster.data.createAndReplace.level;
            this.zone.monster = monster.data.createAndReplace.monster;
            this.monster = monster.data.createAndReplace.monster;
            this.hero.balance = monster.data.createAndReplace.owner.balance;
            this.maxHealth = this.zone.monster.health;
            this.$forceUpdate();
        },
        GenerateRandomItem(items) {
            let p = Math.random();
            let probability = 0;
            for (let [key, value] of Object.entries(items)) {
                probability = probability + value.probability;
                if (p < probability) {
                    return {key, value}
                }
            }
        }
    },
    watch:{
        async currentHealth(value) {
            if(value <= 0){
                let monster = await this.$apollo.mutate({
                    mutation: KILL_MONSTER
                });
                this.$apollo.mutate({
                    mutation: ROLL_GEAR
                });
                this.updateZone(monster);
                this.$forceUpdate();
            }
        }
    }
}
</script>

<style>

</style>