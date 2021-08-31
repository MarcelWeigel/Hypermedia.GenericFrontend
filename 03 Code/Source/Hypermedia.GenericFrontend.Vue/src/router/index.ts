import Vue from 'vue';
import VueRouter, { Route, RawLocation } from 'vue-router';
import AppBase from '@/components/AppBase.vue';
import ErrorView from '@/components/ErrorView.vue';
import { commit } from 'vuex-pathify';
import SetupView from '@/views/SetupView.vue';
import HypermediaView from '@/views/HypermediaView.vue';
import SettingsView from '@/views/SettingsView.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      name: 'app-base',
      path: '',
      component: AppBase,
      children: [
        {
          name: 'setup-view',
          path: 'setup',
          component: SetupView,
          meta: {
            needsToBeManager: true,
            key: (route: Route) => `setup-view`,
          },
        },
        {
          name: 'hypermedia-view',
          path: 'hypermedia',
          component: HypermediaView,
          meta: {
            needsToBeManager: true,
            key: (route: Route) => `hypermedia-view`,
          },
        },
        {
          name: 'settings-view',
          path: 'settings',
          component: SettingsView,
          meta: {
            needsToBeManager: true,
            key: (route: Route) => `settings-view`,
          },
        },
      ],
    },
    {
      path: '/Error/:message/:path',
      alias: '/Error',
      component: AppBase,
      children: [
        {
          name: 'error',
          path: '',
          component: ErrorView,
        },
      ],
    },
    {
      // catchall:
      path: '/',
      alias: '*',
      component: AppBase,
      children: [
        {
          path: '',
          component: SetupView,
          meta: {
            needsToBeLabeler: true,
            key: (route: Route) => `setup-view`,
          },
        },
      ],
    },
  ],
});

const redirectToAppropriatePage = (to: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void) => {
  return next({
    name: 'setup-view',
    params: {},
    replace: true,
  });
};

router.beforeEach(async (to, _, next) => {
  if (to.name === 'error') {
    return next();
  }

  commit('application/SET_LOADING_PAGE', true);

  const allowedToEnter = true;

  if (to.path === '/') {
    return redirectToAppropriatePage(to, next);
  } else if (allowedToEnter) {
    return next();
  } else {
    console.warn(`You are not allowed to access '${to.path}'`);
    return next({
      name: 'error',
      params: {
        path: to.path,
        message: 'not-allowed',
      },
    });
  }
});

router.afterEach(() => commit('application/SET_LOADING_PAGE', false));

export default router;
