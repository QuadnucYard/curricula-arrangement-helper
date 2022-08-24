import { CurriculumData } from "./curriculum";
import { fs } from "@tauri-apps/api";

export class CAHFile {
  path: string | null;
  curricula: CurriculumData;
  modified: boolean;
  openTime: Date;
  identifier: string;

  constructor(path: string | null) {
    this.path = path;
    this.curricula = { name: "", data: [] };
    this.modified = false;
    this.openTime = new Date();
    this.identifier = this.path ?? this.openTime.getTime().toString();
  }

  async load() {
    const data = JSON.parse((await fs.readTextFile(this.path!)).toString());
    this.curricula = data.curricula;
    this.modified = false;
  }

  async save(newpath: string | null = null) {
    if (newpath) this.path = newpath;
    this.modified = false;
    await fs.writeTextFile(this.path!, JSON.stringify({ curricula: this.curricula }));
  }
}
