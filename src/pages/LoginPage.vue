<template>
  <div class="loginPage">
    <div class="loginForm">
      <img src="../assets/logo.svg" alt="" />
      <h1>SHOP</h1>
      <form @submit.prevent>
        <input type="email" placeholder="電子信箱" v-model="email" />
        <input
          v-if="!isLogin"
          type="text"
          placeholder="用戶名"
          v-model="username"
        />
        <input type="password" placeholder="密碼" v-model="password" />
        <button
          type="submit"
          class="loginButton"
          @click="isLogin ? login() : register()"
        >
          {{ isLogin ? "登入" : "註冊" }}
        </button>
        <p @click="isLogin = !isLogin" class="info">
          {{ isLogin ? "還沒有帳號? 點擊註冊" : "已有帳號? 點擊登入" }}
        </p>
        <div v-if="!isLogin">
          <input
            type="checkbox"
            v-model="agreementChecked"
          />勾選表示同意隱私協議和使用規範
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const isLogin = ref(true);

const email = ref("");
const username = ref("");
const password = ref("");
const agreementChecked = ref(false);

const store = useStore();
const router = useRouter();

async function register() {
  if (!agreementChecked.value) {
    alert("請先閱讀並同意隱私協議和使用規範");
    return;
  }
  if (email.value === "" || password.value === "") {
    alert("帳號和密碼不能為空!");
  } else if (password.value.length < 8) {
    alert("密碼至少8碼!");
  } else {
    await store.dispatch("registerUser", {
      email: email.value,
      username: username.value,
      password: password.value,
    });
    router.replace("/");
  }
}

async function login() {
  console.log(password.value.length);
  if (email.value === "" || password.value === "") {
    alert("帳號和密碼不能為空!");
  } else {
    console.log(password.value.length);
    await store.dispatch("loginUser", {
      email: email.value,
      password: password.value,
    });
    router.replace("/");
  }
}
</script>
<style scoped>
.loginPage {
  display: grid;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  background: #f8f9fb;

  padding: 0 10vw;
}

.loginForm {
  justify-self: start;
  box-shadow: 0px 4px 48px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  background: white;
  padding: 74px 60px;

  display: grid;
  place-items: center;
  row-gap: 52px;
  width: 380px;
}

.loginForm > form {
  display: grid;
  row-gap: 24px;
  width: 100%;
  height: 100%;
}

input {
  background: #fafafa;
  border-radius: 4px;
  border: none;
}

input::placeholder {
  color: #9e9e9e;
}

.loginButton {
  background: linear-gradient(89.93deg, #00c2ff 0.06%, #0047ff 105.68%);
  padding: 12px 0;
  color: white;
  border: none;
}

.info {
  color: #1da0ff;
  text-align: center;
  cursor: pointer;
}
</style>
