import Vue from 'vue';
import Router from 'vue-router';
import Home from 'views/Home';
import StoryBoard from 'views/StoryBoard';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home,
      path: '/storyboard',
      component: StoryBoard
    }
  ]
});
