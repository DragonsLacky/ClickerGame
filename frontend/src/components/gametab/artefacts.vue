<template>
  <div class="artefacts">
      <div class="flex flex-row w-full m-0 text-xm font-bold md:font-normal lg:text-md">
            <div class="flex flex-wrap p-4 w-full select-none">
                <div v-for="artefact in artefacts" class="flex flex-row w-full lg:w-1/2 border-gray-900 border-2 p-2 mb-1 lg:m-0 bg-gray-800 rounded-xl" :key="artefact.id">
                    <img :src="artefact.artefact.image" class="w-16 h-16 rounded-full bg-gray-900 border-2 border-black" alt="geariimage">
                    <div class="flex flex-wrap w-full text-center text-sm md:text-lg font-bold justify-around">
                        <span class="w-1/2">{{ artefact.artefact.name }}</span>
                        <span class="w-1/2"> Level: {{ artefact.level }} </span>
                        <span class="w-1/2" :class="raritycolor[artefact.artefact.rarity]">{{ artefact.artefact.rarity }}</span>
                        <span class="w-1/2">{{ artefact.artefact.stat.replace('_',' ') + ': ' + (artefact.artefact.multilpier * artefact.level).toString()+'x' }}</span>
                    </div>
                    <t-button variant="tabmenu" class="text-xs lg:text-md text-bold rounded-full w-32">Level up {{artefact.artefact.cost * artefact.level}}</t-button>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        artefacts: {type: Array, required: true}
    },
    data: () => {
        return {
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