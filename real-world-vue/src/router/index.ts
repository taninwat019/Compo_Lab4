import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import EventListView2 from '../views/EventListView2.vue'
import AboutView from '../views/AboutView.vue'
import StudentListView from '../views/StudentListView.vue'
import EventDetailView from "../views/event/EventDetailView.vue"
import EventEditView from "../views/event/EventEditView.vue"
import EventRegisterView from "../views/event/EventRegisterView.vue"
import EventLayoutView from '../views/event/EventLayoutView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import NetworkErrorView from '../views/NetworkErrorView.vue'
import NProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props : (route) => ({page: parseInt(route.query?.page as string || '1'),limit: parseInt(route.query?.limit as string || '2')})
    },
    {
      path: '/student',
      name: 'student-list',
      component: StudentListView
    },
    {
      path: '/event2',
      name: 'event-list2',
      component: EventListView2
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView
    },

    {
      path: '/event/:id',
      name: 'event-layout',
      component: EventLayoutView,
      // props: true,
      beforeEnter: (to) => {
        const id: number = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return EventService.getEventById(id)
        .then((response) => {
          eventStore.setEvent(response.data)
        }).catch(() => {
          if (error.response && error.response.status === 404) {
           return {
            name: '404-resource',
            params: { resource: 'event'}
           }
          }else{
            return { name: 'network-error'}
          }
        })
      },

      children: [
        { 
          path: '',
          name: 'event-detail',
          component: EventDetailView,
          props: true
      },
        {
          path: 'edit',
          name: 'event-edit',
          // props: true,
          component: EventEditView
      },
        {
          path: 'register',
          name: 'event-register',
          // props: true,
          component: EventRegisterView
        }
      ]
    },
    {
      path:'/404/:resource',
      name:'404-resource',
      component: NotFoundView,
      props:true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path:'/network-error',
      name: 'network-error',
      component: NetworkErrorView
    }
  ],
  scrollBehavior(to , from, savedPosition){
    if(savedPosition){
      return savedPosition
    }else{
      return {top: 0}
    }
  }
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
