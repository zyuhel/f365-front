<script setup lang="ts">
  import { useF365Store } from "../stores/f365";
  import debounce from 'lodash.debounce'

  import {ref, onMounted, computed, watch} from "vue";
  import MasonryView from "@/components/MasonryView.vue";

  let input = ref("");

  const store = useF365Store();
  const getSearchResults = computed(() => {
    return store.getSearchResults;
  });

  watch (input, debounce(() => {store.searchFor(input.value)},500));

  function setTitle() {
    document.title = 'F365 - Поиск'
  }

  onMounted(() => {
    store.searchFor('')
    setTitle()
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
    <h4>Поиск по пользователю</h4>
    <div class="uk-margin">
      <input v-model="input" class="uk-input" type="text" placeholder="Введите имя..." aria-label="Input">
      <div v-for="result in getSearchResults" :key="result.username"><router-link :to="`/user/${result.username}`">{{result.username}}</router-link></div>
    </div>
  </main>
</template>
