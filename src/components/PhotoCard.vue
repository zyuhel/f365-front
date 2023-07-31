<script setup lang="ts">
defineProps<{
  item: object, show_detail: boolean, for_calendar: boolean
}>()
</script>

<template>

      <div class="uk-card" :height="item.resizedHeight+20" style="overflow: hidden">

        <div class="uk-card-media-top">
          <a class="lightbox-link"
             :href="`https://f365.zyuhel.ru${item.image_url}`" :data-type="(item.is_video)?'video':'image'"
             :style="`min-height:${item.resizedHeight-10}px;display:block; `" :data-caption="`<span>День ${item.day_number} - </span><span>${item.username}</span>, <a href='https://t.me/factory365/${item.message_id}' >Пост в канале</a>`"
          >
            <video v-if="item.is_video" :src="item.image_url"  controls="true"></video>
            <img v-else
              loading='lazy'
              :src="`https://f365.zyuhel.ru${item.image_url}`"
          ></a></div>
        <div class="uk-card-body uk-padding-remove-top uk-padding-remove-bottom">
          <div v-if="show_detail && item.place && item.place < 4" style="background-color: rgba(68, 68, 68,0.5);
    -webkit-box-shadow: 0 0 3px 2px rgba(0,0,0,.2);
    box-shadow: 0 0 3px 2px rgba(0,0,0,.2);
    height: 100px;
    left: -50px;
    position: absolute;
    top: -50px;
    width: 100px;
    color: #fff;
    line-height: 5;
    font-size: 2rem;
    -webkit-transform: rotate(-45deg); text-align: center;"><span v-if="item.place===1">🥇</span><span  v-if="item.place===2">🥈</span><span  v-if="item.place===3">🥉</span></div>
          <div v-if="show_detail && (item.day_number >2 && !(item.upvotes || item.downvotes ))" style="background-color: rgba(68, 68, 68,0.5);
    -webkit-box-shadow: 0 0 3px 2px rgba(0,0,0,.2);
    box-shadow: 0 0 3px 2px rgba(0,0,0,.2);
    right: 0;
    position: absolute;
    top: 0;
    color: rgb(255, 255, 255);
    font-size: 0.7rem;
    text-align: center;
    padding: 5px;" uk-tooltip="Результаты голосования отсутствуют / или за работу никто не проголосовал">
            🕑
          </div>
          <div v-if="show_detail && (item.upvotes || item.downvotes)" style="background-color: rgba(68, 68, 68,0.5);
    -webkit-box-shadow: 0 0 3px 2px rgba(0,0,0,.2);
    box-shadow: 0 0 3px 2px rgba(0,0,0,.2);
    right: 0;
    position: absolute;
    top: 0;
    color: rgb(255, 255, 255);
    font-size: 0.7rem;
    text-align: center;
    padding: 5px;"  :uk-tooltip="`${item.upvotes}👍 / ${item.downvotes}💩`">
            <span v-if="item.upvotes">{{item.upvotes}}👍 </span><span v-if="item.upvotes && item.downvotes"> / </span><span v-if="item.downvotes">{{item.downvotes}}💩</span>
          </div>
          <div v-if="for_calendar">
            <span v-if="item.username[0]!=='@'">{{ item.username }}</span><span v-else><a :href="`https://t.me/${item.username.substring(1)}`" target="_blank">{{item.username}}</a></span> <router-link :to="`/user/${item.username}`" class="uk-icon-link" uk-icon="album"></router-link>
          </div><div  v-else><router-link :to="`/day/${item.day_number}`">День {{ item.day_number }}</router-link> - <span v-if="item.username[0]!=='@'">{{ item.username }}</span><span v-else><a :href="`https://t.me/${item.username.substring(1)}`" target="_blank">{{item.username}}</a></span> <router-link :to="`/user/${item.username}`" class="uk-icon-link" uk-icon="album"></router-link>,
          <a :href="`https://t.me/factory365/${item.message_id}`" target="_blank">Пост в канале</a></div></div>
      </div>

</template>

