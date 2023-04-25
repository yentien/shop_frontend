<template>
  <div class="theAmountControl">
    <div
      class="subBorder"
      style="cursor: pointer"
      @click="amount > 1 ? amount-- : {}"
    >
      <p>－</p>
    </div>
    <div class="amountBorder">
      <p>　{{ amount }}　</p>
    </div>
    <div class="addBorder" style="cursor: pointer" @click="amount++">
      <p>＋</p>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, watch } from "vue";

const amount = ref(1);

const emit = defineEmits(["update", "change"]);

const computedAmount = computed(() => {
  return amount.value;
});

watch(computedAmount, (newVal) => {
  emit("update", newVal);
  emit("change", newVal);
});
</script>
<style scoped>
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
