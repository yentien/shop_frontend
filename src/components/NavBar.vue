<template>
  <nav class="navbar">
    <router-link to="/">
      <!-- <TheIcon icon="logo"></TheIcon> -->
      <img src="../assets/logo.svg" alt="" />
    </router-link>

    <ul class="menu-middle">
      <li><router-link to="/">首頁</router-link></li>
      <li><router-link to="/">關於我們</router-link></li>
      <li><router-link to="/">聯絡我們</router-link></li>
    </ul>

    <div class="menu-right">
      <div class="userDropDown">
        <!-- <TheIcon icon="user"></TheIcon> -->
        <img
          src="../assets/user.svg"
          width="42"
          height="42"
          style="cursor: pointer"
          alt=""
          @click="
            getJwtToken() ? (showDropdown = !showDropdown) : replaceToLogin()
          "
        />
        <div class="dropdownMenu" v-show="showDropdown">
          <ul class="userMenu">
            <li @click="showDropdown = !showDropdown">
              <router-link :to="'/user/' + user.userId">會員檔案</router-link>
            </li>
            <li
              @click="
                logout();
                showDropdown = false;
              "
            >
              登出
            </li>
          </ul>
        </div>
      </div>
      <router-link to="/cart">
        <!-- <TheIcon icon="cart"></TheIcon> -->
        <img
          src="../assets/cart.svg"
          width="42"
          height="42"
          style="none"
          alt=""
      /></router-link>
    </div>
  </nav>
</template>

<script setup>
import { computed, ref } from "vue";
import { getJwtToken } from "../apis/auth";
import { useRouter } from "vue-router";
import TheIcon from "./TheIcon.vue";
// import { store } from "../store";
import { useStore } from "vuex";
const showDropdown = ref(false);
const router = useRouter();
const store = useStore();

const user = computed(() => {
  return store.getters.getUser;
});
// console.log(user.value);

function replaceToLogin() {
  router.replace("/login");
}

async function logout() {
  await store.dispatch("logoutUser");
  router.push("/");
  alert("您已登出!");
}
</script>

<style scoped>
.navbar {
  width: 80vw;
  height: 80px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.navbar svg,
.navbar img {
  height: auto;
  width: 38px;
}
.navbar li {
  margin: 0rem 1rem;
  list-style-type: none;
}
.navbar a {
  text-decoration: none;
  color: black;
}
.menu-middle {
  display: flex;
  align-items: start;
  justify-content: center;
}

.menu-right {
  justify-self: end;
  display: flex;
  gap: 24px;
  align-items: center;
}

.userDropDown {
  position: relative;
}

.userMenu {
  position: absolute;
  width: max-content;
  padding: 24px 24px;
  list-style: none;
  background: white;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  right: 0;
  display: grid;
  row-gap: 18px;
  transform: translateY(18px);
}

.userMenu::before {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  top: -12px;
  right: 10px;
  border-bottom: 12px solid white;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
}

.userMenu a,
.userMenu li {
  text-decoration: none;
  cursor: pointer;
}
.userMenu a:visited {
  color: initial;
}
</style>
