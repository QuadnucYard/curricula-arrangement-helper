import fs2 from "electron-fs-extra";
import fs from "fs";

const { remote } = require("@electron/remote");

async function openDialog() {
  const result = await remote.dialog.showOpenDialog({
    properties: ["openFile"],
  });
}
