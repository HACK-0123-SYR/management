import Vue from 'vue'
import App from './App.vue'
import router from './router/login'
import store from './store'

//reset
import '@/reset.css'

//element
import {
  Select,
  Button,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Drawer,
  Col,
  Row,
  Avatar,
  Table,
  TableColumn,
  TabPane,
  Tabs,
} from 'element-ui';
//ele theme
import '@/style/theme/index.css'
//注册element
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Menu.name, Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(MenuItemGroup.name, MenuItemGroup);
Vue.component(Submenu.name, Submenu);
Vue.component(Drawer.name, Drawer);
Vue.component(Col.name, Col);
Vue.component(Row.name, Row);
Vue.component(Avatar.name, Avatar);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(TabPane.name, TabPane);
Vue.component(Tabs.name, Tabs);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
