<template>
  <form action="" class="orderInfoPage" @submit.prevent="confirm">
    <div class="customerInfo border subForm">
      <p>顧客資料</p>
      <TheSeparateLine></TheSeparateLine>
      <label for="userName">顧客名稱</label>
      <input type="text" v-model="orderData.senderName" />
      <label for="userEmail">電子信箱</label>
      <input type="email" v-model="orderData.senderEmail" />
      <label for="userPhone">電話號碼</label>
      <input type="text" v-model="orderData.senderPhone" />
    </div>
    <div class="deliverInfo border subForm">
      <p>送貨資料</p>
      <TheSeparateLine></TheSeparateLine>
      <label for="toName">收件人名稱</label>
      <input type="text" v-model="orderData.recipientName" />
      <label for="toPhone">電話號碼</label>
      <input type="text" v-model="orderData.recipientPhone" />
      <label for="toAddress">地址</label>
      <input type="text" v-model="orderData.recipientAddress" size="35" />
      <br />
      <input type="checkbox" v-model="sameCheck" />與顧客資料相同
    </div>
    <div class="OrderRemark border subForm">
      <p>訂單備註</p>
      <TheSeparateLine></TheSeparateLine>
      <label for="ToName"></label>
      <textarea
        maxlength="56"
        rows="5"
        cols="40"
        style="resize: none"
        v-model="orderData.remark"
      ></textarea>
    </div>
    <div class="theButton subForm">
      <TheButton type="submit">確認送出</TheButton>
    </div>
  </form>
</template>
<script setup>
import { computed, reactive, ref, watch } from "vue";
import TheSeparateLine from "../components/TheSeparateLine.vue";
import TheButton from "../components/TheButton.vue";
import { useStore } from "vuex";
import { router } from "../routes";

const store = useStore();

const user = computed(() => store.getters.getUser);

const productList = computed(() => {
  return store.getters.getCartProductList;
});
const orderData = reactive({
  senderName: user.value.name,
  senderEmail: user.value.email,
  senderPhone: user.value.cellphone,
  recipientName: "",
  recipientPhone: "",
  recipientAddress: "",
  remark: "",
  shipMethod: "postOffice",
  shipFee: 100,
});

const sameCheck = ref(false);

watch(sameCheck, (newValue, oldValue) => {
  if (newValue) {
    orderData.recipientName = orderData.senderName;
    orderData.recipientPhone = orderData.senderPhone;
    orderData.recipientAddress = user.value.address;
  } else {
    orderData.recipientName = "";
    orderData.recipientPhone = "";
    orderData.recipientAddress = "";
  }
});

function confirm() {
  store.dispatch("createOrder", orderData);
  alert("訂單已送出!");
  router.push(`/user/${user.userId}/orders`);
}
</script>
<style scoped>
.orderInfoPage {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  width: 850px;
}
label {
  display: block;
}
.border {
  border: 1px solid rgb(179, 178, 178);
}
label {
  margin: 5px 0px;
}

.subForm {
  width: 400px;
  margin: 10px;
  padding: 10px;
}

.titleText {
  font-size: 30px;
}

.theButton {
  display: flex;
  justify-content: end;
  align-items: end;
}
</style>
