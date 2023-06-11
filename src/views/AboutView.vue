<template>
  <div class="about">
    <h3>О проекте</h3>
    <div class="uk-text-default">
      <p>Неофициальный фронт для Telegram Канала - <a href="https://t.me/factory365" target="_blank">@factory365</a></p>
      <p>@factory365 это канал участников <a href="https://t.me/factory_chat" target="_blank">заводского чата</a>, где публикуются фотографии проекта 365, со следующими правилами:</p>
      <ul>
        <li>можно отправить только одну фотографию в день</li>
        <li>нужно отправлять фото снятое в тот же день (плюс-минус, точнее читайте в боте)</li>
        <li>лучшие фото выбираются голосованием в канале</li>
        <li>голосование длится день, и следующий день</li>
      </ul>
      <p>Данный фронт был сделан для более удобного просмотра работ по разным авторам. Все права на фотографии принадлежат их авторам, ссылки на исходные сообщения и по возможности на аккаунты авторов прилагаются.</p>
      <p><router-link to="/stats">Немного статистики</router-link></p>

      <p>Все претензии кидать в <a href="https://t.me/zyuhel" target="_blank">@zyuhel</a></p>
    </div>
  </div>
</template>

<style>

</style>
<script setup>
import {onMounted} from "vue";
function setTitle() {
  document.title = 'F365 - О проекте'
}
onMounted(async () => {

  setTitle()
});
</script>
