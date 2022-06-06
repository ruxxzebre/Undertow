<script setup>
import HelloWorld from "@/components/HelloWorld.vue";
// import TextEditor from '@/components/TextEditor.vue';
</script>

<template>
  <!-- <HelloWorld /> -->
  <div class="pane">
    <div class="tab-group">
      <div class="tab-item">
        <span class="icon icon-cancel icon-close-tab"></span>
        Tab
      </div>
      <div class="tab-item active">
        <span class="icon icon-cancel icon-close-tab"></span>
        Tab active
      </div>
      <div class="tab-item">
        <span class="icon icon-cancel icon-close-tab"></span>
        Tab
      </div>
      <div class="tab-item tab-item-fixed">
        <span class="icon icon-plus"></span>
      </div>
    </div>
  </div>
</template>
