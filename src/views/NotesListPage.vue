<script setup>
import { state } from "../state";
</script>

<template>
  <div class="pane">
    <table class="table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Kind</th>
          <th>Date Modified</th>
          <th>Author</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-if="Object.values(state.notesMap).length !== 0">
        <tr
          v-for="note in Object.values(state.notesMap)"
          :key="note.id"
          @click="$router.push({ path: `/editor/${note.id}` })"
          class="file_arq"
        >
          <td>{{ note?.name }}</td>
          <td>{{ note.kind }}</td>
          <td>{{ new Date(note.dateCreated).toLocaleDateString() }}</td>
          <td>{{ note.author }}</td>
          <td>
            <button class="btn btn-large btn-negative">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
