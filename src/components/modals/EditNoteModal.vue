<script setup>
// import { ref } from "vue";
import { useRoute } from "vue-router";
import { getNote, state } from "@/state";
import PopupWindow from "../PopupWindow.vue";

const route = useRoute();
// const note = getNote(state.modals.editNote.misc.noteID);
</script>

<template>
  <div>
    <popup-window
      :show="$state.modals.editNote.isOpen"
      :hide="() => $state.modals.editNote.close()"
      header="Edit Note"
      footer="Save"
    >
      <form :set="note = getNote(route.params.id)" class="form" @submit.prevent="">
        <div class="form-group">
          <label>Name</label>
          <input v-model="note.name" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label>Note Type</label>
          <select class="form-control">
            <option value="">Simple text</option>
            <option value="">Markdown</option>
            <option value="">Code</option>
          </select>
        </div>
        <div class="form-group">
          <label>Copy to buffer</label>
          <button class="btn btn-form btn-default form-control">Copy</button>
        </div>
      </form>
    </popup-window>
  </div>
</template>

<style scoped>
.form {
  padding: 20px;
}
</style>
