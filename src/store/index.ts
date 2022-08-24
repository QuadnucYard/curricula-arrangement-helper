import { createStore } from "vuex";
import { CAHFile } from "@/data/cah-file";
import "@/utils/array-extensions";

const store = createStore({
  state: {
    openFiles: <CAHFile[]>[],
    activeFile: <CAHFile | null>null,
  },
  mutations: {
    async openFile(state, payload: { path: string | null; name: string | null }) {
      const oldFile = state.openFiles.find(t => t.path === payload.path);
      if (oldFile && oldFile.path) {
        state.activeFile = oldFile;
        return;
      }
      const newFile = new CAHFile(payload.path);
      if (newFile.path) await newFile.load();
      if (payload.name) newFile.curricula.name = payload.name;
      state.activeFile = newFile;
      state.openFiles.push(newFile);
      console.log("Create", newFile);
    },
    closeFile(state) {
      state.openFiles.removeOne(state.activeFile);
      state.activeFile = null;
    },
  },
  actions: {},
});

export default store;
