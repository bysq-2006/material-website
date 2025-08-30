import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../content/home/index.vue')
  },
  {
    path: '/contribution',
    name: 'Contribution',
    component: () => import('../content/contribution/index.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../content/contact.vue')
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('../content/terms.vue')
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('../content/privacy.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../content/admin/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;