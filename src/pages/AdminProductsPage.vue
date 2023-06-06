<template>
  <div class="userOrdersPage">
    <UserMenu></UserMenu>
    <div class="userOrders">
      <ul class="titleBar">
        <li>
          <TheButton class="theButton" @click="addProduct"
            ><p style="width: 100px">新增商品</p></TheButton
          >
        </li>
      </ul>
      <ul class="titleBar">
        <li>圖片</li>
        <li>名稱</li>
        <li>價錢</li>
        <li>庫存</li>
        <li>類別</li>
        <li>描述</li>
        <li></li>
      </ul>
      <TheSeparateLine></TheSeparateLine>
      <div class="productList" v-for="product in productList" :key="product.id">
        <ul class="productItem">
          <li @click="modifyProduct(product.productId)">
            <img
              :src="product.imageUrl"
              alt=""
              style="background: #eee; width: 80px; height: 50px"
            />
          </li>
          <li @click="modifyProduct(product.productId)">
            {{ product.productName }}
          </li>
          <li @click="modifyProduct(product.productId)">{{ product.price }}</li>
          <li @click="modifyProduct(product.productId)">{{ product.stock }}</li>
          <li @click="modifyProduct(product.productId)">
            {{ product.category }}
          </li>
          <li @click="modifyProduct(product.productId)">
            {{ product.description ? product.description.substring(0, 8) : "" }}
          </li>
          <li>
            <img
              src="../assets/trashCan.svg"
              alt=""
              style="width: 20px"
              @click="deleteProudct(product.productId)"
            />
          </li>
        </ul>
        <TheSeparateLine></TheSeparateLine>
      </div>
    </div>
  </div>
</template>
<script setup>
import UserMenu from "../components/UserMenu.vue";
import TheSeparateLine from "../components/TheSeparateLine.vue";
import TheButton from "../components/TheButton.vue";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { router } from "../routes";

const store = useStore();
const productList = computed(() => store.state.product.productList);

onMounted(() => {
  store.dispatch("getProducts");
});

function addProduct() {
  router.push(`/admin/product/add`);
}

function modifyProduct(productId) {
  router.push({ name: "adminProductModify", params: { productId } });
}

function deleteProudct(productId) {
  var isOptionSelected = confirm("確定刪除?");
  if (isOptionSelected) {
    store.dispatch("deleteProduct", productId);
    store.dispatch("getProducts");
    location.reload();
  }
}
</script>
<style scoped>
.theButton {
  margin-bottom: 10px;
}
.productItem,
.titleBar {
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.productItem > li,
.titleBar > li {
  width: 100px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
img {
  width: 75%;
}
.productItem > li {
  height: 50px;
}

.userOrdersPage {
  display: flex;
  flex-wrap: wrap;
}

.userOrders {
  width: 600px;
}
.userOrders li {
  list-style-type: none;
}
</style>
