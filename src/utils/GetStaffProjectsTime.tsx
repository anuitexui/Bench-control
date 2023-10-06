import { ProjectProps } from "../data/Projects";

export default function getStaffProjectsTime(
  staffID: number,
  projectsList: Array<ProjectProps>,
	billingType: string,
): number {
  let totalTime = 0;
  projectsList.map((proj) => {
    if (proj.lead.id == staffID && proj.lead.billingType == billingType) {
      totalTime += proj.lead.time;
    }
    if (proj.ba.id == staffID && proj.ba.billingType == billingType) {
      totalTime += proj.ba.time;
    }
    if (proj.pm.id == staffID && proj.pm.billingType == billingType) {
      totalTime += proj.pm.time;
    }
    devs: for (let dev of proj.devs) {
      if (dev.id == staffID && dev.billingType == billingType) {
        totalTime += dev.time;
        break devs;
      }
    }
    qas: for (let qa of proj.qas) {
      if (qa.id == staffID && qa.billingType == billingType) {
        totalTime += qa.time;
        break qas;
      }
    }
  });
  return totalTime;
}
