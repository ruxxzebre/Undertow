import { reactive } from "vue";
import { v4 as uuid } from "uuid";
import { router } from "./router";
// use pinia lib afterwards

export const initialState = {
  notes: [],
  notesMap: {},
  currentEditorNoteID: null,
  nm_length: 0,
  openedNoteIDs: [],
  modals: {},
  hashTags: {}, // hashTag: [noteID]
};

export const state = reactive(initialState);

export const isAnyNoteOpened = () => !!state.currentEditorNoteID;

export const saveHashTags = (hashTags, id) => {
  for (let ht of hashTags) {
    if (!state.hashTags[ht]) {
      state.hashTags[ht] = [];
    }
    if (!state.hashTags[ht].includes(id)) {
      state.hashTags[ht].push(id);
    }
  }
}

class Note {
  constructor({ text, name, id, postfix } = {}) {
    this._text = text || "";
    this.name = name || "Note" + (postfix || "");
    this.id = id;
    this.dateCreated = new Date();
    this.kind = "Document";
    this.author = "Me";
  }

  get text() {
    return this._text;
  }

  /**
   * 
   * @param {string} text 
   */
  parseHashtags(text) {
    const regex = /(#\w+)/gm;
    const matched = text.match(regex);
    return matched;
  }

  set text(newText) {
    this._text = newText;
  }

  save() {
    saveHashTags(this.parseHashtags(this._text), this.id);
  }
}

class Modal {
  constructor() {
    this._isOpen = false;
    this._noteID = null;
    this._misc = {};
  }

  get isOpen() {
    return this._isOpen;
  }

  set isOpen(newValue) {
    if (!newValue) {
      this._misc = {};
    }
    this._isOpen = newValue;
  }

  get misc() {
    return this._misc;
  }

  set misc(newValue) {
    this._misc = newValue;
  }

  open(arg = {}) {
    this.misc = arg;
    this._isOpen = true;
  }
  close() {
    this._isOpen = false;
    this.misc = {};
  }
  toggle() {
    this._isOpen = !this._isOpen;
  }
}

export const createNote = () => {
  const id = uuid();
  state.nm_length += 1;
  state.notesMap[id] = new Note({
    id,
    postfix: state.nm_length + 1,
  });
  return id;
};

export const getNote = (id) => {
  return state.notesMap[id];
};

export const getCurrentNote = () => {
  return state.notesMap[state.currentEditorNoteID];
};

export const openNote = (id, opts = { replace: true }) => {
  if (!state.notesMap[id]) {
    throw new Error("There is no note with id: " + id);
  }
  if (!state.openedNoteIDs.includes(id)) {
    state.openedNoteIDs.push(id);
  }

  state.currentEditorNoteID = id;
  if (opts.replace)
    router.replace("/editor/" + id);
};

export const openLatestNote = () => {
  const nts = Object.keys(state.notesMap);
  if (!nts.length) {
    const id = createNote();
    return openNote(id);
  }
  openNote(nts[nts.length - 1]);
};

export const closeNote = (id) => {
  // if (!isClosingAvailable(id)) return;
  // ! TODO: fix this
  const idx = state.openedNoteIDs.findIndex((_id) => _id == id);
  if (idx != -1) {
    if (idx == state.openedNoteIDs.length - 1) {
      state.currentEditorNoteID = state.openedNoteIDs[idx - 1];
    } else {
      state.currentEditorNoteID = state.openedNoteIDs[idx + 1];
    }
  }
  state.openedNoteIDs = state.openedNoteIDs.filter((_id) => _id != id);
};

export const isClosingAvailable = (id) => {
  return true;
  const idx = state.openedNoteIDs.findIndex((_id) => _id == id);
  return idx == -1 || state.openedNoteIDs.length != 1
}

const initModals = () => {
  state.modals.editNote = new Modal();
}

export default {
  /**
   *
   * @param {Vue} app
   * @param {*} options
   */
  install: (app, _options) => {
    app.config.globalProperties.$state = state;
    if (!Object.keys(state.notesMap).length) {
      openNote(createNote(), {
        replace: false,
      });
      initModals();
    }
  },
};
