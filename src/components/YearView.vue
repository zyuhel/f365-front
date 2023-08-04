<script setup lang="ts">
import PhotoCard from "@/components/PhotoCard.vue";
import { useF365Store } from "@/stores/f365";
import {computed, onMounted, watch} from "vue";
const props = defineProps(['year'])

/*defineProps<{
  items: array, userpage: boolean
}>()*/
let year=2023;
const store = useF365Store();

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
function startingDay(month,year) {
  let day = new Date(year, month, 0).getDay()-1;
  if (day>-1) return day
  return 6;
}
function getStyle(item) {
  let num = item.width*200/item.height
 return 'width:'+num+'px;flex-grow:'+num;
}
function getBottomPadding(item) {
  return 'padding-bottom:'+(item.height/item.width*100)+'%';
}
const getItems = computed (() => {
  let items = store.getFirsters
  console.log(items)
  return items
})
const getMonths = computed( () => {
  let months = [];
  let j = 0
  let entries = store.getFirsters
  let stop = false;
  for (let i = 1; i <= 12; i++) {
    if (!stop) {
      let month = {
        'days': daysInMonth(i, year),
        'offset': startingDay(i, year),
        'starting_day': 0,
        works: [],
        'year': year,
        'month': i
      }
      for (let m = 0; m < month.days; m++) {
        if (entries[j + m])
          month.works.push(entries[j + m])
        else stop = true
      }
      j = j + month.days;
      months.push(month)
    }
  }
  console.log(months)
  return months;
});
let items = [];
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
  <h3>Победители за {{props.year}}</h3>

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

