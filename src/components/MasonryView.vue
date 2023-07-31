<script setup lang="ts">
import PhotoCard from "@/components/PhotoCard.vue";

defineProps<{
  items: Array, userpage: boolean
}>()
</script>

<template>
  <div class="uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true"
       uk-lightbox="animation: slide; toggle: .lightbox-link" v-if="items.length>0">
    <div v-for="item in items" class=" uk-flex" :key="item.message_id">
      <PhotoCard :item="item" :show_detail="userpage" :for_calendar="false" />
    </div>
  </div>
</template>

