<template>
  <div class="addProductPage">
    <UserMenu></UserMenu>
    <form class="productForm" @submit.prevent="addProduct">
      <h1 style="text-align: center">新增商品</h1>
      <TheSeparateLine></TheSeparateLine>
      <label for="">名稱:</label>
      <input type="text" v-model="productData.productName" />

      <label>類別:</label>
      <div class="categoryRadios">
        <input
          type="radio"
          name="category"
          id="table"
          value="table"
          v-model="productData.category"
        />桌子
        <input
          type="radio"
          name="category"
          id="chair"
          value="chair"
          v-model="productData.category"
        />椅子
        <input
          type="radio"
          name="category"
          id="sofa"
          value="sofa"
          v-model="productData.category"
        />沙發
      </div>

      <label for="">圖片:</label>
      <input type="text" v-model="productData.imageUrl" />
      <label for="">價錢(NT$):</label>
      <input
        type="text"
        maxlength="6"
        style="width: 90px"
        v-model="productData.price"
      />
      <label for="">庫存:</label>
      <input
        type="text"
        maxlength="6"
        style="width: 90px"
        v-model="productData.stock"
      />
      <label for="">描述:</label>
      <textarea
        maxlength="300"
        rows="11"
        cols="40"
        style="resize: none"
        v-model="productData.description"
      ></textarea>
      <TheButton type="submit">儲存變更</TheButton>
    </form>
  </div>
</template>
<script setup>
import UserMenu from "../components/UserMenu.vue";
import TheSeparateLine from "../components/TheSeparateLine.vue";
import TheButton from "../components/TheButton.vue";
import { reactive } from "vue";
import { useStore } from "vuex";
import { router } from "../routes";

const store = useStore();

const productData = reactive({
  productName: "",
  category: "",
  imageUrl: "",
  price: 0,
  stock: 0,
  description: "",
});

async function addProduct() {
  await store.dispatch("addProduct", productData);
  // location.reload();
  alert("已新增商品!");
  router.push("/admin/products");
}
</script>
<style scoped>
label,
input,
textarea {
  margin: 3px;
}
.addProductPage {
  display: flex;
}
.productForm {
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
