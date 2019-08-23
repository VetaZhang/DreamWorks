'use strict';

import Vue from 'vue';
import Url from 'domurl';
import App from './App.vue';
import Main from './components/Main';
import '../public/css/main.css';

const url = new Url();

switch (url.query.page) {
  case 'main': {
    Main.el = '#app';
    const app = new Vue(Main);
  }break;
  case 'editor': {
    App.el = '#app';
    const app = new Vue(App);
  }break;
  default: {
    Main.el = '#app';
    const app = new Vue(Main);
  }
}
