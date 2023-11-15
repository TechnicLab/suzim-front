import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrdersView from "../views/OrdersView.vue";
import OrderView from "../views/OrderView.vue";
import TrackingView from "../views/TrackingView.vue";
import CustomersView from "../views/CustomersView.vue";
import CustomerView from "../views/CustomerView.vue";

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/orders/',
            name: 'orders',
            component: OrdersView
        },
        {
            path: '/order/:orderId?/',
            name: 'single-order',
            component: OrderView
        },
        {
            path: '/tracking/:orderId?/',
            name: 'tracking',
            component: TrackingView
        },
        {
            path: '/customers/',
            name: 'customers',
            component: CustomersView
        },
        {
            path: '/customer/:customerId/',
            name: 'customer',
            component: CustomerView
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
