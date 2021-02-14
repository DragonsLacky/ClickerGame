<template>
  <div class="register">
      <form @submit.prevent="register" class="flex flex-col items-center p-8">
        <div class="p-4 xl:p-6 w-1/2 flex flex-col items-center lg:w-1/4 border-2 text-sm md:text-lg border-indigo-50 rounded-xl bg-gray-50 shadow-sm">
            <t-input-group class="mb-4 w-full" label="Username">
                <t-input v-model="user.username" @input.native="updateValue" class="w-full lg:py-2" placeholder='Username' type='text'  name="username" />
            </t-input-group>
            <t-input-group class="mb-4 w-full" label="Password" :feedback="error">
                <t-input :variant="variant" v-model="user.password" class="w-full lg:py-2" placeholder="Password" type="password" />
            </t-input-group>
            <t-input-group class="mb-4 w-full" label="E-mail">
                <t-input v-model="user.email" class="w-full lg:py-2" placeholder="E-mail" type='text' />
            </t-input-group>
            <t-input-group class="mb-4 w-full" label="First name">
                <t-input v-model="user.firstName" @input.native="updateValue" class="w-full lg:py-2" placeholder="First name" type='text' name="firstName"/>
            </t-input-group>
            <t-input-group class="mb-4 w-full" label="Last name" >
                <t-input v-model="user.lastName" @input.native="updateValue" class="w-full lg:py-2" placeholder="Last name" type='text' name="lastName" />
            </t-input-group>
            <t-button :disabled="disable == true" class="rounded-xl text-sm lg:text-lg w-1/2 font-bold lg:font-normal p-1 text-white">Register</t-button>
            <div class="flex flex-row mt-2">
                <span class="inline text-sm mr-2">Already have an account?</span>
                <router-link class="inline text-sm text-indigo-600 hover:text-indigo-400" to='/authentication/login'>Login here</router-link>
            </div>
        </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { CREATE_HERO } from '@/gql'

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
            valitadionRules:{
                username: {
                    maxLength: 20,
                    required: true
                },
                firstName: {
                    maxLength: 20,
                    required: true
                },
                lastName: {
                    maxLength: 30,
                    required: true
                },
                email: {
                    maxLength : 40,
                    required: true
                }
            },
            user: {
                username: '',
                password: '',
                firstName: '',
                lastName: '',
                email: ''
            },
            error:'',
            variant:'',
            disable: true,
            serverError:''
        }
    },
    watch:{
        password: function(newPassword) {
            if(!this.regex.length.test(newPassword)){
                this.error='Password must be at least 8 characters long';
                this.variant = 'danger';
                this.disable = true;
            }else if(!this.regex.lowercase.test(newPassword)){
                this.error='Password must contain at least 1 lowercase letter ';
                this.variant = 'danger';
                this.disable = true;
            } else if(!this.regex.uppercase.test(newPassword)){
                this.error='Password must contain at least 1 uppercase letter ';
                this.variant = 'danger';
                this.disable = true;
            } else if(!this.regex.number.test(newPassword)){
                this.error='Password must contain at least 1 number letter ';
                this.variant = 'danger';
                this.disable = true;

            }else if (!this.regex.special.test(newPassword)){
                this.error='Password must contain at least 1 special character (@, $, !, %, *, ?, &) ';
                this.variant = 'danger';
                this.disable = true;
            }
            else{
                this.error='';
                this.variant = 'success';
                this.disable = false;
            }
        }
    },
    computed: {
        password() {
            return this.user.password;
        },
        username() {
            return this.user.username;
        }
    },
    methods: {
        ...mapActions({
            registerUser: 'Authentication/registerUser'
        }),
        async register(){
            try{
                await this.registerUser(this.user);
                await this.$apollo.mutate({
                    mutation: CREATE_HERO
                });
            } catch(err){
                console.log(err);
            }
        },
        updateValue(event) {
            const value = event.target.value;
            const length = this.valitadionRules[event.target.name].maxLength-1;
            if (String(value).length <= length) {
                this.user[event.target.name] = value
            }else{
                this.user[event.target.name] = value.slice(0, length);
            }
            this.$forceUpdate()
        }
    }
}
</script>

<style>

</style>

