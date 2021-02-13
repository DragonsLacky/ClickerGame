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
                    <t-button variant="tabmenu" class="rounded-full">{{ piece.equipped ? 'Equip' : 'Unequip' }}</t-button>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        gear: {type: Array, required: true}
    },
    data: () => {
        return{
            raritycolor: {
                    Legendary: 'text-purple-500',
                    Special: 'text-red-500',
                    Rare: 'text-yellow-300',
                    Uncommon: 'text-blue-500',
                    Common: 'text=gray-400'
            }
        }
    }
}
</script>

<style>

</style>