<template>
  <div class="productPage">
    <div class="productImg">
      <img :src="singleProduct.imageUrl" alt="" />
    </div>
    <div class="productInfo">
      <h1>{{ singleProduct.productName }}</h1>
      <h2>NT${{ singleProduct.price }}</h2>
      <p>{{ singleProduct.description }}</p>
      <div class="InfoBottom">
        <TheAmountControl
          class="theAmountControl"
          @update="updateAmount"
        ></TheAmountControl>
        <TheButton class="theButton" @click="addItemToCart"
          >加入購物車</TheButton
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import TheAmountControl from "../components/TheAmountControl.vue";
import TheButton from "../components/TheButton.vue";
import { computed, onMounted, reactive, ref } from "vue";
import { router } from "../routes";
import { useStore } from "vuex";

const store = useStore();

const cartData = reactive({
  id: router.currentRoute.value.params.productId,
  amount: 1,
});

const singleProduct = computed(() => {
  return store.getters.getSingleProduct;
});

const cartProductList = computed(() => {
  return store.getters.getCartProductList;
});

onMounted(() => {
  const productId = router.currentRoute.value.params.productId;
  store.dispatch("getSingleProduct", { productId });
});

// 監聽子組件 TheAmountControl update觸發updateAmount回傳amount給父組件
const updateAmount = (amount) => {
  cartData.amount = amount;
};

// 加入購物車
async function addItemToCart() {
  // 取得現在購物車所有商品
  await store.dispatch("getCart");

  // 檢查購物車是否有此商品，若有則cartData.amount = 加購數量+購物車原有數量
  cartProductList.value.find((p) => {
    if (p.productId == cartData.id) {
      cartData.amount += p.quantity;
    }
  });

  // 加入購物車api
  await store.dispatch("addItemToCart", cartData);
  alert("已加入購物車!");
}
</script>
<style scoped>
.productPage {
  display: flex;
  flex-wrap: wrap;
}

.theButton {
  height: 40px;
}

.productImg,
img {
  width: 400px;
  height: 300px;
  margin-right: 30px;
}

.productInfo {
  position: relative;
}

.InfoBottom {
  display: flex;
}

.productInfo > h1,
h2,
p {
  margin-bottom: 15px;
  width: 300px;
}

p {
  height: 150px;
}

.theAmountControl {
  margin-right: 50px;
}
</style>
