<script setup lang="ts">
  import { useF365Store } from "@/stores/f365";
  import { useRoute } from 'vue-router'


  import { ref, onMounted, computed, watch } from "vue";
  import MasonryView from "@/components/MasonryView.vue";
  import {RouterLink} from "vue-router";
  const route = useRoute()
  if (route.query && !route.query.sort) route.query.sort='early'
  let sort = ref(route.query.sort)
  const props = defineProps(['user'])
  const store = useF365Store();
  const getForUser = computed(() => {
    return store.getEntriesForUser;
  });
  const getForUserStats = computed(() => {
    return store.getStatsForUser;
  });

  const getForUserLinks = computed(() => {
    return store.getLinksForUser;
  });
  function sortBy(field, isAsc) {
    store.sortBy(field, isAsc)
  }
  function isCurrent(value) {
    if (route.query.sort?.toString() === value) {
        return true
    }
    return false
  }
  function setTitle() {
    document.title = 'F365 - Работы пользователя ' + props.user
  }
  async function sortByParam(argument) {
    switch (argument) {
      case 'early':
        await store.sortBy('day_number', true)
        break;
      case 'last':
        await store.sortBy('day_number', false)
        break;
      case 'controversial':
        await store.sortByControversial();
        break;
      case 'upvotes':
        await store.sortBy('upvotes', false)
        break;
      case 'downvotes':
        await store.sortBy('downvotes', false)
        break;
    }
  }
  onMounted(async () => {
    await store.getForUser(props.user);
    if (sort.value !=='early') {
      await sortByParam(sort.value)
    }
    setTitle()
  });
  watch(
      () => props.user,
      async newId => {
        await store.getForUser(props.user);
        setTitle();
      }
  )
  watch (()=>route.query.sort, async newSortValue => { await sortByParam( newSortValue?.toString()) })



</script>
<style>
.boxContainer {
  display: inline-flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
}
.boxContainer a
{
  text-decoration: none;
  margin-bottom: 1rem;
}
.boxContainer a:nth-child(1) {
  display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: auto;
  order: 0;
}

.boxContainer a:nth-child(2) {
  display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: auto;
  order: 0;
}

.boxContainer > div
{
  text-decoration: none;
  margin-bottom: 1rem;
}
.boxContainer  > div:nth-child(1) {
  display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: auto;
  order: 0;
}

.boxContainer  > div:nth-child(2) {
  display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: auto;
  order: 0;
}
.css-1rato8u{
  position: absolute;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
}
img {
  overflow-clip-margin: content-box;
  overflow: clip;
}
.sort-navbar .active{
  font-weight: 500;
}
.uk-tab>.uk-active>a {
  color: #222;
  border-color: #1e87f0;
  border-bottom: 1px solid #1e87f0;
}
</style>
<template>
  <main>
    <h3>Подборка фотографий {{ user }}<span style="margin-left:1rem">
      <a v-if="user[0]=='@'" class="uk-icon-button" target="_blank" :href="`https://t.me/${user.substring(1)}`" uk-tooltip="Написать в Telegram"><font-awesome-icon icon="fa-brands fa-telegram" /></a>
      <a v-for="link in getForUserLinks" :key="link.link" class="uk-icon-button" target="_blank" :uk-tooltip="link.tooltip" :href="link.link"><font-awesome-icon :icon="link.link_type" /></a>
    </span></h3>
    <ul uk-tab>
      <li><a href="#photos">Фотографии</a></li>
      <li><a href="#stats">Статистика</a></li>
    </ul>
    <ul class="uk-switcher uk-margin">
    <li>
      <nav class="uk-navbar-container sort-navbar uk-padding-small uk-padding-remove-top uk-padding-remove-bottom uk-margin-bottom uk-margin-remove-top" uk-navbar >
        <div class="uk-navbar-left uk-visible@m">Сортировка: </div>
        <div class="uk-navbar-left"><router-link :class="{ active: isCurrent('early')}" to="?sort=early">Самые ранние</router-link></div>
        <div class="uk-navbar-left"><router-link :class="{ active: isCurrent('last')}" to="?sort=last">Самые новые</router-link></div>
        <div class="uk-navbar-left"><router-link :class="{ active: isCurrent('upvotes')}" to="?sort=upvotes">Лайки</router-link></div>
        <div class="uk-navbar-left"><router-link :class="{ active: isCurrent('downvotes')}" to="?sort=downvotes">Говно</router-link></div>
        <div class="uk-navbar-left  uk-visible@m"><router-link :class="{ active: isCurrent('controversial')}" to="?sort=controversial">Противоречивости</router-link></div>

      </nav>
      <MasonryView :items="getForUser" :userpage="true" :key="`${user}_${sort}`"/>
    </li>
     <li>
        <ul>
          <li>Всего фотографий опубликованно: {{getForUserStats.count}}</li>
          <li>Самая длинная серия: {{getForUserStats.longest_sequence}}</li>
          <li>Среднее количество лайков на фотографии: {{getForUserStats.upvotes_avg}}</li>
          <li>Среднее количество дизлайков на фотографии: {{getForUserStats.downvotes_avg}}</li>
          <li>Общее количество лайков на фотографии: {{getForUserStats.upvotes_sum}}</li>
          <li>Общее количество дизлайков на фотографии: {{getForUserStats.downvotes_sum}}</li>
          <li><span v-if="getForUserStats.place1">🥇 {{getForUserStats.place1}}</span><span  v-if="getForUserStats.place2">🥈 {{getForUserStats.place2}}</span><span  v-if="getForUserStats.place3">🥉  {{getForUserStats.place3}}</span></li>
        </ul>

     </li>
    </ul>
  </main>
</template>
