import { createRouter, createWebHistory } from 'vue-router'

import DayView from '../views/DayView.vue'
import BestView from '../views/BestView.vue'
import UserView from "@/views/UserView.vue";
import UserViewSearch from "@/views/UserViewSearch.vue";
import GlobalStatsView from "@/views/GlobalStatsView.vue";
import CalendarView from "@/components/CalendarView.vue";
import YearView from "@/components/YearView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BestView
    },

    {
      path: '/user/:user',
      props: true,
      name: 'user',
      component: UserView
    },
    {
      path: '/day/:day',
      name: 'day',
      props: true,
      component: DayView
    },
    {
      path: '/best',
      name: 'best',
      component: BestView
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView
    },
    {
      path: '/year/:year',
      props: true,
      name: 'year',
      component: YearView
    },
    {
      path: '/stats',
      name: 'stats',
      component: GlobalStatsView
    },
    {
      path: '/user',
      name: 'usersearch',
      component: UserViewSearch
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
