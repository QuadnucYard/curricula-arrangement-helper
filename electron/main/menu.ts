import { BrowserWindow, MenuItemConstructorOptions } from "electron";

export function createMenu(win: BrowserWindow) {
  const menuBar: MenuItemConstructorOptions[] = [
    {
      label: "&File",
      submenu: [
        {
          label: "New",
          click() {
            win.webContents.send("new-file");
          },
        },
        {
          label: "Open",
          click() {
            win.webContents.send("open-file");
          },
        },
        {
          label: "Save",
          accelerator: "ctrl+s",
          click() {
            win.webContents.send("save-file");
          },
        },
        {
          label: "Save As",
          click() {
            win.webContents.send("save-file-as");
          },
        },
        {
          label: "Quit",
          role: "quit",
        },
      ],
    },
    {
      label: "&Edit",
      submenu: [],
    },
    {
      label: "&View",
      role: "viewMenu",
    },
    {
      label: "&Window",
      role: "windowMenu",
    },
    {
      label: "&Help",
      submenu: [{ label: "访问官网" }, { label: "关于" }],
    },
  ];
  return menuBar;
}
