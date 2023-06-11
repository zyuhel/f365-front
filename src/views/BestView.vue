<script setup lang="ts">
  import { useF365Store } from "../stores/f365";

  import {useRoute, useRouter} from 'vue-router'

  import {ref, onMounted, computed, watch} from "vue";
  import MasonryView from "@/components/MasonryView.vue";
  const store = useF365Store();
  const route = useRoute()
  const router = useRouter()
  const getBestImages = computed(() => {
    return store.getBestImages;
  });
  function generateSeed() {
    return Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER || 9007199254740991));

  }
  function setTitle() {
    document.title = 'F365 - Случайные лучшие '
  }
  if ( !route.query?.seed) {
    let seed = generateSeed()
    router.push({ path: '/best', query: { seed: seed  }})
    store.getBest(21, seed);
  }

  watch (()=>route.query.seed, async newSortValue => { if (!newSortValue) { router.push({ path: '/best', query: { seed: generateSeed()  }})} else {await store.getBest(21,( newSortValue?.toString()))} })
  onMounted(() => {
    if (route.query && route.query.seed)
      store.getBest(21, route.query.seed.toString());
  });


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
</style>
<template>
  <main>
    <h3>Подборка случайных фотографий из <span uk-tooltip="фотографии занявшие одно из первых трех мест по результатам ежедневного голосования">лучшего</span></h3>
    <MasonryView :items="getBestImages" :userpage="false" />
    <div class="uk-align-center uk-width-1-5@m uk-width-1-2"><router-link onclick='window.scrollTo( 0, 0 );' :to='"/best?seed=" + generateSeed()' class="uk-button uk-align-center uk-button-default">Обновить</router-link></div>
  </main>
</template>
