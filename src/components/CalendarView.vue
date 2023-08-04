<script setup lang="ts">
import PhotoCard from "@/components/PhotoCard.vue";
import { useF365Store } from "@/stores/f365";
import {computed} from "vue";

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
store.getFirst(year.toString())

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
</script>
<style>
.calendar {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;

}
.calendar-parent {
  margin-bottom: 2rem;
  border-bottom:1px solid;
  padding-bottom:2rem;
}
.calendar-day {
  width: 14.28%;
  /* height: 300px;*/
  height: 15%;
  /* border: 1px solid #ccc;*/
  display: flex;
  justify-content: center;
  align-items: baseline;
  position:relative;
  overflow: hidden;
}
.calendar-date {
  position:absolute;
  top: 0;
  left: 0;
  font-weight: bold;
  z-index: 100;

}
.calendar-day-header {
  width: 14.28%;
  height: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
.calendar-day-empty {
  width: 14.28%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
<template>
  <div v-for="month in getMonths" :key="`${month.year}-${month.month}`" class="calendar-parent">
    <h4>{{month.year}} - {{month.month}}</h4>
    <div class="calendar"  uk-lightbox="animation: slide; toggle: .lightbox-link">
    <div class="calendar-day-header">Понедельник</div>
    <div class="calendar-day-header">Вторник</div>
    <div class="calendar-day-header">Среда</div>
    <div class="calendar-day-header">Четверг</div>
    <div class="calendar-day-header">Пятница</div>
    <div class="calendar-day-header">Суббота</div>
    <div class="calendar-day-header">Воскресенье</div>
    <div v-for="index in month.offset" class="calendar-day-empty"></div>
    <div v-for="(day, index) in month.days" class="calendar-day"><span class="calendar-date">{{day}}</span><PhotoCard v-if="month.works.length>0 && month.works.at(index)" :for_calendar="true" :item="month.works[index]" :show_detail="false" /><span v-else>🕑</span></div>
    </div>
  </div>
  <div class="uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true"
       uk-lightbox="animation: slide; toggle: .lightbox-link" v-if="items.length>0">
    <div v-for="item in items" class=" uk-flex" :key="item.message_id">
      <PhotoCard :item="item" :show_detail="userpage" />
    </div>
  </div>
</template>

