import fsext from "electron-fs-extra";
import { CurriculumData } from "./curriculum";
import fs from "fs";

export class CAHFile {
  path: string | null;
  curricula: CurriculumData[];

  constructor(path: string | null) {
    this.path = path;
    this.curricula = [];
  }

  load(): void {
    const data = fsext.readJsonSync(this.path);
    this.curricula = data.curricula;
  }

  save(newpath: string | null = null): void {
    if (newpath) this.path = newpath;
    fs.writeFileSync(this.path!, JSON.stringify({ curricula: this.curricula }));
  }
}
