<script setup>
import {computed, ref} from "vue";
import {usePrivacy} from "../pinia/privacyStore.js";

const visible = ref(false);
const privacyStore = usePrivacy();
setTimeout(()=>{
  privacyStore.cookie = 'bbbbbbbb'
},2000)
const arr = computed(()=>[
  {
    title:'aaa',
    content: privacyStore.cookie
  }
])
</script>
<template>
  <div>
    <template v-for="item in arr">
      <div>{{item.content}}</div>
    </template>
  </div>

</template>