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
      <div class="orderItem" v-for="i in 6" :key="i">
        <ul class="orderItemInfo">
          <li>A111</li>
          <li>2023/04/04</li>
          <li>完成訂單</li>
          <li>NT$1400</li>
          <li>
            <ul class="orderActions">
              <li>付款</li>
              <li>查看</li>
              <li>取消</li>
            </ul>
          </li>
        </ul>
        <TheSeparateLine></TheSeparateLine>
      </div>
    </div>
  </div>
</template>
<script setup>
import TheSeparateLine from "../components/TheSeparateLine.vue";
import UserMenu from "../components/UserMenu.vue";
</script>
<style scoped>
.userOrdersPage {
  display: flex;
  flex-wrap: wrap;
}

.userOrders {
  width: 70%;
  min-width: 400px;
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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
}
.orderItem li {
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
</style>
