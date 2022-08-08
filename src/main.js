import Vue from "vue";
import App from "./App.vue";
import router from "./router/login";
import store from "./store";

//reset
import "@/reset.css";

//阿里云图标
// import '@/iconfont.css'

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
  Dialog,
  Form,
  FormItem,
  Input,
  Option,
} from "element-ui";
//ele theme
import "@/style/theme/index.css";
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

Vue.component(Dialog.name, Dialog);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Select.name, Select);
Vue.component(Input.name, Input);
Vue.component(Option.name, Option);

//echarts
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, RadarChart, LineChart, PieChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  ToolboxComponent,
} from "echarts/components";
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";
//引入主题
import theme from "@/theme.json";

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  ToolboxComponent,

  BarChart,
  RadarChart,
  LineChart,
  PieChart,

  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);
echarts.registerTheme("theme", theme);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$echarts = echarts;
  },
  render: (h) => h(App),
}).$mount("#app");
