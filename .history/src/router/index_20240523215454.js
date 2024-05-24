import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
             
              
                
               
               
                
              
                
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                },
                {
                    path: '/pages/operation',
                    name: 'crud',
                    component: () => import('@/views/pages/operation.vue')
                },
                {
                    path: '/uikit/charts',
                    name: 'charts',
                    component: () => import('@/views/uikit/Chart.vue')
                },
                {
                    path: '/uikit/Deploymentmetrix',
                    name: 'Deploymentmetrix',
                    component: () => import('@/views/uikit/Deploymentmetrix.vue')
                },
                {
                    path: '/uikit/apphealth',
                    name: 'apphealth',
                    component: () => import('@/views/uikit/Apphealth.vue')
                },
                {
                    path: '/uikit/apphealth',
                    name: 'apphealth',
                    component: () => import('@/views/uikit/Apphealth.vue')
                },
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        },
        {
            path: '/uikit/deploymentmetrix',
            name: 'deploymentmetrix',
            component: () => import('@/views/uikit/DeploymentMetrix.vue')
        },
       
    ]
});

export default router;
