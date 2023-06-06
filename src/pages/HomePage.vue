<template>
  <div class="mainContainer">
    <ul class="page">
      <li
        v-if="productFilter.currentPage > 1"
        @click="changePage(productFilter.currentPage - 1)"
      >
        &lt;
      </li>
      <li v-for="page in visiblePages" :key="page" @click="changePage(page)">
        {{ page }}
      </li>
      <li
        v-if="productFilter.currentPage != pageInfo.totalPages"
        @click="changePage(productFilter.currentPage + 1)"
      >
        >
      </li>
    </ul>
    <div class="content">
      <div class="category">
        <ul class="categoryList">
          <li style="font-size: 20px; cursor: default">分類</li>
          <li>桌子</li>
          <li>椅子</li>
          <li>沙發</li>
        </ul>
      </div>
      <div class="productList">
        <div
          class="productItem"
          v-for="product in productList"
          :key="product.id"
        >
          <img
            :src="product.imageUrl"
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
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { router } from "../routes";

const store = useStore();
const productList = computed(() => store.state.product.productList);
const pageInfo = computed(() => store.state.product.pageInfo);
const productFilter = reactive({
  sortBy: "", // 排序選擇
  orderBy: "", // 升冪或降冪
  currentPage: 1, // 當前頁數
  pageSize: 6, // 每頁顯示的產品數量
  category: "", // 類別
});
const visiblePagesCount = 3; //可見頁碼的數量

onMounted(() => {
  store.dispatch("getProducts", productFilter);
});

// 跳轉商品頁面
function replaceToProductPage(productId) {
  router.push({ name: "products", params: { productId } });
}

// 切換分頁
function changePage(page) {
  console.log(visiblePages.value);
  if (page >= 1 && page <= pageInfo.value.totalPages) {
    console.log(page);
    productFilter.currentPage = page;
    store.dispatch("getProducts", productFilter);
  }
}

// 計算可見頁碼
const visiblePages = computed(() => {
  const totalPages = pageInfo.value.totalPages;
  const currentPage = productFilter.currentPage;

  const startPage = Math.max(
    1,
    currentPage - Math.floor(visiblePagesCount / 2)
  );
  const endPage = Math.min(startPage + visiblePagesCount - 1, totalPages);

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
});
</script>
<style scoped>
.page {
  display: flex;
}
.page li {
  /* background-color: #9d8d6f93; */
  width: 20px;
  height: 20px;
  margin: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.mainContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.content {
  display: flex;
}
.category {
  width: 10vw;
}

li {
  list-style-type: none;
}

.categoryList li {
  padding: 3px;
  cursor: pointer;
  font-size: 18px;
}

.productList {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.productItem {
  width: 250px;
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  margin: 0px 20px 20px 20px;
}

.productInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80px;
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
</style>
