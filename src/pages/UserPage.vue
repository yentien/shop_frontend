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
          :placeholder="userData.email"
        />
        <label for="username">用戶名: </label>
        <input class="midLengthInput" type="text" v-model="userData.name" />
        <label for="username">電話: </label>
        <input
          class="midLengthInput"
          type="text"
          v-model="userData.cellphone"
        />
        <label for="username">地址: </label>
        <input class="longLengthInput" type="text" v-model="userData.address" />
        <label>性別: </label>
        <div class="genderRadios">
          <input
            type="radio"
            name="gender"
            id="M"
            value="M"
            v-model="userData.gender"
          />男
          <input
            type="radio"
            name="gender"
            id="F"
            value="F"
            v-model="userData.gender"
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
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const user = computed(() => store.getters.getUser);

const userData = reactive({
  email: user.value.email,
  name: user.value.name,
  cellphone: user.value.cellphone,
  address: user.value.address,
  gender: user.value.gender,
});

async function modifyUser() {
  await store.dispatch("modifyUser", userData);
  location.reload();
  alert("已儲存變更!");
}

function refreshPage() {
  alert("已取消變更!");
  location.reload();
}

// const userName = ref("");
// const userCellphone = ref("");
// const userAddress = ref("");
// const userGender = ref("");
// const gender = ref("");
// if (userGender == "male") {
//   gender.value = "M";
// } else if (userGender == "female") {
//   gender.value = "F";
// }

// userName.value = user.value.name;
// userCellphone.value = user.value.cellphone;
// userAddress.value = user.value.Address;
// userGender.value = user.value.Gender;
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
</style>
