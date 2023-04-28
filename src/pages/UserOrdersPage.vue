<template>
  <div class="userOrdersPage">
    <UserMenu></UserMenu>
    <div class="userOrders">
      <ul class="titleBar">
        <li>訂單</li>
        <li>發布日期</li>
        <li>狀態</li>
        <li>總計</li>
        <li>動作</li>
      </ul>
      <TheSeparateLine></TheSeparateLine>
      <div class="orders" v-for="order in orderList" :key="order.orderId">
        <ul class="orderItemInfo">
          <li>{{ order.orderId }}</li>
          <li>{{ order.createdDate.substring(0, 10) }}</li>
          <li>{{ order.status }}</li>
          <li>NT${{ order.totalAmount }}</li>
          <li>
            <ul class="orderActions">
              <!-- <li>付款</li> -->
              <li @click="order.isVisiable = !order.isVisiable">查看</li>
              <!-- <li>取消</li> -->
            </ul>
          </li>
        </ul>
        <div class="orderItemContainer" v-if="order.isVisiable">
          <TheSeparateLine style="border-color: #d1d1d14e"></TheSeparateLine>

          <ul class="orderItem" style="width: 100px">
            <li><p style="width: 100px">圖片</p></li>
            <li><p style="width: 100px">名稱</p></li>
            <li><p style="width: 100px">數量</p></li>
            <li><p style="width: 100px">價錢</p></li>
          </ul>

          <div
            class="orderItems"
            v-for="orderItem in order.orderItemList"
            :key="orderItem.orderItemId"
          >
            <TheSeparateLine class="separateLine"></TheSeparateLine>

            <ul class="orderItem">
              <li>
                <img :src="orderItem.imageUrl" alt="" style="width: 100px" />
              </li>
              <li>
                <p style="width: 100px">{{ orderItem.productName }}</p>
              </li>
              <li>
                <p style="width: 80px">{{ orderItem.quantity }}</p>
              </li>
              <li>
                <p style="width: 100px">NT${{ orderItem.amount }}</p>
              </li>
            </ul>
          </div>
          <TheSeparateLine class="separateLine"></TheSeparateLine>
          <p style="width: 335px; text-align: end">
            運費 +NT${{ order.shipFee }}
          </p>
        </div>
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

const store = useStore();

onMounted(() => {
  store.dispatch("getOrderList");
});

const orderList = computed(() => {
  let orderList = store.state.order.orderList;
  orderList.forEach((order) => {
    order.isVisiable = false;
  });
  return orderList;
});
</script>
<style scoped>
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
.separationLine {
  width: 100%;
  border: 1px solid #d1d1d1;
  margin: 5px 0px;
}
.titleBar,
.orderItemInfo {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  gap: 40px;
}
.orders li {
  width: 100%;
  cursor: pointer;
  display: inline-block;
  text-align: center;
}
.orderActions {
  display: grid;
  gap: 1px;
  /* grid-template-rows: 1fr 1fr 1fr; */
  /* text-align: center; */
}
.orderActions li {
  /* width: 100%; */
  /* height: 35px; */
  background: #9d8d6f;
  color: white;
  padding: 10px 0px;
}

.orderItems {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.orderItem {
  display: flex;
  align-items: center;
  justify-content: center;
}

.separateLine {
  width: 500px;
  border-color: #d1d1d14e;
}
.orderItemContainer {
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
