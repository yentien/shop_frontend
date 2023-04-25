<template>
  <div class="content">
    <div class="productList">
      <div class="productItem" v-for="product in productList" :key="product.id">
        <img
          :src="product.imgUrl"
          alt=""
          width="100%"
          height="100%"
          style="background: #eee"
          @click="replaceToProductPage(product.productId)"
        />
        <div class="productInfo">
          <span class="productName">{{ product.productName }}</span>
          <span class="productPrice">NT${{ product.price }}</span>
          <!-- <button>加入購物車</button> -->
        </div>
      </div>
    </div>
    <div class="category">
      <ul class="categoryList">
        <li>分類1</li>
        <li>分類2</li>
        <li>分類3</li>
        <li>分類4</li>
        <li>分類5</li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { router } from "../routes";

const store = useStore();
const productList = computed(() => store.state.product.productList);

onMounted(() => {
  store.dispatch("getProducts");
});

// 跳轉商品頁面
function replaceToProductPage(productId) {
  router.push({ name: "products", params: { productId } });
}
</script>
<style scoped>
.category {
  width: 10vw;
}

li {
  list-style-type: none;
}

.categoryList li {
  padding: 3px;
  cursor: pointer;
}
.content {
  display: grid;
  grid-template-columns: 80fr 1fr;
  gap: 30px;
}

.productList {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 48px;
}

.productItem {
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
}

.productInfo {
  padding: 10px 20px 25px 20px;
  display: grid;
  text-align: center;
  justify-items: center;
}

.productItem > img {
  width: 100%;
  height: 175px;
  object-fit: cover;
  background: #eee;
  cursor: pointer;
}

.productName {
  font-size: 20px;
}
.productPrice {
  font-size: 15px;
  margin-top: 10px;
}
.productInfo button {
  width: 60%;
  padding: 5px 0px 5px 0px;
  font-size: 15px;
  margin-top: 15px;
  background-color: #9d8d6f;
  color: white;
  border: none;
}
</style>
