<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

UIkit.use(Icons)

</script>

<template>
  <nav class="uk-navbar-container uk-margin-remove-left uk-padding-small uk-padding-remove-top uk-padding-remove-bottom uk-margin-bottom uk-margin-remove-top" uk-navbar >
    <div class="uk-navbar-left"><router-link to="/best">Лучшее</router-link></div>
    <div class="uk-navbar-center"><router-link to="/user">По автору</router-link></div>
    <div class="uk-navbar-right"><router-link to="/about">О проекте</router-link></div>
  </nav>
  <RouterView />
</template>

<style lang="less">

@import "../node_modules/uikit/src/less/uikit.less";


.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
