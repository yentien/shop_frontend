<template>
  <div class="userPage">
    <UserMenu></UserMenu>
    <div class="userEdite">
      <form class="userForm" @submit.prevent="modifyUser">
        <label for="">帳號(電子信箱):</label>
        <input
          class="midLengthInput"
          type="text"
          disabled="disabled"
          :placeholder="user.email"
        />
        <label for="username">用戶名: </label>
        <input class="midLengthInput" type="text" v-model="user.name" />
        <label for="cellphone">電話: </label>
        <input class="midLengthInput" type="text" v-model="user.cellphone" />
        <label for="address">地址: </label>
        <input class="longLengthInput" type="text" v-model="user.address" />
        <label>性別: </label>
        <div class="genderRadios">
          <input
            type="radio"
            name="gender"
            id="male"
            value="male"
            v-model="user.gender"
          />男
          <input
            type="radio"
            name="gender"
            id="female"
            value="female"
            v-model="user.gender"
          />女
        </div>
        <div class="actions">
          <TheButton type="reset" reverse @click.prevent="refreshPage"
            >取消</TheButton
          >
          <TheButton type="submit">儲存變更</TheButton>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import UserMenu from "../components/UserMenu.vue";
import TheButton from "../components/TheButton.vue";
import { computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { router } from "../routes";

const store = useStore();

const user = computed(() => {
  const user = store.state.user.modifyUser;
  user.userId = router.currentRoute.value.params.userId;
  return user;
});

onMounted(() => {
  const userId = router.currentRoute.value.params.userId;
  store.dispatch("getModifyUser", userId);
});

async function modifyUser() {
  await store.dispatch("adminModifyUser", user.value);
  // location.reload();
  alert("已儲存變更!");
  router.push(`/admin/users`);
}

function refreshPage() {
  alert("已取消變更!");
  location.reload();
}
</script>
<style scoped>
.userPage {
  display: flex;
  flex-wrap: wrap;
}
.userForm {
  display: grid;
  grid-template-columns: max-content 1fr;
  row-gap: 32px;
  column-gap: 10px;
}

.userForm > label {
  grid-column: 1 / 2;
  justify-self: end;
  position: relative;
  top: 6px;
}

.userForm .actions {
  grid-column: 1/3;
  justify-self: end;
  display: flex;
  gap: 16px;
}

.genderRadios {
  margin-top: 7px;
}
.genderRadios input {
  margin-right: 3px;
}

.midLengthInput {
  width: 225px;
}

.longLengthInput {
  width: 600px;
}

.userEdite {
  width: 600px;
}
</style>
