<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import TestThing from "./components/TestThing.vue";
import LeftBar from './components/LeftBar.vue';
import EditNoteModal from './components/modals/EditNoteModal.vue';
// import { computed, ref } from 'vue'

// const count = ref(0)
// const compcount = computed(() => count)
</script>

<template>
  <div class="window">
    <div class="window-content">
      <div class="pane-group">
        <edit-note-modal />
        <left-bar />
        <router-view></router-view>
      </div>
    </div>
  </div>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <div class="ssy">
    <div>{{ compcount }}</div>
    <button @click="count++">INCREMENT</button>
  </div>
  <HelloWorld msg="Welcome t000 Your Vue.js App"/> -->
</template>

<style>
@import url("./assets/css/photon.css");
@import url("@toast-ui/editor/dist/toastui-editor.css");
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
