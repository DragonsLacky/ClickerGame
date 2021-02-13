import { REGISTER_USER, AUTHENTICATED_USER, AUTHENTICATE_USER } from '@/gql'
import { apolloClient, onLogout } from '@/vue-apollo'
import router from '@/router'

const state = {
    authStatus:false,
    token: localStorage.getItem('apollo-token') || null,
    user: {}
};

const getters = {
    user: (state) => state.user,
    authStatus: (state) => state.authStatus,
    isAuth: (state) => state.token
};

const actions = {
    async loginUser({ dispatch }, userData){
        let {data: { userAuthenticate }} = await apolloClient.query({
            query: AUTHENTICATE_USER,
            variables: userData
        });
        dispatch('setPayload', userAuthenticate);
    },
    
    async registerUser( { dispatch }, userData){
        
        let { data: { userRegister } } = await apolloClient.mutate({
            mutation: REGISTER_USER,
            variables: userData 
        });
        dispatch('setPayload', userRegister)
    },
    
    async setAuthUser({ commit, dispatch }){
        try {
            let {data: { showUserProfile }} = await apolloClient.query({
                query: AUTHENTICATED_USER
            })
            commit('LOGIN_USER', {user : showUserProfile});
        } catch(err) {
            dispatch('logoutUser');
        }
    },

    logoutUser({ commit }){
        commit('LOGOUT_USER');
        onLogout(apolloClient);
    },

    async setPayload({commit}, payload) {
        commit('LOGIN_USER', payload);
        commit('SET_TOKEN', payload);
        localStorage.setItem('apollo-token', payload.token.split(' ')[1]);
        router.push('/');
    }
};

const mutations = {
    LOGIN_USER(state, payload) {
        state.user = payload.user;
        state.authStatus = true;
    },
    SET_TOKEN(state, payload) {
        state.token = payload.token
    },
    LOGOUT_USER(state) {
        state.user = {};
        state.token = null;
        state.authStatus = false;
    }
};


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}