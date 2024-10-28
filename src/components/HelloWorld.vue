<script setup>
import {onMounted, ref} from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
const data = ref([]);
const isLoading = ref(false);
const page = ref(1);
const container = ref(null);
const visibleItems = ref([]);
const sentinel = ref(null);

async function fetchItems(page) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newItems = Array.from({length: 10}, (v, k) => ({
        id: page * 10 + k,
        text: `item ${page * 10 + k}`
      }));
      resolve(newItems)
    }, 1000)
  })
}

async function loadMoreItems() {
  if (isLoading.value) return;
  isLoading.value = true;
  const newItems = await fetchItems(page.value);
  isLoading.value = false;
  page.value++;
  console.log(page.value)
  data.value.push(...newItems);
  updateVisibleItems();
}

function observeScroll() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  }
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMoreItems();
    }
  }, options);
  observer.observe(sentinel.value)
}

function updateVisibleItems() {
  const containerHeight = container.value.clientHeight;
  // const scrollTop = container.value.scrollTop;
  // visibleItems.value = data.value.filter((item, index) => {
  //   const itemTop = index * 20 // 假设 每个item 高20px;
  //   const itemBottom = itemTop + 20;
  //   return itemTop >= scrollTop && itemBottom <= scrollTop + containerHeight;
  // })
  // console.log(data.value.length)
  if(data.value.length * 20 < containerHeight) {
    loadMoreItems();
  }
}

onMounted(() => {
  loadMoreItems();
  observeScroll();
})
</script>

<template>
  <div class="header"></div>
  <div class="container" ref="container" >
    <template v-for="item in data" :key="item.id">
      <div style="height: 20px">{{ item.text }}</div>
    </template>
    <div ref="sentinel" style="height: 1px;"></div>
  </div>

</template>

<style scoped>
.header {
  height: 50px;
}

.container {
  overflow: scroll;
  background-color: #cecece;
  height: calc(100% - 50px);
}
</style>
