import authentication from '../views/Authentication/index.vue';

export default {
    path: '/authentication',
    name: 'Authentication',
    component: authentication,
    meta: {
        requiresGuest: true
    },
    redirect: '/authentication/login',
    children:[
        {
            path: 'login',
            name: 'Login',
            component: () => import('../views/Authentication/Login.vue')
        },
        {
            path: 'register',
            name: 'Register',
            component: () => import('../views/Authentication/Register.vue')
        }
    ]
}

