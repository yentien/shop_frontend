<template>
  <div class="adminOrdersPage">
    <UserMenu></UserMenu>
    <div class="OrderList">
      <ul class="titleBar">
        <li>訂單</li>
        <li>發布日期</li>
        <li>狀態</li>
        <li>總計</li>
        <li>動作</li>
      </ul>
      <TheSeparateLine></TheSeparateLine>
      <div v-for="order in orderList" :key="order.orderId">
        <ul class="orderItem">
          <li>{{ order.orderId }}</li>
          <li>{{ order.createdDate.substring(0, 10) }}</li>
          <li>{{ order.status }}</li>
          <li>NT${{ order.totalAmount }}</li>
          <li>
            <ul class="orderActions">
              <!-- <li>付款</li> -->
              <li @click="order.isVisiable = !order.isVisiable">查看</li>
              <li @click="deleteOrder(order.orderId)">取消</li>
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
  store.dispatch("getAllOrderList");
});

const orderList = computed(() => {
  let orderList = store.state.order.allOrderList;
  if (orderList.length !== 0) {
    orderList.forEach((order) => {
      order.isVisiable = false;
    });
  }
  return orderList;
});

function deleteOrder(orderId) {
  var isOptionSelected = confirm("確定取消訂單?");
  if (isOptionSelected) {
    store.dispatch("deleteOrder", orderId);
    store.dispatch("getAllOrderList");
    location.reload();
  }
}
</script>
<style scoped>
li {
  list-style-type: none;
}
.adminOrdersPage {
  display: flex;
}
.titleBar,
.orderItem {
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.titleBar > li,
.orderItem > li {
  width: 100px;
}
.orderActions li {
  width: 100px;
  background: #9d8d6f;
  color: white;
  padding: 10px 0px;
  margin: 1px 0px;
}

.orderItemContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
