
export default [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/game/main.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import( '@/views/About.vue')
      }
]