<script setup>
import { getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  isAnyNoteOpened,
  createNote,
  getCurrentNote,
  isClosingAvailable,
  openNote,
	closeNote,
  state,
  getNote,
  openLatestNote,
} from "../state";

const route = useRoute();
console.log(state);

if (route.params.id) {
  try {
    openNote(route.params.id);
  } catch {
    console.log("Note not found");
    openLatestNote();
  }
} else {
  openLatestNote();
}

function newNote() {
  const id = createNote();
  openNote(id);
}

function isCloseButton(e) {
  return e.target.classList.contains('icon-close-tab');
}

function handleTabClick(e, id) {
  if (isCloseButton(e)) {
    closeNote(id);
  } else if (e.detail == 1) {
		openNote(id);
	} else {
    console.log(id);
    console.log(getNote(id));
		state.modals.editNote.open({
      noteID: id,
    });
	}
} 

// } else if (state.currentEditorNoteID) {
// console.log(route.params.id, state.notesMap, getNote(route.params.id));

</script>

<template>
  <div
    v-if="!!Object.keys($state.notesMap).length"
    class="pane"
  >
    <div class="tab-group">
      <div
        v-for="item in state.openedNoteIDs"
        :key="item"
        class="tab-item"
        :class="{ active: item == state.currentEditorNoteID }"
        @click="handleTabClick($event, item)"
      >
        <span
          v-if="isClosingAvailable(item)"
          class="icon icon-cancel icon-close-tab"
          @click="closeNote(item)"
        />
        {{ getNote(item)?.name }}
      </div>
      <div
        class="tab-item tab-item-fixed"
        @click="newNote"
      >
        <span class="icon icon-plus" />
      </div>
    </div>
    <span v-if="state.currentEditorNoteID">
      Note ID: {{ route.params.id }}
      <v-md-editor
        @save="() => state.notesMap[route.params.id].save()"
        :key="state.currentEditorNoteID" 
        v-model="state.notesMap[state.currentEditorNoteID].text"
        height="100%"
      />
    </span>
  </div>
</template>
