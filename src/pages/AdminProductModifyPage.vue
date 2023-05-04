<template>
  <div class="addProductPage">
    <UserMenu></UserMenu>
    <form class="productForm" @submit.prevent="modifyProduct">
      <h1 style="text-align: center">修改商品</h1>
      <TheSeparateLine></TheSeparateLine>
      <label for="">名稱:</label>
      <input type="text" v-model="product.productName" />

      <label>類別:</label>
      <div class="categoryRadios">
        <input
          type="radio"
          name="category"
          id="table"
          value="table"
          v-model="product.category"
        />桌子
        <input
          type="radio"
          name="category"
          id="chair"
          value="chair"
          v-model="product.category"
        />椅子
        <input
          type="radio"
          name="category"
          id="sofa"
          value="sofa"
          v-model="product.category"
        />沙發
      </div>

      <label for="">圖片:</label>
      <input type="text" v-model="product.imageUrl" />
      <label for="">價錢(NT$):</label>
      <input
        type="text"
        maxlength="6"
        style="width: 90px"
        v-model="product.price"
      />
      <label for="">庫存:</label>
      <input
        type="text"
        maxlength="6"
        style="width: 90px"
        v-model="product.stock"
      />
      <label for="">描述:</label>
      <textarea
        maxlength="300"
        rows="11"
        cols="40"
        style="resize: none"
        v-model="product.description"
      ></textarea>
      <TheButton type="submit">儲存變更</TheButton>
    </form>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { computed } from "vue";

import UserMenu from "../components/UserMenu.vue";
import TheSeparateLine from "../components/TheSeparateLine.vue";
import TheButton from "../components/TheButton.vue";
import { useStore } from "vuex";
import { router } from "../routes";

const store = useStore();

const product = computed(() => store.getters.getSingleProduct);

onMounted(() => {
  const productId = router.currentRoute.value.params.productId;
  store.dispatch("getSingleProduct", { productId });
});

async function modifyProduct() {
  await store.dispatch("modifyProduct", product);
  alert("修改商品成功!");
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
