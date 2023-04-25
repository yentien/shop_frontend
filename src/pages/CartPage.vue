<template>
  <div class="cart">
    <div class="itemList">
      <ul class="titleBar">
        <li>商品</li>
        <li>數量</li>
        <li>小計</li>
      </ul>
      <TheSeparateLine></TheSeparateLine>

      <div class="item" v-for="product in cartProductList" :key="product.id">
        <div>
          <img :src="product.imgUrl" alt="" style="width: 100%" />
        </div>
        <div class="itemInfo">
          <p style="font-size: 16px">{{ product.productName }}</p>
          <div>NT${{ product.price }}　</div>
        </div>
        <div>
          <div class="theAmountControl">
            <div
              class="subBorder"
              style="cursor: pointer"
              @click="decreaseQuantity(product.productId, product.price)"
            >
              <p>－</p>
            </div>
            <div class="amountBorder">
              <p>　{{ product.quantity }}　</p>
            </div>
            <div
              class="addBorder"
              style="cursor: pointer"
              @click="increaseQuantity(product.productId, product.price)"
            >
              <p>＋</p>
            </div>
          </div>
        </div>
        <div>NT${{ product.quantity * product.price }}　</div>
        <div>
          <img
            src="../assets/trashCan.svg"
            alt=""
            style="width: 50%"
            @click="deleteCartProudct(product.productId)"
          />
        </div>
      </div>
    </div>

    <div class="totalInfo">
      <p>購物車總計</p>
      <div class="subTotal">
        <p>小計</p>
        <p>NT${{ sumPrice }}</p>
      </div>
      <TheSeparateLine></TheSeparateLine>

      <div class="shippingMethod">
        <p>運送方式</p>
        <ul>
          <li>
            <label for="sevenEleven">超商取貨:7-ELEVEN: NT$60</label>
            <input
              type="radio"
              id="sevenEleven"
              value="sevenEleven"
              v-model="shippingMethod"
              @change="updateTotalAmount"
            />
          </li>
          <li>
            <label for="familyMart">超商取貨:全家: NT$60</label>
            <input
              type="radio"
              id="familyMart"
              value="familyMart"
              v-model="shippingMethod"
              @change="updateTotalAmount"
            />
          </li>
          <li>
            <label for="postOffice">宅配:郵局: NT$100</label>
            <input
              type="radio"
              id="postOffice"
              value="postOffice"
              v-model="shippingMethod"
              @change="updateTotalAmount"
            />
          </li>
          <li>
            <label for="tCat">宅配:黑貓: NT$130</label>
            <input
              type="radio"
              id="tCat"
              value="tCat"
              v-model="shippingMethod"
              @change="updateTotalAmount"
            />
          </li>
        </ul>
      </div>
      <TheSeparateLine></TheSeparateLine>

      <div class="totalAmount">
        <p>總計</p>
        <p>NT${{ sumPrice }}</p>
      </div>
      <TheButton @click="CheckOut" class="checkOutButton">前往結帳</TheButton>
    </div>
  </div>
</template>
<script setup>
import TheSeparateLine from "../components/TheSeparateLine.vue";
import TheButton from "../components/TheButton.vue";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const shippingMethod = ref("");
const shippingFee = ref(0);

const store = useStore();

onMounted(() => {
  store.dispatch("getCart");
});

const cartProductList = computed(() => {
  return store.getters.getCartProductList;
});

const sumPrice = computed(() => {
  let sumPrice = 0;
  cartProductList.value.find((p) => {
    sumPrice += p.price * p.quantity;
  });
  return sumPrice + shippingFee.value;
  // console.log(totalPrice.value);
});

// 商品-1
async function decreaseQuantity(productId) {
  const product = await cartProductList.value.find((p) => {
    if (p.productId === productId && p.quantity > 1) {
      p.quantity--;
      return p;
    } else {
      return null;
    }
  });
  if (product != null) {
    const payload = {
      productId,
      quantity: product.quantity,
    };
    await store.dispatch("updateQuantity", payload);
    updateStoreCart();
  }
}

// 商品+1
async function increaseQuantity(productId) {
  const product = await cartProductList.value.find((p) => {
    if (p.productId === productId) {
      p.quantity++;
      return p;
    }
  });
  const payload = {
    productId,
    quantity: product.quantity,
  };
  await store.dispatch("updateQuantity", payload);
  updateStoreCart();
}

// 刪除購物車商品
async function deleteCartProudct(productId) {
  const deleteIndex = await cartProductList.value.forEach((p, index) => {
    if (p.productId === productId) {
      return index;
    }
  });
  await store.dispatch("deleteCartProduct", productId);
  cartProductList.value.splice(deleteIndex, deleteIndex + 1);
  updateStoreCart();
}

// 更新store.cart.cartProductList
function updateStoreCart() {
  store.commit("setCartProductList", cartProductList.value);
}

// 運費
function updateTotalAmount() {
  switch (shippingMethod.value) {
    case "sevenEleven":
      shippingFee.value = 60;
      break;
    case "familyMart":
      shippingFee.value = 60;
      break;
    case "postOffice":
      shippingFee.value = 100;
      break;
    case "tCat":
      shippingFee.value = 130;
      break;
  }
}

function CheckOut() {
  // console.log(cartProductList.value);
}
</script>
<style scoped>
li {
  list-style-type: none;
}

.cart {
  /* display: grid;
  grid-template-columns: 2fr 1.1fr minmax(100px, 1fr);
  gap: 1.25rem; */
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.itemList {
  flex-grow: 1;
}

.titleBar {
  display: grid;
  grid-template-columns: 3fr 2fr 2fr;
  width: 600px;
}

.item {
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 1fr 0.3fr;
  margin: 18px 0px;
  gap: 1.5rem;
  width: 600px;
}

.item div {
  display: flex;
  justify-content: start;
  align-items: center;
}

.item > .itemInfo {
  flex-direction: column;
  align-items: start;
  justify-content: center;
}
.border {
  border: 1px solid black;
  height: 30px;
}

.totalInfo {
  border: 3px solid rgb(179, 178, 178);
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  width: 350px;
}

.subTotal {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 10px;
}

.shippingMethod {
  display: flex;
  gap: 15px;
  justify-content: space-between;
}

.shippingMethod li {
  text-align: end;
  margin-bottom: 10px;
}

.shippingMethod label {
  margin-right: 5px;
}

.totalAmount {
  display: flex;
  justify-content: space-between;
  margin: 15px 0px;
}

.checkOutButton {
  border-radius: 0;
}

.theAmountControl {
  display: flex;
  align-items: center;
  justify-content: center;
}

.subBorder,
.amountBorder,
.addBorder {
  border: 1px solid black;
  height: 30px;
  display: flex;
  align-items: center;
}
.subBorder {
  border-right: none;
}
.addBorder {
  border-left: none;
}
</style>
