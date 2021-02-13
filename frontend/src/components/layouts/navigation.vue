<template>
    <div id="nav" class=" py-6 bg-indigo-300 h-10 flex flex-row items-center justify-around md:justify-center text-lg overflow-hidden w-full select-none border-b-2 border-indigo-200 shadow-lg">
        <div class="flex flex-row items-start justify-start px-3">
            <span>LOGO</span> 
        </div>
        <div class="flex flex-row md:rounded-full rounded-l-full w-full md:w-auto bg-indigo-100 text-base font-bold">
            <div class="flex flex-row md:p-9 w-full p-4">
                <router-link to="/" class="md:p-2 px-1 py-2 mx-1 hover:bg-indigo-200 border-2 border-indigo-800 rounded-xl md:w-32 w-full text-center focus:bg-indigo-400">Home</router-link> 
                <router-link to="/about" class="md:p-2 px-1 py-2 mx-1 hover:bg-indigo-200 border-2 border-indigo-800 rounded-xl md:w-32 w-full text-center focus:bg-indigo-400">About</router-link>
                <router-link v-if="!isAuth" to="/authentication/login" class="md:p-2 px-1 py-2 mx-1 hover:bg-indigo-200 border-2 border-indigo-800 rounded-xl md:w-32 w-full text-center focus:bg-indigo-400">log in</router-link> 
                <router-link v-if="!isAuth" to="/authentication/register" class="md:p-2 px-1 py-2 mx-1 hover:bg-indigo-200 border-2 border-indigo-800 rounded-xl md:w-32 w-full text-center focus:bg-indigo-400">register</router-link> 
                <router-link v-if="isAuth" to="/dashboard/logout" class="md:p-2 px-1 py-2 mx-1 hover:bg-indigo-200 border-2 border-indigo-800 rounded-xl md:w-32 w-full text-center focus:bg-indigo-400">Log out</router-link> 
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed : {
        ...mapGetters({
            isAuth: 'Authentication/authStatus'
        })
    }
}
</script>

<style>

</style>