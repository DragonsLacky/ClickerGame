<template>
  <div class="hero">
      <t-modal v-model="heroInfoshow" class="text-black" header="Hero info">
            <div class="flex flex-wrap">
                <div class="w-1/2 flex flex-col">
                    <div class="flex flex-row justify-between px-3">
                        <span>Level:</span><span>{{ hero.level }}</span>
                    </div>
                    <div class="flex flex-row justify-between px-3">
                        <span>Gold: </span><span>{{hero.balance}}</span>
                    </div>
                </div>
                <div class="w-1/2 flex flex-col">
                    <div class="flex flex-row justify-between px-3">
                        <span> Critical Chance:  </span> <span> {{hero.critical_chance}}% </span>
                    </div>
                    <div class="flex flex-row justify-between px-3">
                        <span> Critical multilpier:  </span> <span> {{hero.critical_damage}}x </span>
                    </div>
                </div>
            </div>
        </t-modal>
        <div class="flex flex-row w-full m-0 text-sm font-bold md:font-normal lg:text-base">
            <div class="flex flex-wrap p-4 w-full select-none">
                <div class="flex flex-row my-3 p-1 md:p-2 w-full md:w-1/2 justify-between"> <span>Hero Damage:</span> <pre>{{ hero.damage }}</pre> </div>
                <div class="flex flex-row my-3 p-1 md:p-2 w-full md:w-1/2 justify-between"> <span>Companion Damage:</span> <pre>{{ companionDamage }}</pre> </div>
                <div class="flex flex-row my-3 p-1 md:p-2 w-full md:w-1/2 justify-between"> <span>Hero Level:</span> <pre>{{ hero.level }}</pre> </div>
                <div class="flex flex-row my-3 p-1 md:p-2 w-full md:w-1/2 justify-between"> <span>Level up cost:</span> <pre>{{ hero.level_up }}</pre> </div>
            </div>
            <div class="flex flex-col justify-around w-1/3 p-4">
                <t-button variant="tabmenu" class="p-2">Level up</t-button>
                <t-button variant="tabmenu" @click="heroInfo" class="p-2">Hero Info</t-button>
            </div>
        </div>
        
  </div>
</template>

<script>
export default {
    props:{
        hero:{
            type: Object,
            required: true
        }
    },
    data: () => {
        return{
            heroInfoshow: false
        }
    },
    computed: {
        companionDamage() {
            if(this.hero.companions.length > 1){
                return this.hero.companions.map(HeroCompanion => HeroCompanion.companion.dps * HeroCompanion.level).reduce((a,b) => a+b) * this.hero.companion_damage;
            }else{
                let dmg = this.hero.companions.map(HeroCompanion => HeroCompanion.companion.dps * HeroCompanion.level)[0];
                return  dmg ? dmg*this.hero.companion_damage : 0;
            }
        }
    },
    methods: {
        heroInfo() {
            this.heroInfoshow = !this.heroInfoshow;
        }  
    },
}
</script>

<style>

</style>