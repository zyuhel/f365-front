<script setup lang="ts">
import { useF365Store } from "@/stores/f365";
import {computed, onMounted, watch} from "vue";
const props = defineProps(['year'])

const store = useF365Store();



function getStyle(item) {
  let num = item.width*200/item.height
 return 'width:'+num+'px;flex-grow:'+num;
}
function getBottomPadding(item) {
  return 'padding-bottom:'+(item.height/item.width*100)+'%';
}
const getItems = computed (() => {
  return store.getFirsters
})

function setTitle() {
  document.title = 'F365 - Победители за ' + props.year
}
onMounted(() => {
  store.getFirst(props.year);
  setTitle()
});
watch(
    () => props.year,
    async newId => {
      store.getFirst(props.year);
      setTitle()
    }
)
</script>
<style scoped>
section {
  display: flex;
  flex-wrap: wrap;
}
section::after {
  content: '';
  flex-grow: 999999999;
}
div {
  margin: 2px;
  position: relative;
}
i{
  display: block;
}
img {
  position: absolute;
  top: 0;
  width: 100%;
  vertical-align: bottom;
}

</style>
<template>
  <h3><router-link :to="`/year/${parseInt(props.year)-1}`" v-if="parseInt(props.year)>2019" :title="parseInt(props.year)-1">&lt;</router-link><span v-else>&lt;</span> Победители за {{props.year}} <router-link :to="`/year/${parseInt(props.year)+1}`" v-if="parseInt(props.year)<2023" :title="parseInt(props.year)+1">&gt;</router-link><span v-else>&gt;</span></h3>

  <section uk-lightbox="animation: slide; toggle: .lightbox-link">
    <div v-for="item in getItems" class=" uk-flex" :key="item.message_id" :style="getStyle(item)">
      <i :style="getBottomPadding(item)"></i>
      <a class="lightbox-link"
         :href="`https://f365.zyuhel.ru${item.image_url}`" :data-type="(item.is_video)?'video':'image'"
         :style="`min-height:${item.resizedHeight-10}px;display:block; `" :data-caption="`<span>День ${item.day_number} - </span><span>${item.username}</span>, <a href='https://t.me/factory365/${item.message_id}' >Пост в канале</a>`"
      >
      <img :src="`https://f365.zyuhel.ru/${item.image_url}`" loading="lazy" alt="">
      </a>
    </div>
  </section>

</template>

