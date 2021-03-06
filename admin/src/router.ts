import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import Layout from './views/layout/Layout';
import ContentRouter from '@/components/ContentRouter';

Vue.use(Router);

export const globalRouter: RouteConfig[] = [
  {
    name: 'Login',
    path: '/login',
    meta: {
      title: '登录',
    },
    component: () => import('@/views/Login'),
  },
];

export const homeRouter: RouteConfig[] = [
  {
    name: 'Home',
    path: 'home',
    meta: {
      title: '仪表盘',
      icon: 'home',
    },
    component: () => import('@/views/Home'),
  },
  {
    name: 'Articles',
    path: 'articles',
    meta: {
      title: '文章管理',
      icon: 'create',
    },
    component: ContentRouter,
    children: [
      {
        name: 'ArticleList',
        path: 'articleList',
        meta: {
          title: '所有文章',
          icon: 'toc',
        },
        component: () => import('@/views/article/ArticleList'),
      },
      {
        name: 'ArticleEdit',
        path: 'articleEdit',
        props: route => route.query,
        meta: {
          title: '发布文章',
          icon: 'create',
          cache: false,
        },
        component: () => import('@/views/article/ArticleEdit'),
      },
      {
        name: 'Tag',
        path: 'tag',
        meta: {
          title: '标签管理',
          icon: 'loyalty',
        },
        component: () => import('@/views/article/Tag'),
      },
      {
        name: 'Category',
        path: 'category',
        meta: {
          title: '分类管理',
          icon: 'folder',
        },
        component: () => import('@/views/article/Category'),
      },
    ],
  },
];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...globalRouter,
    {
      path: '/',
      component: Layout,
      children: [...homeRouter],
    },
  ],
});
