import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import AssignDutiesView from '../views/AssignDutiesView.vue'
import SettingsView from '../views/SettingsView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: { title: 'Excel Maker - Login' }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true,  title: 'Excel Maker - Dashboard' }
  },
  {
    path: '/assign-duties',
    name: 'assign-duties',
    component: AssignDutiesView,
    meta: { requiresAuth: true, title: 'Excel Maker - Assign Duties' }
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
    meta: { requiresAuth: true, title: 'Excel Maker - Settings' }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken');
  const title = to.meta.title || 'Excel Maker';
  if (to.meta.requiresAuth && !token) {
    document.title = title;
    next('/');
  } else if (to.path === '/' && token){
    document.title = title;
    next('/dashboard');
  } else {
    document.title = title;
    next();
  }
});

export default router
