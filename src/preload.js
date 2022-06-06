import { contextBridge } from "electron";
import { cpus, platform, totalmem, freemem } from "os";

const API = {
  hardware: {
    cpus: cpus(),
    platform: platform(),
    totalmem: totalmem(),
    freemem: freemem(),
  },
};

contextBridge.exposeInMainWorld("api", API);
