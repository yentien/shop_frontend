import HomePage from "./pages/HomePage.vue";
import ProductPage from "./pages/ProductPage.vue";
import UserPage from "./pages/UserPage.vue"
import CartPage from "./pages/CartPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import CategoryPage from "./pages/CategoryPage.vue";
import Orders from "./pages/Orders.vue"
import UserOrders from "./pages/UserOrdersPage.vue"
import AdminPage from "./pages/AdminPage.vue"
import OrderInfoPage from "./pages/OrderInfoPage.vue"
import { createRouter, createWebHistory } from "vue-router";
import { getJwtToken } from "./apis/auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/user/:userId",
    name: "user",
    component: UserPage,
  },
  {
    path: "/user/:userId/orders",
    name: "userOrders",
    component: UserOrders,
  },
  {
    path: "/user/:userId/cart",
    name: "cart",
    component: CartPage,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminPage,
  },
  {
    path: "/products/:productId",
    name: "products",
    component: ProductPage,
  },
  {
    path: "/category",
    name: "category",
    component: CategoryPage,
  },
  {
    path: "/orders",
    name: "orders",
    component: Orders,
  },
  {
    path: "/user/:userId/ordersInfo",
    name: "userOrderInfo",
    component: OrderInfoPage,
  },
]

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
});

// 除了首頁，都要求跳轉登入
router.beforeEach(to => {
  if ((to.name != "login" && !getJwtToken()) && (to.name != "home")) {
    return { name: "login" };
  }
  if (to.name == "login" && getJwtToken()) {
    return { name: "home" };
  }
});

export { router };