import Vue from 'vue';
import App from './App.vue';
import { add } from './js/a';
import { decrement } from './js/b';
import './css/main.css';

const num1 = 100;
const num2 = 200;
console.log(add(num1, num2));
console.log(decrement(num2, num1));


Vue.config.productionTip = false;

new Vue({
  render(h) {
    return h(App);
  },
}).$mount('#app');
