import Vue from 'vue'
import App from './App.vue'

//reset
import '@/reset.css'

//element
import { Select, Button, Menu, MenuItem, Submenu, Drawer,Col,Row } from 'element-ui';
//ele theme
import '@/style/theme/index.css'
//注册element
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Menu.name, Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Submenu.name, Submenu);
Vue.component(Drawer.name, Drawer);
Vue.component(Col.name, Col);
Vue.component(Row.name, Row);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
