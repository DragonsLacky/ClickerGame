<template>
    <div class="zone bg-forest relative z-10 select-none">
        <div class="flex flex-row justify-between">
            <div class=" text-sm md:text-lg font-bold bg-gray-700 text-gray-50 p-4 text-left w-40 shadow-lg rounded-br-full">Defeated: {{ zone.defeated }}</div>
            <div class="flex flex-row justify-center text-4xl font-bold bg-gray-700 rounded-b-full text-center text-gray-50 h-12 w-64">Zone: {{ zone.level }}</div>
            <div class=" text-sm md:text-lg font-bold bg-gray-700 text-gray-50 rounded-bl-full shadow-lg p-2 w-64 text-center">
                <div class="px-6 overflow-x-hidden text-bold">
                    Gold: {{ balance }}
                </div>
                <div class="px-6 overflow-x-hidden text-bold">
                    Resurection: {{ resurection_points }}
                </div>
            </div>
        </div>
        <monster :monster="zone.monster"></monster>
    </div>
</template>

<script>
import monster from '@/components/monster'
export default {
    props:{
        zone: {type: Object, required: true},
        balance: {type: Number, required:true},
        resurection_points: {type: Number, required:true}
    },
    components:{
        monster
    },
    methods:{
        print(){
            console.log(this.zone)
        }
    }
}
</script>

<style>

</style>