<template>
  <div class="companions">
      <div class="flex flex-row w-full m-0 text-sm font-bold md:font-normal lg:text-base">
            <div class="flex flex-wrap p-4 w-full select-none">
                <div v-for="companion in companions" class="flex flex-row w-full lg:w-1/2 border-gray-900 border-2 p-2 bg-gray-800 rounded-xl" :key="companion.id">
                    <img :src="companion.image" class="w-16 h-16 rounded-full bg-gray-900 border-2 border-black" alt="geariimage">
                    <div class="flex flex-wrap w-full text-center text-sm md:text-lg font-bold justify-around">
                        <span class="w-1/2">{{ companion.name }}</span>
                        <span class="w-1/2"> Level: {{ companion.level ? companion.level : 0  }} </span>
                        <span class="w-1/2">Damage: {{ companion.dps }}</span>
                        <span class="w-1/2" >Cost: {{ companion.cost }}</span>
                    </div>
                    <t-button variant="tabmenu" class="rounded-full w-32">{{ companion.level ? 'Level up' : 'Buy'}}</t-button>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        allcompanions: {type: Array, required: true},
        herocompanions:{type: Object, required: true},
    },
    data: () => {
        return{
            once: true
        }
    },
    computed:{
        companions() {    
            if(this.herocompanions.companions.length !== 0){
                let graycomp = this.allcompanions.filter(doc => this.herocompanions.companions.some(doc2 => doc._id.toString() === doc2.companion._id.toString()))
                let companions = [...this.herocompanions.companions];
                companions.push(graycomp);
                return companions;
            }else{
                return this.allcompanions;
            }
        }
    },
}
</script>

<style>

</style>