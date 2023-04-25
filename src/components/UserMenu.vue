<template>
  <div class="userMenu">
    <ul>
      <li>
        <router-link
          :to="'/user/' + user.userId"
          :class="{ currentRoute: $route.name == 'user' }"
          >帳號詳細資料</router-link
        >
      </li>
      <li>
        <router-link
          :to="'/user/' + user.userId + '/orders'"
          :class="{ currentRoute: $route.name == 'userOrders' }"
          >訂單紀錄</router-link
        >
      </li>
      <!-- <li>
        <router-link
          to="/orders"
          :class="{ currentRoute: $route.name == 'orders' }"
          >訂單管理</router-link
        >
      </li>
      <li>
        <router-link
          to="/users"
          :class="{ currentRoute: $route.name == 'users' }"
          >帳號管理</router-link
        >
      </li>
      <li>
        <router-link
          to="/products"
          :class="{ currentRoute: $route.name == 'products' }"
          >商品管理</router-link
        >
      </li> -->
      <!-- <li @click="logout"><a>登出</a></li> -->
    </ul>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const user = computed(() => {
  return store.getters.getUser;
});
</script>
<style scoped>
ul > li > .currentRoute {
  color: white;
  background: #9d8d6f;
}
.userMenu {
  margin-right: 15px;
  /* width: 16%;
  min-width: 140px; */
}
.userMenu li {
  list-style-type: none;
  cursor: pointer;
  font-size: 18px;
  border-radius: 1px;
}

.userMenu a {
  display: block;
  color: black;
  text-decoration: none;
  padding: 10px 15px;
}

.userMenu li:hover,
.userMenu a:hover {
  background-color: #9d8d6f;
  color: aliceblue;
}
</style>
