import DashboardView from '@/views/Dashboard/index.vue';
import store from '../store';

export default {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: {
        requiresAuthentication: true
    },
    redirect: '/data/profile',
    children:[
        {
            path: 'posts',
            name: 'Posts',
            component: () => import('../views/Dashboard/Posts.vue')
        },
        {
            path: 'profile',
            name: 'Profile',
            component: () => import('../views/Dashboard/Profile')
        },
        {
            path: 'logout',
            name: 'Logout',
            beforeEnter: (to, from, next) => {
                store.dispatch('Authentication/logoutUser');
                next('/authentication/login');
            }
        }
    ]
}