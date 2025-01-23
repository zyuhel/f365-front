<script setup lang="ts">
import { useF365Store } from "@/stores/f365";
import {computed, onMounted, ref, watch} from "vue";
import PhotoCard from "@/components/PhotoCard.vue";
const props = defineProps(['month'])

const store = useF365Store();
import config from './config';
const imageDomain = config.imageHost.domain;


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

const getStats = computed(() => {
  return store.getPeriodCachedStats;
});

function setTitle() {
  document.title = 'F365 - Призеры за ' + props.month
}
let loading = ref(true);
let currentYear
let currentMonth
const getLoading = computed(() => {
  return loading.value;
});
onMounted(async () => {
  store.getPrizes(props.month);
  setTitle()
  let parts = props.month.split('-')
  currentYear=parseInt(parts[0])
  currentMonth=parseInt(parts[1])
  await  store.getPeriodStats(props.month)
  loading.value = false;
});
watch(
    () => props.month,
    async newId => {
      store.getPrizes(props.month);
      setTitle()
      let parts = props.month.split('-')
      currentYear=parseInt(parts[0])
      currentMonth=parseInt(parts[1])
      loading.value = true;
      await store.getPeriodStats(props.month)
      loading.value = false;
    }
)
function nextLink() {
  let year= currentYear
  let month = currentMonth
  let dt = new Date()
  if (dt.getFullYear()===currentYear && (dt.getMonth()+1)===currentMonth) return false
  if (month === 12)
    return (year+1)+'-'+'01'
  if (month < 9)
    return (year) + '-0' + (month+1)
  return (year) + '-' + (month+1)
}
function formatMonth(month) {
  if (month<10) return '0'+month
  return month
}
function prevLink() {
  let year= currentYear
  let month = currentMonth
  if (year===2019 && month===12) return false
  if (month === 1)
    return (year-1)+'-'+'12'
  if (month < 11)
    return (year) + '-0' + (month-1)
  return (year) + '-' + (month-1)
}
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
.lds-spinner {
  color: pink;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 37px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: #cef;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
<template>
  <h3><router-link :to="`/month/${prevLink()}`" v-if="prevLink()" :title="prevLink()">&lt;</router-link><span v-else>&lt;</span> Тройки лучших за <router-link  :to="`/year/${currentYear}`">{{currentYear}}</router-link>-{{formatMonth(currentMonth)}} <router-link :to="`/month/${nextLink()}`" v-if="nextLink()" :title="nextLink()">&gt;</router-link><span v-else>&gt;</span></h3>
  <ul uk-tab>
    <li><a href="#photos">Фотографии</a></li>
    <li><a href="#stats">Статистика</a></li>
  </ul>
  <ul class="uk-switcher uk-margin">
    <li>
  <section uk-lightbox="animation: slide; toggle: .lightbox-link">
    <div v-for="item in getItems" class=" uk-flex" :key="item.message_id" :style="getStyle(item)">
      <i :style="getBottomPadding(item)"></i>
      <a class="lightbox-link"
         :href="`${imageDomain}${item.image_url}`" :data-type="(item.is_video)?'video':'image'"
         :style="`min-height:${item.resizedHeight-10}px;display:block; `" :data-caption="`<span>День ${item.day_number} - </span><span>${item.username}</span>, <a href='https://t.me/factory365/${item.message_id}' >Пост в канале</a>`"
      >
      <img :src="`${imageDomain}/${item.image_url}`" loading="lazy" alt="">
      </a>
    </div>
  </section>
    </li>
  <li>
    <div class="lds-spinner" v-if="getLoading"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    <div v-else>
      <p>Дни с максимальным количеством участников: <span v-for=" (item, index) in getStats.max_participants" :key="`mp_${item.day_number}`">
        <router-link :to="`/day/${item.day_number}`">День {{item.day_number}}</router-link> ({{item.cnt}})<span v-if="index !== getStats.max_participants.length - 1">, </span>
      </span> </p>
      <p>Дни с минимальным количеством участников: <span v-for=" (item, index) in getStats.least_participants" :key="`ml_${item.day_number}`">
        <router-link :to="`/day/${item.day_number}`">День {{item.day_number}}</router-link> ({{item.cnt}})<span v-if="index !== getStats.least_participants.length - 1">, </span>
      </span> </p>
      <p>Больше всего побед: <span v-for=" (item, index) in getStats.most_win" :key="`mw_${item.username}`">
        <span v-if="item.username[0]!=='@'">{{ item.username }}</span><span v-else><a style="    display: inline-block;" :href="`https://t.me/${item.username.substring(1)}`" target="_blank">{{item.username}}</a></span> <router-link :to="`/user/${item.username}`" style="    display: inline-block;" class="uk-icon-link" uk-icon="album"></router-link> ({{item.cnt}})<span v-if="index !== getStats.most_win.length - 1">, </span>
      </span> </p>
      <p>Больше всего попаданий в первую тройку: <span v-for=" (item, index) in getStats.most_leader" :key="`mw_${item.username}`">
        <span v-if="item.username[0]!=='@'">{{ item.username }}</span><span v-else><a style="    display: inline-block;" :href="`https://t.me/${item.username.substring(1)}`" target="_blank">{{item.username}}</a></span> <router-link :to="`/user/${item.username}`" style="    display: inline-block;" class="uk-icon-link" uk-icon="album"></router-link> ({{item.cnt}})<span v-if="index !== getStats.most_leader.length - 1">, </span>
      </span></p>
      <p>Лучшее соотношение лайков на фотографию: <span v-for=" (item, index) in getStats.average_upvotes" :key="`mw_${item.username}`">
        <span v-if="item.username[0]!=='@'">{{ item.username }}</span><span v-else><a style="    display: inline-block;" :href="`https://t.me/${item.username.substring(1)}`" target="_blank">{{item.username}}</a></span> <router-link :to="`/user/${item.username}`" style="    display: inline-block;" class="uk-icon-link" uk-icon="album"></router-link> ({{item.cnt}})<span v-if="index !== getStats.average_upvotes.length - 1">, </span>
      </span></p>
      <p>Больше всего фотографий: <span v-for=" (item, index) in getStats.most_photos" :key="`mw_${item.username}`">
        <span v-if="item.username[0]!=='@'">{{ item.username }}</span><span v-else><a style="    display: inline-block;" :href="`https://t.me/${item.username.substring(1)}`" target="_blank">{{item.username}}</a></span> <router-link :to="`/user/${item.username}`" style="    display: inline-block;" class="uk-icon-link" uk-icon="album"></router-link> ({{item.cnt}})<span v-if="index !== getStats.most_photos.length - 1">, </span>
      </span></p>
      <p>Среднее количество лайков у фотографии - {{getStats.avgs.upvotes_avg}} (медиана {{getStats.avgs.upvotes_median}})</p>
      <p>Среднее количество дизлайков у фотографии - {{getStats.avgs.downvotes_avg}} (медиана {{getStats.avgs.downvotes_median}})</p>
      <p>Среднее количество фотографий в день - {{getStats.avgs.count_avg}}</p>
      <p>Среднее количество фотографий опубликованных каждым участником - {{getStats.avgs.count_user_avg}} (медиана {{getStats.avgs.count_user_median}})</p>
      <p>Всего участников - {{getStats.avgs.count_user}}</p>
      <p>Всего фотографий - {{getStats.avgs.total_count}}</p>
      <h4>Фотографии с наибольшим количестом лайков:</h4>
      <div class="uk-flex-row uk-flex" uk-lightbox="animation: slide; toggle: .lightbox-link">
        <div class="uk-width-1-3 uk-padding-small" v-for="item in getStats.best_works" >
          <PhotoCard :item="item" :key="item.message_id" :show_detail="true"></PhotoCard>
        </div>
      </div>
      <h4>Фотографии с наибольшим количестом дизлайков:</h4>
      <div class="uk-flex-row uk-flex" uk-lightbox="animation: slide; toggle: .lightbox-link">
        <div class="uk-width-1-3 uk-padding-small" v-for="item in getStats.worst_works" >
          <PhotoCard :item="item" :key="item.message_id" :show_detail="true"></PhotoCard>
        </div>
      </div>
      <h4>Наиболее спорные фотографии:</h4>
      <div class="uk-flex-row uk-flex" uk-lightbox="animation: slide; toggle: .lightbox-link">
        <div class="uk-width-1-3 uk-padding-small" v-for="item in getStats.controversial_works" >
          <PhotoCard :item="item" :key="item.message_id" :show_detail="true"></PhotoCard>
        </div>
      </div>
    </div>
  </li>
  </ul>
</template>

