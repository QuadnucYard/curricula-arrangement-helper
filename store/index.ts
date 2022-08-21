import { createStore } from "vuex";
import { CAHFile } from "@/data/cah-file";
import array_utils from "@/utils/array-utils";

const store = createStore({
  state: {
    openFiles: <CAHFile[]>[],
    activeFile: <CAHFile | null>null,
  },
  mutations: {
    createFile(state, payload: { path: string | null }) {
      const newFile = new CAHFile(payload.path);
      state.activeFile = newFile;
      state.openFiles.push(newFile);
      if (payload.path != null) state.activeFile.load();
    },
    closeFile(state) {
      array_utils.removeOne(state.openFiles, state.activeFile);
      state.activeFile = null;
    },
  },
  actions: {},
});

export default store;
