<template>
    <div class="monster relative h-full">
        <div class="w-full flex flex-row justify-center text-lg font-bold">
            <div class="w-64 p-1 m-4 text-center bg-gray-400 rounded-full relative"><div class="bg-red-400 rounded-full h-7" :style="{width:healthPercentage}"><div class="absolute w-full">{{ monster.health }}</div></div></div>
        </div>
        <img :src="monster.image" @click="damageMonster" class="h-1/2 absolute right-1/6 md:right-1/3 lg:w-1/2 lg:h-auto bottom-24" alt="">
    </div>
</template>

<script>
export default {
    props:{
        monster: {type: Object, required:true}
    },
    data: ()=> {
        return {
            maxHealth: 0,
        }
    },
    mounted() {
        this.maxHealth = this.monster.health;
    },
    computed:{
        healthPercentage(){
            return (this.monster.health/this.maxHealth * 100).toString() + '%';
        },
        currentHealth(){
            return this.monster.health;
        }
    },
    methods:{
        damageMonster(){
            this.monster.health--;
        }
    },
    watch:{
        currentHealth(value) {
            if(value === 0){
                this.monster.health++;
                this.$forceUpdate();
            }
        }
    }
}
</script>

<style>

</style>