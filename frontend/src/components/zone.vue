<template>
    <div class="zone bg-forest relative z-10 select-none">
        <div class="flex flex-row justify-between">
            <div class=" text-sm md:text-lg font-bold bg-gray-700 text-gray-50 p-4 text-left w-40 h-12 md:h-16 shadow-lg rounded-br-full">Defeated: {{ zone.defeated }}</div>
            <div class="flex flex-row justify-center md:text-4xl font-bold bg-gray-700 text-center text-lg  rounded-b-full text-gray-50 h-8 md:h-12 w-64">Zone: {{ zone.level }}</div>
            <div class=" text-sm md:text-lg font-bold bg-gray-700 text-gray-50 h-12 rounded-bl-full md:h-16 flex flex-col justify-center shadow-lg p-2 w-64 text-center">
                <div class="px-6 overflow-hidden h-8 text-bold">
                    Gold: {{ hero.balance }}
                </div>
                <div class="px-6 overflow-hidden h-8 text-bold">
                    Resurection: {{ hero.resurection_points }}
                </div>
            </div>
        </div>
        <monster :monster="zone.monster" :zone="zone" :hero="hero"></monster>
    </div>
</template>

<script>
import monster from '@/components/monster'
export default {
    props:{
        zone: {type: Object, required: true},
        hero: {type: Object, required:true},
        resurection_points: {type: Number, required:true}
    },
    components:{
        monster
    }
}
</script>

<style>

</style>