<template>
  <div class="gear">
      <div class="flex flex-row w-full m-0 text-sm font-bold md:font-normal lg:text-base">
            <div class="flex flex-wrap p-4 w-full select-none">
                <div v-for="piece in gear" class="flex flex-row w-full md:w-1/2 border-gray-900 border-2 p-2 bg-gray-800 rounded-xl" :key="piece.id">
                    <img :src="piece.image" class="w-16 h-16 rounded-full bg-gray-900 border-2 border-black" alt="geariimage">
                    <div class="flex flex-col w-full text-center text-sm md:text-lg font-bold justify-around">
                        <span >{{ piece.name }}</span>
                        <span :class="raritycolor[piece.rarity]" class="text-">{{ piece.rarity }}</span>
                    </div>
                    <t-button variant="tabmenu" @click="equip_unequip(piece)" class="rounded-full">{{ btnstate[piece.equipped] }}</t-button>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
import {GEAR_UNEQUIP, GEAR_EQUIP} from '@/gql'
export default {
    props: {
        gear: {type: Array, required: true},
        hero: {type: Object, required: true}
    },
    data: () => {
        return{
            raritycolor: {
                    Legendary: 'text-purple-500',
                    Special: 'text-red-500',
                    Rare: 'text-yellow-300',
                    Uncommon: 'text-blue-500',
                    Common: 'text=gray-400'
            },
            btnstate:{
                'true': 'Unequip',
                'false': 'Equip'
            },
            gearstate: {
                'Equip': GEAR_EQUIP,
                'Unequip': GEAR_UNEQUIP
            }
        }
    },
    methods: {
        async equip_unequip(piece){
            let result = await this.$apollo.mutate({
                mutation: this.gearstate[this.btnstate[piece.equipped]],
                variables:{id: piece.id}
            })
            result = result.data;
            result = piece.equipped? result.unEquipGear : result.equipGear;
            result = result[0].owner;
            console.log(result);
            this.hero['boss_gold'] = result['boss_gold'];
            this.hero['companion_damage'] = result['companion_damage'];
            this.hero['critical_chance'] = result['critical_chance'];
            this.hero['critical_damage'] = result['critical_damage'];
            this.hero['luck'] = result['luck'];
            this.hero['hero_damage'] = result['hero_damage'];

        }
    },
}
</script>

<style>

</style>