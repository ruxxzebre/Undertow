<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  hide: {
    type: Function,
    default: () => {}
  },
  header: {
    type: String,
    default: "",
  },
  footer: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="modal" v-if="props.show">
    <div class="window content">
      <div v-if="props.header" class="toolbar toolbar-header">
        <h1 class="title">{{ props.header }}</h1>
      </div>
      <div class="window-content">
        <slot />
      </div>
      <footer v-if="props.footer" class="toolbar toolbar-footer">
        <div class="toolbar-actions">
          <button @click="props.hide()" class="btn btn-default">Cancel</button>
          <button class="btn btn-primary pull-right">Save</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
