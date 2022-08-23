import "@/utils/array-extensions";
import { ClassData, CourseData } from "./curriculum";
import { ckey, splitkey, TeachingPlaceInfo } from "./course-info";

export enum SelectionStatus {
  /** 未选且无冲突 */
  None,
  /** 已选 */
  Selected,
  /** 同组冲突 */
  WeakConflict,
  /** 不同组冲突 */
  StrongConflict,
}

export interface SelectionEntry {
  item: ClassData;
  status: SelectionStatus;
  collisions: string[];
}

interface EntryType {
  [key: string]: string;
}

export class Scheduler {
  state: Map<string, SelectionEntry>;
  selected: string[]; // 存所有被选的
  test: EntryType = {};

  constructor() {
    // 要不还是用object吧
    this.test["55"] = "";
    this.state = new Map<string, SelectionEntry>();
    this.selected = [];
  }

  /** 根据所有课程创建列表，初始化selections */
  create(courseGroup: CourseData[]) {
    for (const a of courseGroup) {
      for (const b of a.tcList) {
        TeachingPlaceInfo.get(b);
        this.state.set(ckey(b), { item: b, status: SelectionStatus.None, collisions: [] });
      }
    }
  }

  /** 刷新，但不会更改已选状态 */
  refresh(courseGroup: CourseData[]) {
    for (const a of courseGroup) {
      for (const b of a.tcList) {
        // 这里应该重新计算状态
      }
    }
  }

  getEntry(cd: ClassData) {
    return this.state.get(`${cd.cid}-${cd.no}`)!;
  }

  /** 选择状态转换为存储用object */
  dump() {
    return [...this.state.entries()]
      .filter(([key, entry]) => entry.status == SelectionStatus.Selected)
      .map(([key, entry]) => key);
  }

  load(arr: string[]) {}

  /** 直接设置状态 */
  setStatus(key: string, status: SelectionStatus) {
    this.state.get(key)!.status = status;
  }

  /** 根据collisions更新状态 */
  updateStatus(entry: SelectionEntry) {
    let status: SelectionStatus;
    if (entry.collisions.empty()) {
      status = SelectionStatus.None;
    } else if (entry.collisions.some(t => splitkey(t)[0] != entry.item.cid)) {
      status = SelectionStatus.StrongConflict;
    } else {
      status = SelectionStatus.WeakConflict;
    }
    this.setStatus(ckey(entry.item), status);
  }

  /** 获取状态副本 */
  getStateObject() {
    return Object.fromEntries(this.state.entries());
  }

  /** 判断课程是否可选 */
  canSelect(cd: ClassData) {
    const status = this.getEntry(cd).status;
    return status == SelectionStatus.None || status == SelectionStatus.WeakConflict;
  }

  /** 选择 */
  select(cd: ClassData) {
    const key = ckey(cd);
    const tci = TeachingPlaceInfo.get(cd);
    // 先把类给撤掉
    for (const v of this.state.values()) {
      if (v.item.cid == cd.cid && v.status == SelectionStatus.Selected) {
        this.unselect(v.item);
      }
    }
    // 更新
    for (const [k, v] of this.state.entries()) {
      if (k == key) continue;
      if (!v.collisions.contains(key) && tci.collides(v.item)) {
        v.collisions.push(key);
        this.updateStatus(v);
      }
    }
    this.setStatus(key, SelectionStatus.Selected);
  }

  /** 取消选择 */
  unselect(cd: ClassData) {
    const key = ckey(cd);
    this.setStatus(key, SelectionStatus.None);
    for (const [k, v] of this.state.entries()) {
      if (k == key) continue;
      if (v.collisions.contains(key)) {
        v.collisions.removeOne(key);
        this.updateStatus(v);
      }
    }
  }

  /** 切换选择状态 */
  toggleSelect(cd: ClassData) {
    if (this.getEntry(cd).status === SelectionStatus.Selected) {
      this.unselect(cd);
    } else {
      this.select(cd);
    }
  }

  /** 获取冲突项 */
  getCollisions(cd: ClassData) {
    return this.getEntry(cd).collisions.map(t => this.state.get(t)!.item);
  }
}
