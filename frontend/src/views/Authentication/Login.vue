<template>
  <div class="login">
    <form @submit.prevent="login" class="flex flex-col items-center p-8">
        <div class="p-6 w-1/2 flex flex-col items-center lg:w-1/4 border-2 text-sm md:text-lg border-indigo-50 rounded-xl bg-gray-50 shadow-sm">
            <t-input-group class="mb-4 w-full select-none" label="Username">
                <t-input class="w-full lg:py-2 select-text" v-model="user.username"  placeholder='Username'  name="username" />
            </t-input-group>
            <t-input-group class="mb-4 w-full select-none" label="Password">
                <t-input class="w-full lg:py-2 select-text" v-model="user.password" placeholder="Password" type="password" />
            </t-input-group>
            <t-button class="rounded-xl text-sm lg:text-lg w-1/2 text-bold p-1 text-white">Login</t-button>
            <div class="flex flex-row mt-2">
                <span class="inline text-sm mr-2">Dont have an account yet?</span>
                <router-link class="inline text-sm text-indigo-600 hover:text-indigo-400" to='/authentication/register'>Register here</router-link>
            </div>
            <t-alert class="w-full text-sm" :show="error !== ''" v-on:hidden="hide">
                {{ error }}
            </t-alert>
        </div>
        
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'


export default {
    data : () => {
        return {
            regex:{
                length : new RegExp('[A-Za-z\\d@$!%*?&]{8,}'),
                lowercase : new RegExp('(?=.*[a-z])'),
                uppercase : new RegExp('(?=.*[A-Z])'),
                number : new RegExp('(?=.*\\d)'),
                special : new RegExp('(?=.*[@$!%*?&])'),
            },
            user: {
                username: '',
                password: ''
            },
            error:'',
        }
    },
    methods: {
        ...mapActions({
            loginUser: 'Authentication/loginUser'
        }),
        async login() {
            try{
                await this.loginUser(this.user);
            } catch(err) {
                this.error = err.message.split(': ')[1];
            }
        },
        hide(){
            this.error = '';
        }
    }
}
</script>

<style>

</style>