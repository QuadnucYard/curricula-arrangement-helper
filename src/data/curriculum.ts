import { castArray, chain, cloneDeep } from "lodash";

/** 共用的基本数据 */
export interface BaseClassData {
  /** 课程号 */
  cid: string;
  /** 课程名 */
  name: string;
  /** 类别 */
  cate: string;
  /** 学时 */
  hours: number;
  /** 学分 */
  credit: number;
  /** 开课单位 */
  college: string;
  /** 课程性质 */
  nature: string;
}

/** 教学班数据 */
export interface ClassData extends BaseClassData {
  /** 课序号 */
  no: string;
  /** 校区 */
  campus: string;
  /** 限制班级 */
  restrictedClasses: string[];
  /** 学期 */
  schoolTerm: string;
  /** 教师名 */
  teacher: string;
  /** 教师具体信息 */
  teacherDetail: string;
  /** 教学地点 */
  teachingPlace: string;
  /** 课容量 */
  capacity: number;
  /** 课容量（总） */
  capacityFull: number;
  /** 已选人数 */
  occupancy: number;
}

/** 一系列教学班数据组 */
export interface CourseData extends BaseClassData {
  tcList: ClassData[];
}

/** 课程组 */
export interface CourseGroupData {
  /** 名称 */
  name: string;
  /** 课程数据 */
  data: CourseData[];
}

/** 全体课程数据 */
export interface CurriculumData {
  /** 名称 */
  name: string;
  /** 课程组数据 */
  data: CourseGroupData[];
}

/*
分：一般，体育，通选
不同区别在于，数据是怎么给出的
*/

export function parseClassData(r: any): ClassData {
  const cd: ClassData = {
    cid: r.KCH,
    name: r.KCM,
    cate: r.KCLB,
    hours: parseInt(r.XS),
    credit: parseFloat(r.XF),
    college: r.KKDW,
    nature: r.KCXZ,
    no: r.KXH,
    campus: r.XQ,
    restrictedClasses: (<string>r.TJBJ)?.split(","),
    schoolTerm: r.schoolTerm,
    teacher: r.SKJS,
    teacherDetail: r.SKJSLB,
    teachingPlace: r.teachingPlace,
    capacity: r.KRL,
    capacityFull: r.classCapacity,
    occupancy: r.YXRS,
  };
  return cd;
}

/** 解析推荐课程， */
export function parseGrouped(obj: any[]): CourseData[] {
  return obj.map(r => {
    const cd: CourseData = {
      cid: r.KCH,
      name: r.KCM,
      cate: r.KCLB,
      hours: r.hours,
      credit: r.XF,
      college: r.KKDW,
      nature: r.KCXZ,
      tcList: (<any[]>r.tcList).map(t => parseClassData(t)),
    };
    return cd;
  });
}

function autoParseImpl(rows: any[]): CourseData[] {
  if (rows.length == 0) return [];
  if (rows[0].tcList) {
    return parseGrouped(rows);
  } else {
    return groupCourseData(rows.map(t => toCourseData(parseClassData(t))));
  }
}

export function autoParse(obj: any): CourseData[] {
  return autoParseImpl(obj.data?.rows ?? castArray(obj));
}

export function toBaseData(cd: BaseClassData): BaseClassData {
  return {
    cid: cd.cid,
    name: cd.name,
    cate: cd.cate,
    hours: cd.hours,
    credit: cd.credit,
    college: cd.college,
    nature: cd.nature,
  };
}

export function toClassData(cd: CourseData): ClassData {
  return Object.assign(toBaseData(cd), {
    no: "",
    campus: "",
    restrictedClasses: [],
    schoolTerm: "",
    teacher: "",
    teacherDetail: "",
    teachingPlace: "",
    capacity: 0,
    capacityFull: 0,
    occupancy: 0,
  });
}

export function toCourseData(cd: ClassData): CourseData {
  return Object.assign(toBaseData(cd), {
    tcList: [cd],
  });
}

export function groupCourseData(cds: CourseData[]): CourseData[] {
  return chain(cds)
    .groupBy(t => t.cid)
    .map(t =>
      Object.assign(cloneDeep(t[0]), {
        tcList: chain(t)
          .map(u => u.tcList[0])
          .sortBy(t => t.no)
          .value(),
      })
    )
    .value();
}
