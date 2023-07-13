import { Monitoring } from "./Monitoring";
export type MonitoringRes = {
  monitorings: Monitoring[];
  keyword: string;
  metode: string;
  pagination: number;
};
