import { CurriculumData } from "./curriculum";
import fs from "fs";

export class CAHFile {
  path: string | null;
  curricula: CurriculumData;
  modified: boolean;
  openTime: Date;
  identifier: string;

  constructor(path: string | null) {
    this.path = path;
    if (path != null) {
      const data = JSON.parse(fs.readFileSync(this.path!).toString());
      this.curricula = data.curricula;
    } else {
      this.curricula = { name: "", data: [] };
    }
    this.modified = false;
    this.openTime = new Date();
    this.identifier = this.path ?? this.openTime.getTime().toString();
  }

  load(): void {
    const data = JSON.parse(fs.readFileSync(this.path!).toString());
    this.curricula = data.curricula;
    this.modified = false;
  }

  save(newpath: string | null = null): void {
    if (newpath) this.path = newpath;
    this.modified = false;
    fs.writeFileSync(this.path!, JSON.stringify({ curricula: this.curricula }));
  }
}
