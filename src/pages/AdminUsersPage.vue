<template>
  <div class="adminPage">
    <UserMenu></UserMenu>
    <div class="userList">
      <ul class="titleBar">
        <li>帳號(email)</li>
        <li>姓名</li>
        <li>性別</li>
        <li>電話</li>
        <li>地址</li>
        <li>權限</li>
      </ul>
      <TheSeparateLine></TheSeparateLine>
      <div class="userList" v-for="user in userList" :key="user.userId">
        <ul class="userItem" @click="adminModifyUserPage(user.userId)">
          <li style="white-space: pre-wrap">
            {{ user.email.replace("@", "\n@") }}
          </li>
          <li>{{ user.name }}</li>
          <li>{{ user.gender }}</li>
          <li>{{ user.cellphone }}</li>
          <li style="font-size: 14px">
            {{ user.address ? user.address.substring(0, 21) : {} }}
          </li>
          <li>{{ user.roleName }}</li>
        </ul>
        <TheSeparateLine></TheSeparateLine>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import TheSeparateLine from "../components/TheSeparateLine.vue";
import UserMenu from "../components/UserMenu.vue";
import { router } from "../routes";

const store = useStore();

const userList = computed(() => {
  return store.state.user.userList;
});

onMounted(() => {
  store.dispatch("getUserList");
});

async function adminModifyUserPage(userId) {
  router.push(`/admin/users/${userId}`, userId);
}
</script>
<style scoped>
li {
  list-style-type: none;
}
.adminPage {
  display: flex;
  flex-wrap: wrap;
}
.userList {
  /* width: 600px; */
}
.titleBar,
.userItem {
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  padding: 3px 0px;
}
.titleBar > li,
.userItem > li {
  width: 100px;
  text-align: center;
  overflow-wrap: break-word;
  display: flex;
  justify-content: center;
  align-items: center;
}

.userItem:hover {
  background-color: #9d8d6f5c;
  /* color: white; */
}
</style>
